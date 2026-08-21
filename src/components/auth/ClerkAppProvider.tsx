"use client";

import { ClerkProvider } from "@clerk/react";

export default function ClerkAppProvider({
  publishableKey,
  children,
}: {
  publishableKey: string;
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      publishableKey={publishableKey}
      signInUrl="/login/sign-in"
      signUpUrl="/sign-up/sign-up"
      afterSignOutUrl="/"
    >
      {children}
    </ClerkProvider>
  );
}
