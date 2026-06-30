"use client";

import { SignUp } from "@clerk/react";

export default function ClerkSignUpPanel() {
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

  if (!publishableKey) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#0a0a0b] px-4 text-center">
        <p className="max-w-md text-gray-400">
          Sign-up is not configured. Set NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY in your environment.
        </p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#0a0a0b] px-4 py-10">
      <SignUp routing="hash" signInUrl="/login/sign-in" fallbackRedirectUrl="/dashboard" forceRedirectUrl="/dashboard" />
    </div>
  );
}
