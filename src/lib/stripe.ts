import Stripe from "stripe";
import { PRODUCTS } from "./products";
import type { ProductKey } from "@prisma/client";
import {
  calculateProcessingFeeCents,
  passStripeFeesToCustomer,
} from "./stripe-fees";

let stripeClient: Stripe | null = null;

export function getStripe(): Stripe {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("STRIPE_SECRET_KEY is not configured");
  }
  if (!stripeClient) {
    stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY, { typescript: true });
  }
  return stripeClient;
}

function buildProcessingFeeLineItem(
  product: (typeof PRODUCTS)[string],
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

export async function createCheckoutSession(params: {
  customerId: string;
  productKey: ProductKey;
  userId: string;
  successUrl: string;
  cancelUrl: string;
}) {
  const stripe = getStripe();
  const product = PRODUCTS[params.productKey];
  if (!product?.stripePriceId) {
    throw new Error(`Stripe price not configured for ${params.productKey}`);
  }

  const mode = product.billingMode === "subscription" ? "subscription" : "payment";
  const feeCents = calculateProcessingFeeCents(product.priceCents);

  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [
    { price: product.stripePriceId, quantity: 1 },
  ];

  if (passStripeFeesToCustomer() && feeCents > 0) {
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

export async function createBillingPortalSession(customerId: string, returnUrl: string) {
  const stripe = getStripe();
  return stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl,
  });
}
