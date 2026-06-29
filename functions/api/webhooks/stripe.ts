import { handleStripeWebhook } from "../../../src/lib/server/stripe-handlers";
import { getPrisma, jsonResponse, pagesEnv } from "../../_lib/http";

type PagesContext = {
  request: Request;
  env: Record<string, string | undefined>;
};

export async function onRequestPost(context: PagesContext) {
  const env = pagesEnv(context.env);
  const signature = context.request.headers.get("stripe-signature");
  if (!signature) {
    return jsonResponse({ error: "Missing signature" }, 400);
  }

  try {
    const body = await context.request.text();
    const prisma = getPrisma(env);
    const result = await handleStripeWebhook(prisma, env, body, signature);
    return jsonResponse(result.body, result.status);
  } catch (error) {
    console.error("[stripe/webhook]", error);
    return jsonResponse({ error: "Webhook failed" }, 500);
  }
}
