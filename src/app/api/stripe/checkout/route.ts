import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { ProductKey } from "@prisma/client";
import { prisma } from "@/lib/db";
import { envFromProcess } from "@/lib/server/env";
import { runStripeCheckout } from "@/lib/server/stripe-handlers";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const productKey = body.productKey as ProductKey;
    const env = envFromProcess();
    const result = await runStripeCheckout(prisma, env, req, userId, productKey);
    return NextResponse.json(result.body, { status: result.status });
  } catch (error) {
    console.error("[stripe/checkout]", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Checkout failed" },
      { status: 500 }
    );
  }
}
