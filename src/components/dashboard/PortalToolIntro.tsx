import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

export default function PortalToolIntro({
  icon: Icon,
  eyebrow,
  title,
  description,
  children,
}: {
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <div className="portal-card p-5 md:p-6">
      <p className="portal-hub-eyebrow mb-1">
        <Icon className="h-3.5 w-3.5" aria-hidden />
        {eyebrow}
      </p>
      <h2 className="text-lg font-semibold text-[var(--color-portal-text)]">{title}</h2>
      <p className="mt-1 max-w-xl text-sm text-[var(--color-portal-muted)]">{description}</p>
      {children}
    </div>
  );
}
