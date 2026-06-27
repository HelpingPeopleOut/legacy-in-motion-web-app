import Stripe from "stripe";
import { PRODUCTS } from "./products";
import type { ProductKey } from "@prisma/client";

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

  return stripe.checkout.sessions.create({
    customer: params.customerId,
    mode,
    line_items: [{ price: product.stripePriceId, quantity: 1 }],
    success_url: params.successUrl,
    cancel_url: params.cancelUrl,
    metadata: {
      userId: params.userId,
      productKey: params.productKey,
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
