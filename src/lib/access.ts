import type { ProductKey, Purchase, User } from "@prisma/client";
import { getToolBySlug, type ToolDefinition } from "./tools";
import { isPreviewUnlockAll } from "./preview-access";
import { PRODUCTS } from "./products";

export type AccessResult =
  | { allowed: true }
  | {
      allowed: false;
      reason: "auth" | "premium" | "one_time" | "hybrid";
      productKey?: ProductKey;
      message: string;
    };

type UserWithPurchases = User & { purchases: Purchase[] };

const CLIENT_PREMIUM_TIERS = new Set(["PREMIUM_MONTHLY", "PREMIUM_ANNUAL", "FAMILY_FORTRESS"]);
const ADVISOR_PRO_TIERS = new Set(["PREMIUM_HYBRID", "ADVISOR_ANNUAL"]);

export function hasFortressBundle(user: UserWithPurchases): boolean {
  if (!hasActiveSubscription(user)) return false;
  return user.subscriptionTier === "FAMILY_FORTRESS";
}

export function hasAdvisorAccess(user: UserWithPurchases): boolean {
  if (!hasActiveSubscription(user)) return false;
  return ADVISOR_PRO_TIERS.has(user.subscriptionTier);
}

/** @deprecated Use hasAdvisorAccess */
export function hasHybridAccess(user: UserWithPurchases): boolean {
  return hasAdvisorAccess(user);
}

function hasActiveSubscription(user: UserWithPurchases): boolean {
  if (user.subscriptionStatus !== "ACTIVE" && user.subscriptionStatus !== "TRIALING") {
    return false;
  }
  if (user.subscriptionPeriodEnd && user.subscriptionPeriodEnd < new Date()) {
    return false;
  }
  return true;
}

export function hasActivePremium(user: UserWithPurchases): boolean {
  if (!hasActiveSubscription(user)) return false;
  return CLIENT_PREMIUM_TIERS.has(user.subscriptionTier) || ADVISOR_PRO_TIERS.has(user.subscriptionTier);
}

export function hasPurchase(user: UserWithPurchases, productKey: ProductKey): boolean {
  return user.purchases.some((p) => p.productKey === productKey);
}

export function canAccessTool(user: UserWithPurchases | null, tool: ToolDefinition): AccessResult {
  if (isPreviewUnlockAll()) {
    return { allowed: true };
  }

  if (tool.access === "free") {
    return { allowed: true };
  }

  if (!user) {
    return {
      allowed: false,
      reason: "auth",
      message: "Sign in with Google to access this tool.",
    };
  }

  if (tool.access === "premium") {
    if (hasActivePremium(user)) return { allowed: true };
    return {
      allowed: false,
      reason: "premium",
      productKey: "PREMIUM_MONTHLY",
      message: `Upgrade to Premium to unlock ongoing tracking and dashboards — from ${PRODUCTS.PREMIUM_MONTHLY.priceLabel}.`,
    };
  }

  if (tool.access === "hybrid") {
    if (hasAdvisorAccess(user)) return { allowed: true };
    return {
      allowed: false,
      reason: "hybrid",
      productKey: "PREMIUM_HYBRID",
      message: `Advisor Pro unlocks client premium tools, advisor features, and upcoming releases — from ${PRODUCTS.PREMIUM_HYBRID.priceLabel} or ${PRODUCTS.ADVISOR_ANNUAL.priceLabel}.`,
    };
  }

  if (tool.access === "one_time" && tool.productKey) {
    if (tool.slug === "human-life-value") {
      return { allowed: true };
    }
    if (hasPurchase(user, tool.productKey)) return { allowed: true };
    if (hasFortressBundle(user) && (tool.productKey === "HLV_REPORT" || tool.productKey === "LEGACY_VAULT")) {
      return { allowed: true };
    }
    const product = PRODUCTS[tool.productKey];
    return {
      allowed: false,
      reason: "one_time",
      productKey: tool.productKey,
      message: `Unlock lifetime access with a one-time ${product?.priceLabel ?? "purchase"}.`,
    };
  }

  return { allowed: true };
}

export function canDownloadHlvReport(user: UserWithPurchases | null): AccessResult {
  if (isPreviewUnlockAll()) {
    return { allowed: true };
  }

  if (!user) {
    return { allowed: false, reason: "auth", message: "Sign in to download your report." };
  }
  if (hasPurchase(user, "HLV_REPORT") || hasFortressBundle(user)) return { allowed: true };
  return {
    allowed: false,
    reason: "one_time",
    productKey: "HLV_REPORT",
    message: `Download the branded Family Financial Security Report for ${PRODUCTS.HLV_REPORT.priceLabel} — or get it in the ${PRODUCTS.FAMILY_FORTRESS.name} (${PRODUCTS.FAMILY_FORTRESS.priceLabel}).`,
  };
}

export function getToolAccess(user: UserWithPurchases | null, slug: string): AccessResult {
  const tool = getToolBySlug(slug);
  if (!tool) {
    return { allowed: false, reason: "auth", message: "Tool not found." };
  }
  return canAccessTool(user, tool);
}
