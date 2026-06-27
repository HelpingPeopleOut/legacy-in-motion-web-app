import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { ProductKey } from "@prisma/client";
import { createCheckoutSession, getStripe } from "@/lib/stripe";
import { ensureDbUser } from "@/lib/user";
import { PRODUCTS } from "@/lib/products";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const productKey = body.productKey as ProductKey;

    if (!productKey || !PRODUCTS[productKey]) {
      return NextResponse.json({ error: "Invalid product" }, { status: 400 });
    }

    const user = await ensureDbUser();
    if (!user) {
      return NextResponse.json({ error: "User sync failed" }, { status: 500 });
    }

    let customerId = user.stripeCustomerId;
    if (!customerId) {
      const customer = await getStripe().customers.create({
        email: user.email,
        name: user.name ?? undefined,
        metadata: { userId: user.id, clerkId: user.clerkId },
      });
      customerId = customer.id;
      const { prisma } = await import("@/lib/db");
      await prisma.user.update({
        where: { id: user.id },
        data: { stripeCustomerId: customerId },
      });
    }

    const origin = req.headers.get("origin") ?? process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
    const session = await createCheckoutSession({
      customerId,
      productKey,
      userId: user.id,
      successUrl: `${origin}/dashboard/billing?success=1`,
      cancelUrl: `${origin}/dashboard/billing?canceled=1`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("[stripe/checkout]", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Checkout failed" },
      { status: 500 }
    );
  }
}
