import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextFetchEvent, NextRequest } from "next/server";
import { isLocalTestMode } from "@/lib/app-env";

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/api/stripe/checkout(.*)",
  "/api/stripe/portal(.*)",
]);

const clerkHandler = clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});

export default function middleware(req: NextRequest, event: NextFetchEvent) {
  if (isLocalTestMode()) {
    return NextResponse.next();
  }
  return clerkHandler(req, event);
}

/** Limit Clerk middleware to auth/portal/API paths — skip public marketing pages for TTFB. */
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/login/:path*",
    "/sign-up/:path*",
    "/api/stripe/:path*",
    "/api/webhooks/:path*",
  ],
};
