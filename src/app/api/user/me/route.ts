import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { envFromProcess } from "@/lib/server/env";
import { fetchPortalUserResponse } from "@/lib/server/portal-user-handlers";

export async function GET(request: Request) {
  const env = envFromProcess();
  try {
    const result = await fetchPortalUserResponse(prisma, env, request);
    return NextResponse.json(result.body, { status: result.status });
  } catch (error) {
    console.error("[api/user/me]", error);
    return NextResponse.json({ error: "Failed to load user" }, { status: 500 });
  }
}
