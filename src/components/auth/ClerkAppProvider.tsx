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
      signInUrl="/login"
      signUpUrl="/sign-up"
      afterSignOutUrl="/"
    >
      {children}
    </ClerkProvider>
  );
}
