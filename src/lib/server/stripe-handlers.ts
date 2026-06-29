import Stripe from "stripe";
import type { ProductKey, SubscriptionTier } from "@prisma/client";
import type { PrismaClient } from "@prisma/client";
import type { ServerEnv } from "./env";
import { getProductsForEnv, type RuntimeProduct } from "./products-env";

function feeRate(env: ServerEnv): number {
  const raw = env.STRIPE_FEE_PERCENT;
  if (!raw) return 0.029;
  const n = Number(raw);
  return Number.isFinite(n) && n >= 0 ? n : 0.029;
}

function feeFixedCents(env: ServerEnv): number {
  const raw = env.STRIPE_FEE_FIXED_CENTS;
  if (!raw) return 30;
  const n = Number(raw);
  return Number.isFinite(n) && n >= 0 ? Math.round(n) : 30;
}

function passFeesToCustomer(env: ServerEnv): boolean {
  return env.STRIPE_PASS_FEES_TO_CUSTOMER !== "false";
}

function processingFeeCents(env: ServerEnv, baseCents: number): number {
  if (!passFeesToCustomer(env) || baseCents <= 0) return 0;
  const rate = feeRate(env);
  const fixed = feeFixedCents(env);
  if (rate >= 1) return fixed;
  const total = Math.ceil((baseCents + fixed) / (1 - rate));
  return total - baseCents;
}

export function getStripeClient(env: ServerEnv): Stripe {
  if (!env.STRIPE_SECRET_KEY) {
    throw new Error("STRIPE_SECRET_KEY is not configured");
  }
  return new Stripe(env.STRIPE_SECRET_KEY, { typescript: true });
}

function buildProcessingFeeLineItem(
  product: RuntimeProduct,
  feeCents: number
): Stripe.Checkout.SessionCreateParams.LineItem {
  const base: Stripe.Checkout.SessionCreateParams.LineItem = {
    price_data: {
      currency: "usd",
      product_data: {
        name: "Payment processing",
        description: "Card processing fee (passed through to customer)",
      },
      unit_amount: feeCents,
    },
    quantity: 1,
  };

  if (product.billingMode === "subscription" && product.subscriptionInterval) {
    base.price_data!.recurring = { interval: product.subscriptionInterval };
  }

  return base;
}

export async function createCheckoutSession(
  env: ServerEnv,
  params: {
    customerId: string;
    productKey: ProductKey;
    userId: string;
    successUrl: string;
    cancelUrl: string;
  }
) {
  const stripe = getStripeClient(env);
  const products = getProductsForEnv(env);
  const product = products[params.productKey];
  if (!product?.stripePriceId) {
    throw new Error(`Stripe price not configured for ${params.productKey}`);
  }

  const mode = product.billingMode === "subscription" ? "subscription" : "payment";
  const feeCents = processingFeeCents(env, product.priceCents);

  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [
    { price: product.stripePriceId, quantity: 1 },
  ];

  if (passFeesToCustomer(env) && feeCents > 0) {
    lineItems.push(buildProcessingFeeLineItem(product, feeCents));
  }

  return stripe.checkout.sessions.create({
    customer: params.customerId,
    mode,
    line_items: lineItems,
    success_url: params.successUrl,
    cancel_url: params.cancelUrl,
    metadata: {
      userId: params.userId,
      productKey: params.productKey,
      baseAmountCents: String(product.priceCents),
      processingFeeCents: String(feeCents),
    },
    allow_promotion_codes: true,
  });
}

export async function createBillingPortalSession(env: ServerEnv, customerId: string, returnUrl: string) {
  const stripe = getStripeClient(env);
  return stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl,
  });
}

