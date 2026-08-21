"use client";

import { UserStatusBanner } from "./ToolGrid";
import { usePortalUser } from "@/hooks/usePortalUser";

export default function PortalUserStatus() {
  const { user, loading, preview, stripeLive } = usePortalUser();

  if (preview || loading || !user) return null;
  if (stripeLive && !user) return null;

  return <UserStatusBanner user={user} />;
}
