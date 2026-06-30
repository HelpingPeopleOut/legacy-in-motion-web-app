import { redirect } from "next/navigation";
import { isLocalTestMode } from "@/lib/app-env";
import ClerkSignUpPanel from "@/components/auth/ClerkSignUpPanel";

export const dynamic = "force-static";

export const metadata = {
  title: "Sign Up | Legacy in Motion Client Portal",
};

export default function SignUpPage() {
  if (isLocalTestMode()) {
    redirect("/dashboard");
  }

  return <ClerkSignUpPanel />;
}

export function generateStaticParams() {
  return [{ "sign-up": ["sign-up"] }];
}
