"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CreditCard,
  Shield,
  Layers,
  TrendingUp,
  Lock,
  GitBranch,
  Activity,
  PiggyBank,
  Vault,
  BarChart3,
  Calculator,
  Clock,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  shield: Shield,
  vault: Vault,
  chart: BarChart3,
  activity: Activity,
  layers: Layers,
  trending: TrendingUp,
  piggy: PiggyBank,
  "git-branch": GitBranch,
  lock: Lock,
  zap: Zap,
  calculator: Calculator,
  clock: Clock,
};

export function ToolIcon({ name, className }: { name: string; className?: string }) {
  const Icon = iconMap[name] ?? LayoutDashboard;
  return <Icon className={className} />;
}

const nav = [
  { href: "/dashboard", label: "Tool Hub", icon: LayoutDashboard },
  { href: "/dashboard/billing", label: "Billing", icon: CreditCard },
];

function ClerkUserButton() {
  const { UserButton } = require("@clerk/nextjs");
  return <UserButton />;
}

export default function DashboardShell({
  children,
  localTest = false,
}: {
  children: React.ReactNode;
  localTest?: boolean;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[var(--color-portal-bg)] text-white">
      <header className="sticky top-0 z-50 border-b border-[var(--color-portal-border)] bg-[var(--color-portal-bg)]/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <Link href="/dashboard" className="font-serif text-lg tracking-wide">
            Legacy in Motion <span className="text-[var(--color-portal-gold)]">Client Portal</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/" className="hidden text-sm text-[var(--color-portal-muted)] hover:text-white sm:block">
              Main site
            </Link>
            {localTest ? (
              <span className="rounded-full border border-amber-500/40 bg-amber-500/10 px-3 py-1 text-xs text-amber-300">
                Test Client
              </span>
            ) : (
              <ClerkUserButton />
            )}
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-7xl gap-8 px-4 py-8 sm:px-6">
        <aside className="hidden w-52 shrink-0 md:block">
          <nav className="space-y-1">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition",
                  pathname === item.href
                    ? "bg-[var(--color-portal-gold)]/15 text-[var(--color-portal-gold)]"
                    : "text-[var(--color-portal-muted)] hover:bg-[var(--color-portal-card)] hover:text-white"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}