export async function runStripeCheckout(
  prisma: PrismaClient,
  env: ServerEnv,
  request: Request,
  clerkUserId: string,
  productKey: ProductKey
): Promise<{ status: number; body: Record<string, unknown> }> {
  const products = getProductsForEnv(env);
  if (!productKey || !products[productKey]) {
    return { status: 400, body: { error: "Invalid product" } };
  }

  const { ensureDbUserFromClerk } = await import("./clerk-handlers");
  const user = await ensureDbUserFromClerk(prisma, env, clerkUserId);
  if (!user) {
    return { status: 500, body: { error: "User sync failed" } };
  }

  let customerId = user.stripeCustomerId;
  if (!customerId) {
    const stripe = getStripeClient(env);
    const customer = await stripe.customers.create({
      email: user.email,
      name: user.name ?? undefined,
      metadata: { userId: user.id, clerkId: user.clerkId },
    });
    customerId = customer.id;
    await prisma.user.update({
      where: { id: user.id },
      data: { stripeCustomerId: customerId },
    });
  }

  const origin = request.headers.get("origin") ?? env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  const session = await createCheckoutSession(env, {
    customerId,
    productKey,
    userId: user.id,
    successUrl: `${origin}/dashboard/billing?success=1`,
    cancelUrl: `${origin}/dashboard/billing?canceled=1`,
  });

  return { status: 200, body: { url: session.url } };
}

export async function runBillingPortal(
  prisma: PrismaClient,
  env: ServerEnv,
  request: Request,
  clerkUserId: string
): Promise<{ status: number; body: Record<string, unknown> }> {
  const { ensureDbUserFromClerk } = await import("./clerk-handlers");
  const user = await ensureDbUserFromClerk(prisma, env, clerkUserId);
  if (!user?.stripeCustomerId) {
    return { status: 400, body: { error: "No billing account yet" } };
  }

  const origin = request.headers.get("origin") ?? env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  const session = await createBillingPortalSession(
    env,
    user.stripeCustomerId,
    `${origin}/dashboard/billing`
  );

  return { status: 200, body: { url: session.url } };
}

function mapPriceToTier(env: ServerEnv, subscription: Stripe.Subscription): SubscriptionTier {
  const priceIds = subscription.items.data.map((item) => item.price.id);
  for (const priceId of priceIds) {
    if (priceId === env.STRIPE_PRICE_PREMIUM_HYBRID) return "PREMIUM_HYBRID";
    if (priceId === env.STRIPE_PRICE_ADVISOR_ANNUAL) return "ADVISOR_ANNUAL";
    if (priceId === env.STRIPE_PRICE_FAMILY_FORTRESS) return "FAMILY_FORTRESS";
    if (priceId === env.STRIPE_PRICE_PREMIUM_ANNUAL) return "PREMIUM_ANNUAL";
    if (priceId === env.STRIPE_PRICE_PREMIUM_MONTHLY) return "PREMIUM_MONTHLY";
  }
  return "FREE";
}

async function grantFortressBundlePurchases(
  prisma: PrismaClient,
  userId: string,
  checkoutId: string
) {
  for (const productKey of ["HLV_REPORT", "LEGACY_VAULT"] as const) {
    const existing = await prisma.purchase.findFirst({
      where: { userId, productKey },
    });
    if (existing) continue;
    await prisma.purchase.create({
      data: {
        userId,
        productKey,
        stripeCheckoutId: `${checkoutId}_${productKey}`,
        amountCents: 0,
        currency: "usd",
      },
    });
  }
}

function mapStripeStatus(status: Stripe.Subscription.Status) {
  switch (status) {
    case "active":
      return "ACTIVE" as const;
    case "trialing":
      return "TRIALING" as const;
    case "past_due":
      return "PAST_DUE" as const;
    case "canceled":
    case "unpaid":
      return "CANCELED" as const;
    default:
      return "NONE" as const;
  }
}

