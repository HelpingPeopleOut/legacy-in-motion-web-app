import type { ProductKey } from "@prisma/client";

export type BillingMode = "one_time" | "subscription";

export interface ProductConfig {
  key: ProductKey;
  name: string;
  description: string;
  priceLabel: string;
  priceCents: number;
  billingMode: BillingMode;
  stripePriceId: string | undefined;
  /** Tools unlocked by this product */
  unlocks: string[];
}

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
    stripePriceId: process.env.STRIPE_PRICE_PREMIUM_MONTHLY,
    unlocks: [
      "financial-vital-signs",
      "policy-ladder",
      "retirement-forecaster",
      "emergency-fund",
    ],
  },
  PREMIUM_ANNUAL: {
    key: "PREMIUM_ANNUAL",
    name: "Premium Client (Annual)",
    description: "All Premium tools — best value vs. monthly billing.",
    priceLabel: "$50/yr",
    priceCents: 5000,
    billingMode: "subscription",
    stripePriceId: process.env.STRIPE_PRICE_PREMIUM_ANNUAL,
    unlocks: [
      "financial-vital-signs",
      "policy-ladder",
      "retirement-forecaster",
      "emergency-fund",
    ],
  },
  PREMIUM_HYBRID: {
    key: "PREMIUM_HYBRID",
    name: "Premium + Advisor Access",
    description: "All Premium tools plus What-If Scenarios and Secure Document Hub.",
    priceLabel: "Custom",
    priceCents: 0,
    billingMode: "subscription",
    stripePriceId: process.env.STRIPE_PRICE_PREMIUM_HYBRID,
    unlocks: [
      "financial-vital-signs",
      "policy-ladder",
      "retirement-forecaster",
      "emergency-fund",
      "what-if-scenarios",
      "secure-portal",
    ],
  },
};

export function getProductByKey(key: ProductKey): ProductConfig | undefined {
  return PRODUCTS[key];
}
