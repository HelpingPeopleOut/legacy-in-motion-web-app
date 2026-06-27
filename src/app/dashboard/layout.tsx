import "./dashboard.css";
import DashboardShell from "@/components/dashboard/DashboardShell";
import LocalTestBanner from "@/components/dashboard/LocalTestBanner";
import { isLocalTestMode } from "@/lib/app-env";

export const metadata = {
  title: "Client Portal | Legacy in Motion",
  description: "Secure financial tools, calculators, and dashboards for Legacy in Motion clients.",
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const localTest = isLocalTestMode();

  return (
    <>
      {localTest && <LocalTestBanner />}
      <DashboardShell localTest={localTest}>{children}</DashboardShell>
    </>
  );
}
