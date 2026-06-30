import { fetchPortalUserResponse } from "../../../src/lib/server/portal-user-handlers";
import { getPrisma, jsonResponse, pagesEnv } from "../../_lib/http";

type PagesContext = {
  request: Request;
  env: Record<string, string | undefined>;
};

export async function onRequestGet(context: PagesContext) {
  const env = pagesEnv(context.env);
  try {
    const prisma = getPrisma(env);
    const result = await fetchPortalUserResponse(prisma, env, context.request);
    return jsonResponse(result.body, result.status);
  } catch (error) {
    console.error("[user/me]", error);
    return jsonResponse({ error: "Failed to load user" }, 500);
  }
}