async function syncSubscription(
  prisma: PrismaClient,
  env: ServerEnv,
  userId: string,
  subscription: Stripe.Subscription
) {
  const tier = mapPriceToTier(env, subscription);
  const status = mapStripeStatus(subscription.status);
  const periodEndUnix = (subscription as Stripe.Subscription & { current_period_end?: number })
    .current_period_end;

  await prisma.user.update({
    where: { id: userId },
    data: {
      stripeSubscriptionId: subscription.id,
      subscriptionTier: tier,
      subscriptionStatus: status,
      subscriptionPeriodEnd: periodEndUnix ? new Date(periodEndUnix * 1000) : null,
    },
  });
}

async function handleCheckoutCompleted(
  prisma: PrismaClient,
  env: ServerEnv,
  stripe: Stripe,
  session: Stripe.Checkout.Session
) {
  const userId = session.metadata?.userId;
  const productKey = session.metadata?.productKey as ProductKey | undefined;
  if (!userId || !productKey) return;

  if (session.mode === "payment") {
    await prisma.purchase.upsert({
      where: { stripeCheckoutId: session.id },
      create: {
        userId,
        productKey,
        stripeCheckoutId: session.id,
        stripePaymentIntentId:
          typeof session.payment_intent === "string" ? session.payment_intent : session.payment_intent?.id,
        amountCents: session.amount_total ?? 0,
        currency: session.currency ?? "usd",
      },
      update: {},
    });
    return;
  }

  if (session.mode === "subscription" && session.subscription) {
    const subId = typeof session.subscription === "string" ? session.subscription : session.subscription.id;
    const sub = await stripe.subscriptions.retrieve(subId);
    await syncSubscription(prisma, env, userId, sub);
    if (productKey === "FAMILY_FORTRESS") {
      await grantFortressBundlePurchases(prisma, userId, session.id);
    }
  }
}

async function handleSubscriptionChange(prisma: PrismaClient, env: ServerEnv, subscription: Stripe.Subscription) {
  const customerId = typeof subscription.customer === "string" ? subscription.customer : subscription.customer.id;
  const user = await prisma.user.findFirst({ where: { stripeCustomerId: customerId } });
  if (!user) return;
  await syncSubscription(prisma, env, user.id, subscription);
}

async function handlePaymentFailed(prisma: PrismaClient, invoice: Stripe.Invoice) {
  const customerId = typeof invoice.customer === "string" ? invoice.customer : invoice.customer?.id;
  if (!customerId) return;
  await prisma.user.updateMany({
    where: { stripeCustomerId: customerId },
    data: { subscriptionStatus: "PAST_DUE" },
  });
}

export async function handleStripeWebhook(
  prisma: PrismaClient,
  env: ServerEnv,
  body: string,
  signature: string
): Promise<{ status: number; body: Record<string, unknown> }> {
  if (!env.STRIPE_WEBHOOK_SECRET) {
    return { status: 400, body: { error: "Webhook not configured" } };
  }

  const stripe = getStripeClient(env);
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, env.STRIPE_WEBHOOK_SECRET);
  } catch {
    return { status: 400, body: { error: "Invalid signature" } };
  }

  const existing = await prisma.stripeEvent.findUnique({ where: { id: event.id } });
  if (existing) {
    return { status: 200, body: { received: true, duplicate: true } };
  }

  await prisma.stripeEvent.create({ data: { id: event.id, type: event.type } });

  try {
    switch (event.type) {
      case "checkout.session.completed":
        await handleCheckoutCompleted(prisma, env, stripe, event.data.object as Stripe.Checkout.Session);
        break;
      case "customer.subscription.updated":
      case "customer.subscription.deleted":
        await handleSubscriptionChange(prisma, env, event.data.object as Stripe.Subscription);
        break;
      case "invoice.payment_failed":
        await handlePaymentFailed(prisma, event.data.object as Stripe.Invoice);
        break;
      default:
        break;
    }
  } catch (error) {
    console.error(`[stripe/webhook] handler error for ${event.type}`, error);
    return { status: 500, body: { error: "Handler failed" } };
  }

  return { status: 200, body: { received: true } };
}
