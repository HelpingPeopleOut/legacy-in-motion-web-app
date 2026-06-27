import { ensureDbUser } from "@/lib/user";
import ToolGrid, { UserStatusBanner } from "@/components/dashboard/ToolGrid";
import LocalTestDevPanel from "@/components/dashboard/LocalTestDevPanel";
import { isLocalTestMode } from "@/lib/app-env";

export const dynamic = "force-static";

export default async function DashboardPage() {
  let user = null;
  try {
    user = await ensureDbUser();
  } catch {
    // Database not configured — local test uses mock user instead
  }

  const localTest = isLocalTestMode();

  return (
    <>
      {localTest && <LocalTestDevPanel />}
      {user && <UserStatusBanner user={user} />}
      <ToolGrid user={user} />
    </>
  );
}
