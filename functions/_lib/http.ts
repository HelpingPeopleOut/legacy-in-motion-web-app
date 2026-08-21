import type { ServerEnv } from "../../src/lib/server/env";
import { createEdgePrisma } from "../../src/lib/server/db-edge";

export function jsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export function getPrisma(env: ServerEnv) {
  if (!env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not configured");
  }
  return createEdgePrisma(env.DATABASE_URL);
}

export function appOrigin(request: Request, env: ServerEnv): string {
  return request.headers.get("origin") ?? env.NEXT_PUBLIC_APP_URL ?? "https://www.legacyinmotion.org";
}

/** Cloudflare Pages Function env → ServerEnv */
export function pagesEnv(raw: Record<string, string | undefined>): ServerEnv {
  return {
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: raw.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    STRIPE_SECRET_KEY: raw.STRIPE_SECRET_KEY,
    STRIPE_WEBHOOK_SECRET: raw.STRIPE_WEBHOOK_SECRET,
    CLERK_SECRET_KEY: raw.CLERK_SECRET_KEY,
    CLERK_WEBHOOK_SECRET: raw.CLERK_WEBHOOK_SECRET,
    DATABASE_URL: raw.DATABASE_URL,
    NEXT_PUBLIC_APP_URL: raw.NEXT_PUBLIC_APP_URL,
    STRIPE_PRICE_HLV_REPORT: raw.STRIPE_PRICE_HLV_REPORT,
    STRIPE_PRICE_LEGACY_VAULT: raw.STRIPE_PRICE_LEGACY_VAULT,
    STRIPE_PRICE_PREMIUM_MONTHLY: raw.STRIPE_PRICE_PREMIUM_MONTHLY,
    STRIPE_PRICE_PREMIUM_ANNUAL: raw.STRIPE_PRICE_PREMIUM_ANNUAL,
    STRIPE_PRICE_FAMILY_FORTRESS: raw.STRIPE_PRICE_FAMILY_FORTRESS,
    STRIPE_PRICE_PREMIUM_HYBRID: raw.STRIPE_PRICE_PREMIUM_HYBRID,
    STRIPE_PRICE_ADVISOR_ANNUAL: raw.STRIPE_PRICE_ADVISOR_ANNUAL,
    STRIPE_PASS_FEES_TO_CUSTOMER: raw.STRIPE_PASS_FEES_TO_CUSTOMER,
    STRIPE_FEE_PERCENT: raw.STRIPE_FEE_PERCENT,
    STRIPE_FEE_FIXED_CENTS: raw.STRIPE_FEE_FIXED_CENTS,
  };
}
