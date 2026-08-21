import type { ProductKey } from "@prisma/client";
import type { BillingMode } from "../billing-types";
import type { ServerEnv } from "./env";

export type RuntimeProduct = {
  key: ProductKey;
  name: string;
  description: string;
  priceLabel: string;
  priceCents: number;
  billingMode: BillingMode;
  subscriptionInterval?: "month" | "year";
  stripePriceId: string | undefined;
};

const CATALOG: Omit<RuntimeProduct, "stripePriceId">[] = [
  {
    key: "HLV_REPORT",
    name: "Family Financial Security Report",
    description: "Branded PDF report from your Human Life Value analysis.",
    priceLabel: "$49",
    priceCents: 4900,
    billingMode: "one_time",
  },
  {
    key: "LEGACY_VAULT",
    name: "Digital Legacy & Vault",
    description: "Lifetime access to organize policies, wills, and beneficiary instructions.",
    priceLabel: "$99",
    priceCents: 9900,
    billingMode: "one_time",
  },
  {
    key: "PREMIUM_MONTHLY",
    name: "Premium Client (Monthly)",
    description: "Unlock premium trackers and dashboards to get your financials in check.",
    priceLabel: "$5/mo",
    priceCents: 500,
    billingMode: "subscription",
    subscriptionInterval: "month",
  },
  {
    key: "PREMIUM_ANNUAL",
    name: "Premium Client (Annual)",
    description: "All Premium client tools — best value vs. monthly billing.",
    priceLabel: "$50/yr",
    priceCents: 5000,
    billingMode: "subscription",
    subscriptionInterval: "year",
  },
  {
    key: "FAMILY_FORTRESS",
    name: "Family Financial Fortress Bundle",
    description:
      "Best seller — premium trackers plus HLV security report and Digital Legacy Vault. Save vs. buying separately.",
    priceLabel: "$129/yr",
    priceCents: 12900,
    billingMode: "subscription",
    subscriptionInterval: "year",
  },
  {
    key: "PREMIUM_HYBRID",
    name: "Advisor Pro (Monthly)",
    description: "Full client toolkit plus advisor tools — What-If Modeler, Secure Portal, and upcoming advisor releases.",
    priceLabel: "$15/mo",
    priceCents: 1500,
    billingMode: "subscription",
    subscriptionInterval: "month",
  },
  {
    key: "ADVISOR_ANNUAL",
    name: "Advisor Pro (Annual)",
    description: "Everything in Advisor Pro — client premium tools, advisor workspace, and new releases as we ship them.",
    priceLabel: "$100/yr",
    priceCents: 10000,
    billingMode: "subscription",
    subscriptionInterval: "year",
  },
];

const PRICE_ENV_KEYS: Record<ProductKey, keyof ServerEnv> = {
  HLV_REPORT: "STRIPE_PRICE_HLV_REPORT",
  LEGACY_VAULT: "STRIPE_PRICE_LEGACY_VAULT",
  PREMIUM_MONTHLY: "STRIPE_PRICE_PREMIUM_MONTHLY",
  PREMIUM_ANNUAL: "STRIPE_PRICE_PREMIUM_ANNUAL",
  FAMILY_FORTRESS: "STRIPE_PRICE_FAMILY_FORTRESS",
  PREMIUM_HYBRID: "STRIPE_PRICE_PREMIUM_HYBRID",
  ADVISOR_ANNUAL: "STRIPE_PRICE_ADVISOR_ANNUAL",
};

export function getProductsForEnv(env: ServerEnv): Record<string, RuntimeProduct> {
  const out: Record<string, RuntimeProduct> = {};
  for (const item of CATALOG) {
    const envKey = PRICE_ENV_KEYS[item.key];
    out[item.key] = {
      ...item,
      stripePriceId: env[envKey] as string | undefined,
    };
  }
  return out;
}
