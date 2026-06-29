import type { ProductKey } from "@prisma/client";

/** All billable product keys — safe to import from Cloudflare Workers (no process.env). */
export const ALL_PRODUCT_KEYS: ProductKey[] = [
  "HLV_REPORT",
  "LEGACY_VAULT",
  "PREMIUM_MONTHLY",
  "PREMIUM_ANNUAL",
  "FAMILY_FORTRESS",
  "PREMIUM_HYBRID",
  "ADVISOR_ANNUAL",
];

export function isValidProductKey(key: string): key is ProductKey {
  return (ALL_PRODUCT_KEYS as string[]).includes(key);
}
