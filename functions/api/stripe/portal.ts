import { requireClerkUserId } from "../../../src/lib/server/clerk-handlers";
import { runBillingPortal } from "../../../src/lib/server/stripe-handlers";
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
    const prisma = getPrisma(env);
    const result = await runBillingPortal(prisma, env, context.request, clerkUserId);
    return jsonResponse(result.body, result.status);
  } catch (error) {
    console.error("[stripe/portal]", error);
    return jsonResponse({ error: "Portal failed" }, 500);
  }
}
