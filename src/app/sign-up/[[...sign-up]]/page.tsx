import { redirect } from "next/navigation";
import { isLocalTestMode } from "@/lib/app-env";

export const dynamic = "force-static";

export const metadata = {
  title: "Sign Up | Legacy in Motion Client Portal",
};

export default function SignUpPage() {
  if (isLocalTestMode()) {
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#0a0a0b] px-4">
      <p className="text-gray-400">Sign-up requires server deployment with Clerk configured.</p>
    </div>
  );
}

export function generateStaticParams() {
  return [{ "sign-up": ["sign-up"] }];
}
