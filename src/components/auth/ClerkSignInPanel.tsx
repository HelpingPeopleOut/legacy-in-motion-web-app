"use client";

import { SignIn } from "@clerk/react";
import ClerkAppProvider from "@/components/auth/ClerkAppProvider";

export default function ClerkSignInPanel() {
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

  if (!publishableKey) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#0a0a0b] px-4 text-center">
        <p className="max-w-md text-gray-400">
          Sign-in is not configured. Set NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY in your environment.
        </p>
      </div>
    );
  }

  return (
    <ClerkAppProvider publishableKey={publishableKey}>
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#0a0a0b] px-4 py-10">
        <SignIn routing="hash" signUpUrl="/sign-up/sign-up" fallbackRedirectUrl="/dashboard" forceRedirectUrl="/dashboard" />
      </div>
    </ClerkAppProvider>
  );
}
