import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { envFromProcess } from "@/lib/server/env";
import { handleStripeWebhook } from "@/lib/server/stripe-handlers";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = (await headers()).get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  const result = await handleStripeWebhook(prisma, envFromProcess(), body, signature);
  return NextResponse.json(result.body, { status: result.status });
}
