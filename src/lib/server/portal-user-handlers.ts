import { requireClerkUserId, ensureDbUserFromClerk } from "./clerk-handlers";
import { serializePortalUser } from "../portal-user-types";
import type { ServerEnv } from "./env";
import type { PrismaClient } from "@prisma/client";

export async function fetchPortalUserResponse(
  prisma: PrismaClient,
  env: ServerEnv,
  request: Request
): Promise<{ status: number; body: Record<string, unknown> }> {
  const clerkUserId = await requireClerkUserId(request, env);
  if (!clerkUserId) {
    return { status: 401, body: { user: null } };
  }

  const user = await ensureDbUserFromClerk(prisma, env, clerkUserId);
  if (!user) {
    return { status: 500, body: { error: "User sync failed" } };
  }

  return { status: 200, body: { user: serializePortalUser(user) } };
}
