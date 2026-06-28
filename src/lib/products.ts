import type { ProductKey } from "@prisma/client";
import {
  formatCheckoutEstimate,
  formatUsdFromCents,
  calculateCustomerTotalCents,
  STRIPE_FEE_DISCLOSURE_SHORT,
} from "./stripe-fees";

export type BillingMode = "one_time" | "subscription";

export interface ProductConfig {
  key: ProductKey;
  name: string;
  description: string;
  priceLabel: string;
  priceCents: number;
  billingMode: BillingMode;
  /** Recurring interval when billingMode is subscription */
  subscriptionInterval?: "month" | "year";
  stripePriceId: string | undefined;
  /** Tools unlocked by this product */
  unlocks: string[];
}

/** Client premium dashboards & trackers */
export const CLIENT_PREMIUM_UNLOCKS = [
  "financial-vital-signs",
  "policy-ladder",
  "retirement-forecaster",
  "emergency-fund",
] as const;

/** Advisor Pro — all client premium tools plus advisor-grade features */
export const ADVISOR_PRO_UNLOCKS = [
  ...CLIENT_PREMIUM_UNLOCKS,
  "what-if-scenarios",
  "secure-portal",
] as const;

export const PRODUCTS: Record<string, ProductConfig> = {
  HLV_REPORT: {
    key: "HLV_REPORT",
    name: "Family Financial Security Report",
    description: "Branded PDF report from your Human Life Value analysis.",
    priceLabel: "$49",
    priceCents: 4900,
    billingMode: "one_time",
    stripePriceId: process.env.STRIPE_PRICE_HLV_REPORT,
    unlocks: ["human-life-value:pdf"],
  },
  LEGACY_VAULT: {
    key: "LEGACY_VAULT",
    name: "Digital Legacy & Vault",
    description: "Lifetime access to organize policies, wills, and beneficiary instructions.",
    priceLabel: "$99",
    priceCents: 9900,
    billingMode: "one_time",
    stripePriceId: process.env.STRIPE_PRICE_LEGACY_VAULT,
    unlocks: ["legacy-vault"],
  },
  PREMIUM_MONTHLY: {
    key: "PREMIUM_MONTHLY",
    name: "Premium Client (Monthly)",
    description: "Unlock premium trackers and dashboards to get your financials in check.",
    priceLabel: "$5/mo",
    priceCents: 500,
    billingMode: "subscription",
    subscriptionInterval: "month",
    stripePriceId: process.env.STRIPE_PRICE_PREMIUM_MONTHLY,
    unlocks: [...CLIENT_PREMIUM_UNLOCKS],
  },
  PREMIUM_ANNUAL: {
    key: "PREMIUM_ANNUAL",
    name: "Premium Client (Annual)",
    description: "All Premium client tools — best value vs. monthly billing.",
    priceLabel: "$50/yr",
    priceCents: 5000,
    billingMode: "subscription",
    subscriptionInterval: "year",
    stripePriceId: process.env.STRIPE_PRICE_PREMIUM_ANNUAL,
    unlocks: [...CLIENT_PREMIUM_UNLOCKS],
  },
  PREMIUM_HYBRID: {
    key: "PREMIUM_HYBRID",
    name: "Advisor Pro (Monthly)",
    description:
      "Full client toolkit plus advisor tools — What-If Modeler, Secure Portal, and upcoming advisor releases.",
    priceLabel: "$15/mo",
    priceCents: 1500,
    billingMode: "subscription",
    subscriptionInterval: "month",
    stripePriceId: process.env.STRIPE_PRICE_PREMIUM_HYBRID,
    unlocks: [...ADVISOR_PRO_UNLOCKS],
  },
  ADVISOR_ANNUAL: {
    key: "ADVISOR_ANNUAL",
    name: "Advisor Pro (Annual)",
    description:
      "Everything in Advisor Pro — client premium tools, advisor workspace, and new releases as we ship them.",
    priceLabel: "$100/yr",
    priceCents: 10000,
    billingMode: "subscription",
    subscriptionInterval: "year",
    stripePriceId: process.env.STRIPE_PRICE_ADVISOR_ANNUAL,
    unlocks: [...ADVISOR_PRO_UNLOCKS],
  },
};

export function getProductByKey(key: ProductKey): ProductConfig | undefined {
  return PRODUCTS[key];
}

export const CLIENT_SUBSCRIPTION_KEYS = ["PREMIUM_MONTHLY", "PREMIUM_ANNUAL"] as const;
export const ADVISOR_SUBSCRIPTION_KEYS = ["PREMIUM_HYBRID", "ADVISOR_ANNUAL"] as const;

/** Customer-facing total including pass-through processing fee */
export function getCheckoutTotalLabel(product: ProductConfig): string {
  const suffix =
    product.billingMode === "subscription"
      ? product.subscriptionInterval === "year"
        ? "/yr"
        : "/mo"
      : "";
  return formatCheckoutEstimate(product.priceCents, suffix);
}

export function getProcessingFeeLabel(product: ProductConfig): string {
  const fee = calculateCustomerTotalCents(product.priceCents) - product.priceCents;
  if (fee <= 0) return "";
  return `+${formatUsdFromCents(fee)} processing`;
}

export { STRIPE_FEE_DISCLOSURE_SHORT };
