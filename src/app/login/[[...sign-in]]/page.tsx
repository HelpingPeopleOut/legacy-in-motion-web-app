import { redirect } from "next/navigation";
import { isLocalTestMode } from "@/lib/app-env";
import ClerkSignInPanel from "@/components/auth/ClerkSignInPanel";

export const dynamic = "force-static";

export const metadata = {
  title: "Sign In | Legacy in Motion Client Portal",
};

export default function LoginPage() {
  if (isLocalTestMode()) {
    redirect("/dashboard");
  }

  return <ClerkSignInPanel />;
}

export function generateStaticParams() {
  return [{ "sign-in": ["sign-in"] }];
}
