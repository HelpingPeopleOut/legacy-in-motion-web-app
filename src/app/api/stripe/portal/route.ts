import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { createBillingPortalSession } from "@/lib/stripe";
import { ensureDbUser } from "@/lib/user";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await ensureDbUser();
    if (!user?.stripeCustomerId) {
      return NextResponse.json({ error: "No billing account yet" }, { status: 400 });
    }

    const origin = req.headers.get("origin") ?? process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
    const session = await createBillingPortalSession(user.stripeCustomerId, `${origin}/dashboard/billing`);

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("[stripe/portal]", error);
    return NextResponse.json({ error: "Portal failed" }, { status: 500 });
  }
}
