import Link from "next/link";
import { TOOLS } from "@/lib/tools";
import { canAccessTool, hasActivePremium, hasPurchase } from "@/lib/access";
import type { User, Purchase } from "@prisma/client";
import { ToolIcon } from "./DashboardShell";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

type UserWithPurchases = User & { purchases: Purchase[] };

const accessBadge = (tool: (typeof TOOLS)[0], user: UserWithPurchases | null) => {
  const access = canAccessTool(user, tool);
  if (access.allowed) {
    if (tool.access === "free")
      return { label: "Free", className: "bg-emerald-50 text-emerald-700 border-emerald-200" };
    return { label: "Unlocked", className: "bg-[var(--color-portal-gold-light)] text-[var(--color-portal-gold)] border-amber-200" };
  }
  if (tool.access === "one_time")
    return {
      label: tool.productKey === "HLV_REPORT" ? "$49" : "$99",
      className: "bg-amber-50 text-amber-800 border-amber-200",
    };
  if (tool.access === "premium")
    return { label: "Premium", className: "bg-sky-50 text-sky-800 border-sky-200" };
  return { label: "Advisor+", className: "bg-violet-50 text-violet-800 border-violet-200" };
};

export default function ToolGrid({ user }: { user: UserWithPurchases | null }) {
  const premium = user ? hasActivePremium(user) : false;

  return (
    <div>
      <div className="mb-8">
        <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-[var(--color-portal-gold)]">
          Your financial toolkit
        </p>
        <h1 className="portal-hub-title font-serif text-3xl font-semibold tracking-tight text-[var(--color-portal-text)]">
          Fix problems. Track progress. Protect your family.
        </h1>
        <p className="mt-2 max-w-2xl text-[var(--color-portal-muted)]">
          Pick a tool below to get clarity on debt, coverage, retirement, and legacy — then book a free
          call when you&apos;re ready for a personalized plan.
          {premium ? " Your Premium plan is active." : ""}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {TOOLS.map((tool) => {
          const badge = accessBadge(tool, user);
          const locked = !canAccessTool(user, tool).allowed && tool.slug !== "human-life-value";

          return (
            <Link
              key={tool.slug}
              href={`/dashboard/tools/${tool.slug}`}
              className={cn(
                "portal-card group flex flex-col p-5 transition duration-200",
                locked && "opacity-95"
              )}
            >
              <div className="mb-4 flex items-start justify-between gap-2">
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-xl"
                  style={{ background: "var(--color-portal-gold-light)", color: "var(--color-portal-gold)" }}
                >
                  <ToolIcon name={tool.icon} className="h-5 w-5" />
                </div>
                <span
                  className={cn(
                    "rounded-full border px-2.5 py-0.5 text-xs font-semibold",
                    badge.className
                  )}
                >
                  {badge.label}
                </span>
              </div>
              <h2 className="mb-1 font-semibold text-[var(--color-portal-text)] group-hover:text-[var(--color-portal-gold)]">
                {tool.name}
              </h2>
              <p className="mb-4 flex-1 text-sm leading-relaxed text-[var(--color-portal-muted)] line-clamp-2">
                {tool.description}
              </p>
              <span className="inline-flex items-center gap-1 text-sm font-medium text-[var(--color-portal-gold)]">
                Open tool
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </span>
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
        { label: "Premium plan", active: premium },
        { label: "HLV report", active: hlv },
        { label: "Legacy vault", active: vault },
      ].map((item) => (
        <div key={item.label} className="portal-card px-4 py-3.5 text-sm">
          <span className="text-[var(--color-portal-muted)]">{item.label}</span>
          <span
            className={cn(
              "ml-2 font-semibold",
              item.active ? "text-[var(--color-portal-accent)]" : "text-[var(--color-portal-muted)]"
            )}
          >
            {item.active ? "Active" : "Not yet"}
          </span>
        </div>
      ))}
    </div>
  );
}
