import { headers } from "next/headers";
import { NextResponse } from "next/server";
import type Stripe from "stripe";
import type { ProductKey, SubscriptionTier } from "@prisma/client";
import { prisma } from "@/lib/db";
import { getStripe } from "@/lib/stripe";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = (await headers()).get("stripe-signature");

  if (!signature || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Webhook not configured" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error("[stripe/webhook] signature verification failed", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const existing = await prisma.stripeEvent.findUnique({ where: { id: event.id } });
  if (existing) {
    return NextResponse.json({ received: true, duplicate: true });
  }

  await prisma.stripeEvent.create({ data: { id: event.id, type: event.type } });

  try {
    switch (event.type) {
      case "checkout.session.completed":
        await handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session);
        break;
      case "customer.subscription.updated":
      case "customer.subscription.deleted":
        await handleSubscriptionChange(event.data.object as Stripe.Subscription);
        break;
      case "invoice.payment_failed":
        await handlePaymentFailed(event.data.object as Stripe.Invoice);
        break;
      default:
        break;
    }
  } catch (error) {
    console.error(`[stripe/webhook] handler error for ${event.type}`, error);
    return NextResponse.json({ error: "Handler failed" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
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
    const sub = await getStripe().subscriptions.retrieve(subId);
    await syncSubscription(userId, sub);
  }
}

async function handleSubscriptionChange(subscription: Stripe.Subscription) {
  const customerId = typeof subscription.customer === "string" ? subscription.customer : subscription.customer.id;
  const user = await prisma.user.findFirst({ where: { stripeCustomerId: customerId } });
  if (!user) return;
  await syncSubscription(user.id, subscription);
}

async function handlePaymentFailed(invoice: Stripe.Invoice) {
  const customerId = typeof invoice.customer === "string" ? invoice.customer : invoice.customer?.id;
  if (!customerId) return;
  await prisma.user.updateMany({
    where: { stripeCustomerId: customerId },
    data: { subscriptionStatus: "PAST_DUE" },
  });
}

async function syncSubscription(userId: string, subscription: Stripe.Subscription) {
  const priceId = subscription.items.data[0]?.price.id;
  const tier = mapPriceToTier(priceId);
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

function mapPriceToTier(priceId?: string): SubscriptionTier {
  if (priceId === process.env.STRIPE_PRICE_PREMIUM_HYBRID) return "PREMIUM_HYBRID";
  if (priceId === process.env.STRIPE_PRICE_PREMIUM_ANNUAL) return "PREMIUM_ANNUAL";
  if (priceId === process.env.STRIPE_PRICE_PREMIUM_MONTHLY) return "PREMIUM_MONTHLY";
  return "FREE";
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
