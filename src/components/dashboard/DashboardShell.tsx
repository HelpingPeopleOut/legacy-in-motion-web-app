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
  Home,
  ExternalLink,
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
  { href: "/dashboard/billing", label: "Plans & Billing", icon: CreditCard },
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
    <div className="portal-root min-h-screen">
      <header className="sticky top-0 z-50 border-b border-[var(--color-portal-border)] bg-white/90 backdrop-blur-md shadow-sm">
        <div className="mx-auto flex h-[4.25rem] max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link href="/dashboard" className="flex items-center gap-2">
            <span
              className="flex h-9 w-9 items-center justify-center rounded-lg text-sm font-bold text-white"
              style={{ background: "linear-gradient(135deg, #c9a227, #b8941f)" }}
            >
              LM
            </span>
            <span className="hidden sm:block">
              <span className="block text-xs font-medium uppercase tracking-wider text-[var(--color-portal-muted)]">
                Legacy in Motion
              </span>
              <span className="block font-serif text-base font-semibold text-[var(--color-portal-text)]">
                Client Portal
              </span>
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="hidden items-center gap-1 text-sm text-[var(--color-portal-muted)] hover:text-[var(--color-portal-gold)] sm:flex"
            >
              <Home className="h-4 w-4" />
              Main site
            </Link>
            <Link
              href="/#consultation"
              className="portal-btn-primary hidden text-xs sm:inline-flex"
            >
              Book free call
            </Link>
            {localTest ? (
              <span className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-medium text-amber-800">
                Preview
              </span>
            ) : (
              <ClerkUserButton />
            )}
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="flex flex-col gap-8 lg:flex-row">
          <aside className="lg:w-56 lg:shrink-0">
            <nav className="portal-card flex flex-row gap-1 p-1.5 lg:flex-col lg:gap-0.5 lg:p-2">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium transition lg:flex-none lg:justify-start",
                    pathname === item.href
                      ? "bg-[var(--color-portal-gold-light)] text-[var(--color-portal-gold)]"
                      : "text-[var(--color-portal-muted)] hover:bg-[var(--color-portal-bg)] hover:text-[var(--color-portal-text)]"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              ))}
              <a
                href="/#consultation"
                className="mt-0 flex flex-1 items-center justify-center gap-2 rounded-lg border border-dashed border-[var(--color-portal-border)] px-3 py-2.5 text-sm text-[var(--color-portal-muted)] transition hover:border-[var(--color-portal-gold)] hover:text-[var(--color-portal-gold)] lg:mt-2 lg:flex-none lg:justify-start"
              >
                <ExternalLink className="h-4 w-4" />
                Get advisor help
              </a>
            </nav>
          </aside>
          <main className="min-w-0 flex-1">{children}</main>
        </div>
      </div>
    </div>
  );
}
