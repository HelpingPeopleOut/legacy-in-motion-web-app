import ToolGrid from "@/components/dashboard/ToolGrid";
import LocalTestDevPanel from "@/components/dashboard/LocalTestDevPanel";
import PortalUserStatus from "@/components/dashboard/PortalUserStatus";
import { isLocalTestMode } from "@/lib/app-env";

export const dynamic = "force-static";

export default function DashboardPage() {
  const localTest = isLocalTestMode();

  return (
    <>
      {localTest && <LocalTestDevPanel />}
      <PortalUserStatus />
      <ToolGrid />
    </>
  );
}
