import type { ProductKey } from "@prisma/client";
import { requireClerkUserId } from "../../../src/lib/server/clerk-handlers";
import { runStripeCheckout } from "../../../src/lib/server/stripe-handlers";
import { getPrisma, jsonResponse, pagesEnv } from "../../_lib/http";

type PagesContext = {
  request: Request;
  env: Record<string, string | undefined>;
};

export async function onRequestPost(context: PagesContext) {
  const env = pagesEnv(context.env);
  const clerkUserId = await requireClerkUserId(context.request, env);
  if (!clerkUserId) {
    return jsonResponse({ error: "Unauthorized" }, 401);
  }

  try {
    const body = (await context.request.json()) as { productKey?: ProductKey };
    const prisma = getPrisma(env);
    const result = await runStripeCheckout(prisma, env, context.request, clerkUserId, body.productKey!);
    return jsonResponse(result.body, result.status);
  } catch (error) {
    console.error("[stripe/checkout]", error);
    return jsonResponse(
      { error: error instanceof Error ? error.message : "Checkout failed" },
      500
    );
  }
}
