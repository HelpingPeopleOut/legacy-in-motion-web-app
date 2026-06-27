import { cookies } from "next/headers";
import type { ProductKey, Purchase, SubscriptionStatus, SubscriptionTier, User } from "@prisma/client";
import type { LocalTestScenario } from "./local-test-shared";

export type { LocalTestScenario } from "./local-test-shared";
export { scenarioLabel } from "./local-test-shared";

export const LOCAL_TEST_CLERK_ID = "local-test-user";
export const LOCAL_TEST_EMAIL = "test.client@legacyinmotion.local";

export type UserWithPurchases = User & { purchases: Purchase[] };

const SCENARIO_COOKIE = "local_test_scenario";

export async function getLocalTestScenario(): Promise<LocalTestScenario> {
  // Static Cloudflare Pages: read scenario from cookie via headers when available
  if (process.env.CF_PAGES === "1" || process.env.NEXT_PUBLIC_LOCAL_TEST_MODE === "true") {
    try {
      const cookieStore = await cookies();
      const value = cookieStore.get(SCENARIO_COOKIE)?.value;
      if (
        value === "free" ||
        value === "premium" ||
        value === "hybrid" ||
        value === "one_time" ||
        value === "all"
      ) {
        return value;
      }
    } catch {
      // cookies() unavailable during static generation — default free
    }
    return "free";
  }

  const cookieStore = await cookies();
  const value = cookieStore.get(SCENARIO_COOKIE)?.value;
  if (
    value === "free" ||
    value === "premium" ||
    value === "hybrid" ||
    value === "one_time" ||
    value === "all"
  ) {
    return value;
  }
  return "free";
}

function buildPurchases(keys: ProductKey[]): Purchase[] {
  const now = new Date();
  return keys.map((productKey, i) => ({
    id: `local-purchase-${productKey}`,
    userId: "local-test-user-id",
    productKey,
    stripePaymentIntentId: null,
    stripeCheckoutId: `mock_${productKey}`,
    amountCents: productKey === "LEGACY_VAULT" ? 9900 : 4900,
    currency: "usd",
    purchasedAt: now,
  }));
}

export async function buildLocalTestUser(): Promise<UserWithPurchases> {
  const scenario = await getLocalTestScenario();
  const now = new Date();
  const periodEnd = new Date(now.getFullYear() + 1, now.getMonth(), now.getDate());

  let subscriptionTier: SubscriptionTier = "FREE";
  let subscriptionStatus: SubscriptionStatus = "NONE";
  let purchases: Purchase[] = [];

  switch (scenario) {
    case "premium":
      subscriptionTier = "PREMIUM_MONTHLY";
      subscriptionStatus = "ACTIVE";
      break;
    case "hybrid":
      subscriptionTier = "PREMIUM_HYBRID";
      subscriptionStatus = "ACTIVE";
      break;
    case "one_time":
      purchases = buildPurchases(["HLV_REPORT", "LEGACY_VAULT"]);
      break;
    case "all":
      subscriptionTier = "PREMIUM_HYBRID";
      subscriptionStatus = "ACTIVE";
      purchases = buildPurchases(["HLV_REPORT", "LEGACY_VAULT"]);
      break;
    default:
      break;
  }

  return {
    id: "local-test-user-id",
    clerkId: LOCAL_TEST_CLERK_ID,
    email: LOCAL_TEST_EMAIL,
    name: "Local Test Client",
    imageUrl: null,
    stripeCustomerId: "cus_local_test",
    subscriptionStatus,
    subscriptionTier,
    subscriptionPeriodEnd: subscriptionStatus === "ACTIVE" ? periodEnd : null,
    stripeSubscriptionId: subscriptionStatus === "ACTIVE" ? "sub_local_test" : null,
    createdAt: now,
    updatedAt: now,
    purchases,
  };
}

// scenarioLabel re-exported from local-test-shared.ts
