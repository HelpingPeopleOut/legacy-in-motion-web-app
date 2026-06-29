import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { envFromProcess } from "@/lib/server/env";
import { runBillingPortal } from "@/lib/server/stripe-handlers";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const env = envFromProcess();
    const result = await runBillingPortal(prisma, env, req, userId);
    return NextResponse.json(result.body, { status: result.status });
  } catch (error) {
    console.error("[stripe/portal]", error);
    return NextResponse.json({ error: "Portal failed" }, { status: 500 });
  }
}
