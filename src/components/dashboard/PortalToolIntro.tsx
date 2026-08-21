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
    <div className="portal-intro-premium mb-5">
      <p className="portal-hub-eyebrow mb-2">
        <Icon className="h-3.5 w-3.5" aria-hidden />
        {eyebrow}
      </p>
      <h2 className="font-serif text-xl font-semibold tracking-tight text-[var(--color-portal-text)] md:text-2xl">
        {title}
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--color-portal-muted)] md:text-base">
        {description}
      </p>
      {children}
    </div>
  );
}
