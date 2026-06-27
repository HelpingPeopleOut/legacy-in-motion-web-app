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
  Phone,
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
  { href: "/dashboard", label: "Tool Hub", shortLabel: "Tools", icon: LayoutDashboard },
  { href: "/dashboard/billing", label: "Plans & Billing", shortLabel: "Billing", icon: CreditCard },
  { href: "/#consultation", label: "Advisor Help", shortLabel: "Advisor", icon: ExternalLink, external: true },
];

function ClerkUserButton() {
  const { UserButton } = require("@clerk/nextjs");
  return <UserButton />;
}

function isNavActive(pathname: string, href: string) {
  if (href === "/dashboard") return pathname === "/dashboard";
  return pathname.startsWith(href);
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
      <header className="sticky top-0 z-50 border-b border-[var(--color-portal-border)] bg-white/95 backdrop-blur-md shadow-sm">
        <div className="mx-auto flex min-h-[3.75rem] max-w-6xl items-center justify-between gap-2 px-4 py-2 sm:min-h-[4.25rem] sm:px-6">
          <Link href="/dashboard" className="flex min-w-0 items-center gap-2">
            <span
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-sm font-bold text-white"
              style={{ background: "linear-gradient(135deg, #c9a227, #b8941f)" }}
            >
              LM
            </span>
            <span className="min-w-0 truncate sm:block">
              <span className="hidden text-xs font-medium uppercase tracking-wider text-[var(--color-portal-muted)] sm:block">
                Legacy in Motion
              </span>
              <span className="block truncate font-serif text-sm font-semibold text-[var(--color-portal-text)] sm:text-base">
                Client Portal
              </span>
            </span>
          </Link>
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <Link
              href="/"
              className="hidden items-center gap-1 text-sm text-[var(--color-portal-muted)] hover:text-[var(--color-portal-gold)] md:flex"
            >
              <Home className="h-4 w-4" />
              Main site
            </Link>
            <Link href="/#consultation" className="portal-btn-primary portal-header-cta-mobile">
              <Phone className="h-3.5 w-3.5" />
              Call
            </Link>
            <Link
              href="/#consultation"
              className="portal-btn-primary hidden text-xs md:inline-flex"
            >
              Book free call
            </Link>
            {localTest ? (
              <span className="hidden rounded-full border border-amber-200 bg-amber-50 px-2 py-1 text-[0.65rem] font-medium text-amber-800 sm:inline-block">
                Preview
              </span>
            ) : (
              <span className="hidden sm:block">
                <ClerkUserButton />
              </span>
            )}
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
          <aside className="portal-aside-nav hidden w-56 shrink-0 lg:block">
            <nav className="portal-card sticky top-[5.5rem] flex flex-col gap-0.5 p-2">
              {nav.slice(0, 2).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium transition",
                    isNavActive(pathname ?? "", item.href)
                      ? "bg-[var(--color-portal-gold-light)] text-[var(--color-portal-gold)]"
                      : "text-[var(--color-portal-muted)] hover:bg-[var(--color-portal-bg)] hover:text-[var(--color-portal-text)]"
                  )}
                >
                  <item.icon className="h-4 w-4 shrink-0" />
                  {item.label}
                </Link>
              ))}
              <a
                href="/#consultation"
                className="mt-1 flex items-center gap-2 rounded-lg border border-dashed border-[var(--color-portal-border)] px-3 py-2.5 text-sm text-[var(--color-portal-muted)] transition hover:border-[var(--color-portal-gold)] hover:text-[var(--color-portal-gold)]"
              >
                <ExternalLink className="h-4 w-4 shrink-0" />
                Get advisor help
              </a>
            </nav>
          </aside>
          <main className="min-w-0 flex-1">{children}</main>
        </div>
      </div>

      <nav className="portal-mobile-nav" aria-label="Portal navigation">
        {nav.map((item) => {
          const active = !item.external && isNavActive(pathname ?? "", item.href);
          const className = cn(active && "active");
          if (item.external) {
            return (
              <a key={item.href} href={item.href} className={className}>
                <item.icon />
                {item.shortLabel}
              </a>
            );
          }
          return (
            <Link key={item.href} href={item.href} className={className}>
              <item.icon />
              {item.shortLabel}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
