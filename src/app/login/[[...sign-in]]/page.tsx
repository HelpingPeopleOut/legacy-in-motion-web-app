import { redirect } from "next/navigation";
import { isLocalTestMode } from "@/lib/app-env";

export const dynamic = "force-static";

export const metadata = {
  title: "Sign In | Legacy in Motion Client Portal",
};

export default function LoginPage() {
  if (isLocalTestMode()) {
    redirect("/dashboard");
  }

  // Clerk sign-in only used when not in local test / static preview mode
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#0a0a0b] px-4">
      <p className="text-gray-400">Sign-in requires server deployment with Clerk configured.</p>
    </div>
  );
}

export function generateStaticParams() {
  return [{ "sign-in": ["sign-in"] }];
}
