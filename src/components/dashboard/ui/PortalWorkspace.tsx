import type { ReactNode } from "react";

export default function PortalWorkspace({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`portal-workspace ${className}`.trim()}>
      <div className="portal-workspace-inner">{children}</div>
    </div>
  );
}
