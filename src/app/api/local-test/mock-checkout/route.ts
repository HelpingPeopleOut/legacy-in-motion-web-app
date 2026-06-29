import { NextResponse } from "next/server";
import type { ProductKey } from "@prisma/client";
import type { LocalTestScenario } from "@/lib/local-test-shared";
import { isLocalTestBuildSafe } from "@/lib/app-env";
import { PRODUCTS } from "@/lib/products";

function productToScenario(productKey: ProductKey): LocalTestScenario {
  if (productKey === "HLV_REPORT" || productKey === "LEGACY_VAULT") return "one_time";
  if (productKey === "FAMILY_FORTRESS") return "all";
  if (productKey === "PREMIUM_HYBRID" || productKey === "ADVISOR_ANNUAL") return "hybrid";
  if (productKey === "PREMIUM_MONTHLY" || productKey === "PREMIUM_ANNUAL") return "premium";
  return "free";
}

export async function POST(req: Request) {
  if (!isLocalTestBuildSafe()) {
    return NextResponse.json({ error: "Not available" }, { status: 404 });
  }

  const body = await req.json();
  const productKey = body.productKey as ProductKey;

  if (!productKey || !PRODUCTS[productKey]) {
    return NextResponse.json({ error: "Invalid product" }, { status: 400 });
  }

  const scenario = productToScenario(productKey);
  const origin = req.headers.get("origin") ?? process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

  const res = NextResponse.json({
    url: `${origin}/dashboard/billing?success=1&mock=1&product=${productKey}`,
    mock: true,
  });
  res.cookies.set("local_test_scenario", scenario, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  return res;
}
