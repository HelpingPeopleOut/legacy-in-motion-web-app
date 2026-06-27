import { NextResponse } from "next/server";
import type { LocalTestScenario } from "@/lib/local-test-shared";
import { isLocalTestBuildSafe } from "@/lib/app-env";

const VALID: LocalTestScenario[] = ["free", "premium", "hybrid", "one_time", "all"];

export async function POST(req: Request) {
  if (!isLocalTestBuildSafe()) {
    return NextResponse.json({ error: "Not available" }, { status: 404 });
  }

  const body = await req.json();
  const scenario = body.scenario as LocalTestScenario;

  if (!VALID.includes(scenario)) {
    return NextResponse.json({ error: "Invalid scenario" }, { status: 400 });
  }

  const res = NextResponse.json({ ok: true, scenario });
  res.cookies.set("local_test_scenario", scenario, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  return res;
}

export async function GET() {
  if (!isLocalTestBuildSafe()) {
    return NextResponse.json({ error: "Not available" }, { status: 404 });
  }
  return NextResponse.json({
    enabled: true,
    scenarios: VALID,
    message: "Local test sandbox — mock billing only, nothing is charged.",
  });
}
