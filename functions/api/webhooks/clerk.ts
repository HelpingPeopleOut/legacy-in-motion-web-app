import { handleClerkWebhook } from "../../../src/lib/server/clerk-handlers";
import { getPrisma, pagesEnv } from "../../_lib/http";

type PagesContext = {
  request: Request;
  env: Record<string, string | undefined>;
};

export async function onRequestPost(context: PagesContext) {
  const env = pagesEnv(context.env);
  const payload = await context.request.text();
  const prisma = getPrisma(env);
  const result = await handleClerkWebhook(prisma, env, payload, context.request.headers);
  return new Response(result.body, { status: result.status });
}
