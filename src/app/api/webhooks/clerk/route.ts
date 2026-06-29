import { headers } from "next/headers";
import { prisma } from "@/lib/db";
import { envFromProcess } from "@/lib/server/env";
import { handleClerkWebhook } from "@/lib/server/clerk-handlers";

export async function POST(req: Request) {
  const payload = await req.text();
  const headerPayload = await headers();
  const result = await handleClerkWebhook(prisma, envFromProcess(), payload, headerPayload);
  return new Response(result.body, { status: result.status });
}
