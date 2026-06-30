import type { ProductKey, Purchase, SubscriptionStatus, SubscriptionTier } from "@prisma/client";

/** JSON-safe user shape returned by /api/user/me */
export type PortalUserJson = {
  id: string;
  clerkId: string;
  email: string;
  name: string | null;
  subscriptionStatus: SubscriptionStatus;
  subscriptionTier: SubscriptionTier;
  subscriptionPeriodEnd: string | null;
  purchases: { productKey: ProductKey }[];
};

export function serializePortalUser(user: {
  id: string;
  clerkId: string;
  email: string;
  name: string | null;
  subscriptionStatus: SubscriptionStatus;
  subscriptionTier: SubscriptionTier;
  subscriptionPeriodEnd: Date | null;
  purchases: Purchase[];
}): PortalUserJson {
  return {
    id: user.id,
    clerkId: user.clerkId,
    email: user.email,
    name: user.name,
    subscriptionStatus: user.subscriptionStatus,
    subscriptionTier: user.subscriptionTier,
    subscriptionPeriodEnd: user.subscriptionPeriodEnd?.toISOString() ?? null,
    purchases: user.purchases.map((p) => ({ productKey: p.productKey })),
  };
}

export function deserializePortalUser(json: PortalUserJson) {
  return {
    ...json,
    subscriptionPeriodEnd: json.subscriptionPeriodEnd ? new Date(json.subscriptionPeriodEnd) : null,
    purchases: json.purchases.map((p, i) => ({
      id: `client-${p.productKey}-${i}`,
      userId: json.id,
      productKey: p.productKey,
      stripePaymentIntentId: null,
      stripeCheckoutId: null,
      amountCents: 0,
      currency: "usd",
      purchasedAt: new Date(),
    })),
    imageUrl: null,
    stripeCustomerId: null,
    stripeSubscriptionId: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}
