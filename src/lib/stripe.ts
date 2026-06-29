import type { ProductKey } from "@prisma/client";
import { envFromProcess } from "./server/env";
import {
  createCheckoutSession as createCheckoutSessionForEnv,
  createBillingPortalSession as createBillingPortalSessionForEnv,
  getStripeClient,
} from "./server/stripe-handlers";

export function getStripe() {
  return getStripeClient(envFromProcess());
}

export async function createCheckoutSession(params: {
  customerId: string;
  productKey: ProductKey;
  userId: string;
  successUrl: string;
  cancelUrl: string;
}) {
  return createCheckoutSessionForEnv(envFromProcess(), params);
}

export async function createBillingPortalSession(customerId: string, returnUrl: string) {
  return createBillingPortalSessionForEnv(envFromProcess(), customerId, returnUrl);
}
