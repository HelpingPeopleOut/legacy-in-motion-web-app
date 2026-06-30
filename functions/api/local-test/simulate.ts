import type { LocalTestScenario } from "../../../src/lib/local-test-shared";
import { isValidScenario } from "../../../src/lib/local-test-shared";

type PagesContext = {
  request: Request;
  env: Record<string, string | undefined>;
};

export async function onRequestPost(context: PagesContext) {
  if (context.env.LOCAL_TEST_MODE !== "true") {
    return new Response(JSON.stringify({ error: "Not available" }), { status: 404 });
  }

  const body = (await context.request.json()) as { scenario?: string };
  const scenario = body.scenario;
  if (!scenario || !isValidScenario(scenario)) {
    return new Response(JSON.stringify({ error: "Invalid scenario" }), { status: 400 });
  }

  return new Response(JSON.stringify({ ok: true, scenario }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Set-Cookie": `local_test_scenario=${scenario}; HttpOnly; SameSite=Lax; Path=/; Max-Age=${60 * 60 * 24 * 30}`,
    },
  });
}
