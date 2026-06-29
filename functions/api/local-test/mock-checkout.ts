import type { ProductKey } from "@prisma/client";
import type { LocalTestScenario } from "../../../src/lib/local-test-shared";
import { PRODUCTS } from "../../../src/lib/products";

function productToScenario(productKey: ProductKey): LocalTestScenario {
  if (productKey === "HLV_REPORT" || productKey === "LEGACY_VAULT") return "one_time";
  if (productKey === "FAMILY_FORTRESS") return "all";
  if (productKey === "PREMIUM_HYBRID" || productKey === "ADVISOR_ANNUAL") return "hybrid";
  if (productKey === "PREMIUM_MONTHLY" || productKey === "PREMIUM_ANNUAL") return "premium";
  return "free";
}

type PagesContext = {
  request: Request;
  env: Record<string, string | undefined>;
};

export async function onRequestPost(context: PagesContext) {
  if (context.env.LOCAL_TEST_MODE !== "true") {
    return new Response(JSON.stringify({ error: "Not available" }), { status: 404 });
  }

  const body = (await context.request.json()) as { productKey?: ProductKey };
  const productKey = body.productKey;
  if (!productKey || !PRODUCTS[productKey]) {
    return new Response(JSON.stringify({ error: "Invalid product" }), { status: 400 });
  }

  const scenario = productToScenario(productKey);
  const origin =
    context.request.headers.get("origin") ??
    context.env.NEXT_PUBLIC_APP_URL ??
    "https://test-legacy-in-motion-web-app.pages.dev";

  return new Response(
    JSON.stringify({
      url: `${origin}/dashboard/billing?success=1&mock=1&product=${productKey}`,
      mock: true,
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Set-Cookie": `local_test_scenario=${scenario}; HttpOnly; SameSite=Lax; Path=/; Max-Age=${60 * 60 * 24 * 30}`,
      },
    }
  );
}
