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
    <div className="portal-root">
      <header className="portal-topbar">
        <Link href="/dashboard" className="portal-topbar-mobile-brand">
          <span className="portal-sidebar-logo">LM</span>
          <span>
            <span className="portal-sidebar-sub">Legacy in Motion</span>
            <span className="portal-sidebar-title">Client Portal</span>
          </span>
        </Link>

        <div className="portal-topbar-actions">
          <Link href="/" className="portal-btn-ghost hidden md:inline-flex">
            <Home className="h-4 w-4" />
            Site
          </Link>
          <Link href="/#consultation" className="portal-btn-primary portal-header-cta-mobile">
            <Phone className="h-3.5 w-3.5" />
            Call
          </Link>
          <Link href="/#consultation" className="portal-btn-primary hidden text-xs md:inline-flex">
            Book free call
          </Link>
          {localTest ? (
            <span className="portal-preview-pill hidden sm:inline-flex">Preview</span>
          ) : (
            <span className="hidden sm:block">
              <ClerkUserButton />
            </span>
          )}
        </div>
      </header>

      <div className="portal-app-frame">
        <aside className="portal-sidebar portal-aside-nav" aria-label="Portal sidebar">
          <div className="portal-sidebar-brand">
            <span className="portal-sidebar-logo">LM</span>
            <div>
              <div className="portal-sidebar-sub">Legacy in Motion</div>
              <div className="portal-sidebar-title">Client Portal</div>
            </div>
          </div>

          <nav className="flex flex-col gap-0.5">
            {nav.slice(0, 2).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "portal-nav-link",
                  isNavActive(pathname ?? "", item.href) && "active"
                )}
              >
                <item.icon />
                {item.label}
              </Link>
            ))}
            <a href="/#consultation" className="portal-nav-link">
              <ExternalLink />
              Get advisor help
            </a>
          </nav>

          <div className="portal-sidebar-footer">
            {localTest && <span className="portal-preview-pill">All tools unlocked</span>}
            <Link href="/" className="portal-nav-link mt-2">
              <Home />
              Back to main site
            </Link>
          </div>
        </aside>

        <main className="portal-main">
          <div className="portal-main-inner">{children}</div>
        </main>
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
