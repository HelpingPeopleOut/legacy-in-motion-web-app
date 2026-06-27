import type { ProductKey, Purchase, User } from "@prisma/client";
import { getToolBySlug, type ToolDefinition } from "./tools";
import { isPreviewUnlockAll } from "./preview-access";

export type AccessResult =
  | { allowed: true }
  | {
      allowed: false;
      reason: "auth" | "premium" | "one_time" | "hybrid";
      productKey?: ProductKey;
      message: string;
    };

type UserWithPurchases = User & { purchases: Purchase[] };

export function hasActivePremium(user: UserWithPurchases): boolean {
  if (user.subscriptionStatus !== "ACTIVE" && user.subscriptionStatus !== "TRIALING") {
    return false;
  }
  if (user.subscriptionPeriodEnd && user.subscriptionPeriodEnd < new Date()) {
    return false;
  }
  return (
    user.subscriptionTier === "PREMIUM_MONTHLY" ||
    user.subscriptionTier === "PREMIUM_ANNUAL" ||
    user.subscriptionTier === "PREMIUM_HYBRID"
  );
}

export function hasHybridAccess(user: UserWithPurchases): boolean {
  return (
    hasActivePremium(user) &&
    user.subscriptionTier === "PREMIUM_HYBRID"
  );
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
      message: "Upgrade to Premium to unlock ongoing tracking and dashboards — from $5/month.",
    };
  }

  if (tool.access === "hybrid") {
    if (hasHybridAccess(user)) return { allowed: true };
    return {
      allowed: false,
      reason: "hybrid",
      productKey: "PREMIUM_HYBRID",
      message: "Premium + Advisor Access unlocks What-If modeling and the Secure Portal.",
    };
  }

  if (tool.access === "one_time" && tool.productKey) {
    // Human Life Value: free to calculate, paywall only for PDF export
    if (tool.slug === "human-life-value") {
      return { allowed: true };
    }
    if (hasPurchase(user, tool.productKey)) return { allowed: true };
    return {
      allowed: false,
      reason: "one_time",
      productKey: tool.productKey,
      message: `Unlock lifetime access with a one-time ${tool.productKey === "LEGACY_VAULT" ? "$99" : "$49"} purchase.`,
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
  if (hasPurchase(user, "HLV_REPORT")) return { allowed: true };
  return {
    allowed: false,
    reason: "one_time",
    productKey: "HLV_REPORT",
    message: "Download the branded Family Financial Security Report for $49.",
  };
}

export function getToolAccess(user: UserWithPurchases | null, slug: string): AccessResult {
  const tool = getToolBySlug(slug);
  if (!tool) {
    return { allowed: false, reason: "auth", message: "Tool not found." };
  }
  return canAccessTool(user, tool);
}
