import Link from "next/link";
import { TOOLS } from "@/lib/tools";
import { canAccessTool, hasActivePremium, hasPurchase } from "@/lib/access";
import type { User, Purchase } from "@prisma/client";
import { ToolIcon } from "./DashboardShell";
import { cn } from "@/lib/utils";

type UserWithPurchases = User & { purchases: Purchase[] };

const accessBadge = (tool: (typeof TOOLS)[0], user: UserWithPurchases | null) => {
  const access = canAccessTool(user, tool);
  if (access.allowed) {
    if (tool.access === "free") return { label: "Free", className: "text-emerald-400 bg-emerald-400/10" };
    return { label: "Unlocked", className: "text-[var(--color-portal-gold)] bg-[var(--color-portal-gold)]/10" };
  }
  if (tool.access === "one_time") return { label: tool.productKey === "HLV_REPORT" ? "$49 PDF" : "$99", className: "text-amber-400 bg-amber-400/10" };
  if (tool.access === "premium") return { label: "Premium", className: "text-sky-400 bg-sky-400/10" };
  return { label: "Advisor+", className: "text-purple-400 bg-purple-400/10" };
};

export default function ToolGrid({ user }: { user: UserWithPurchases | null }) {
  const premium = user ? hasActivePremium(user) : false;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">Your Financial Toolbox</h1>
        <p className="mt-2 max-w-2xl text-[var(--color-portal-muted)]">
          Calculators, trackers, and planning tools — built to protect your family and grow your legacy.
          {premium ? " Premium is active." : " Upgrade anytime to unlock ongoing dashboards."}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {TOOLS.map((tool) => {
          const badge = accessBadge(tool, user);
          const locked = !canAccessTool(user, tool).allowed && tool.slug !== "human-life-value";

          return (
            <Link
              key={tool.slug}
              href={`/dashboard/tools/${tool.slug}`}
              className={cn(
                "group rounded-xl border border-[var(--color-portal-border)] bg-[var(--color-portal-card)] p-5 transition hover:border-[var(--color-portal-gold)]/50 hover:shadow-lg hover:shadow-black/20",
                locked && "opacity-90"
              )}
            >
              <div className="mb-3 flex items-start justify-between">
                <div className="rounded-lg bg-[var(--color-portal-gold)]/10 p-2 text-[var(--color-portal-gold)]">
                  <ToolIcon name={tool.icon} className="h-5 w-5" />
                </div>
                <span className={cn("rounded-full px-2 py-0.5 text-xs font-medium", badge.className)}>
                  {badge.label}
                </span>
              </div>
              <h2 className="mb-1 font-semibold group-hover:text-[var(--color-portal-gold)]">{tool.name}</h2>
              <p className="text-sm text-[var(--color-portal-muted)] line-clamp-2">{tool.description}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export function UserStatusBanner({ user }: { user: UserWithPurchases }) {
  const premium = hasActivePremium(user);
  const vault = hasPurchase(user, "LEGACY_VAULT");
  const hlv = hasPurchase(user, "HLV_REPORT");

  return (
    <div className="mb-8 grid gap-3 sm:grid-cols-3">
      {[
        { label: "Premium", active: premium },
        { label: "HLV Report", active: hlv },
        { label: "Legacy Vault", active: vault },
      ].map((item) => (
        <div
          key={item.label}
          className="rounded-lg border border-[var(--color-portal-border)] bg-[var(--color-portal-card)] px-4 py-3 text-sm"
        >
          <span className="text-[var(--color-portal-muted)]">{item.label}</span>
          <span className={cn("ml-2 font-medium", item.active ? "text-emerald-400" : "text-[var(--color-portal-muted)]")}>
            {item.active ? "Active" : "—"}
          </span>
        </div>
      ))}
    </div>
  );
}
