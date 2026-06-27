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
  ClipboardCheck,
  GraduationCap,
  Home,
  Phone,
  Users,
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
  users: Users,
  clipboard: ClipboardCheck,
  graduation: GraduationCap,
  "home-shield": Home,
};

export function ToolIcon({ name, className }: { name: string; className?: string }) {
  const Icon = iconMap[name] ?? LayoutDashboard;
  return <Icon className={className} />;
}

const nav = [
  { href: "/dashboard", label: "Tool Hub", shortLabel: "Tools", icon: LayoutDashboard },
  { href: "/dashboard/billing", label: "Plans & Billing", shortLabel: "Billing", icon: CreditCard },
  { href: "/#consultation", label: "Advisor Help", shortLabel: "Advisor", icon: Phone, external: true },
];

function ClerkUserButton() {
  const { UserButton } = require("@clerk/nextjs");
  return <UserButton />;
}

function isNavActive(pathname: string, href: string) {
  if (href === "/dashboard") return pathname === "/dashboard";
  return pathname.startsWith(href);
}

function NavTab({
  item,
  pathname,
}: {
  item: (typeof nav)[number];
  pathname: string;
}) {
  const active = !item.external && isNavActive(pathname, item.href);
  const className = cn("portal-topbar-tab", active && "active");

  if (item.external) {
    return (
      <a href={item.href} className={cn(className, "portal-topbar-tab--advisor")}>
        <item.icon />
        <span>{item.label}</span>
      </a>
    );
  }

  return (
    <Link href={item.href} className={className}>
      <item.icon />
      <span>{item.label}</span>
    </Link>
  );
}

export default function DashboardShell({
  children,
  localTest = false,
}: {
  children: React.ReactNode;
  localTest?: boolean;
}) {
  const pathname = usePathname() ?? "";

  return (
    <div className="portal-root">
      <header className="portal-topbar">
        <Link href="/dashboard" className="portal-topbar-brand">
          <span className="portal-sidebar-logo">LM</span>
          <span className="portal-topbar-brand-text">
            <span className="portal-sidebar-sub">Legacy in Motion</span>
            <span className="portal-sidebar-title">Client Portal</span>
          </span>
        </Link>

        {/* Desktop / tablet landscape — tabs live in the header, not a sidebar */}
        <nav className="portal-topbar-nav" aria-label="Portal sections">
          {nav.map((item) => (
            <NavTab key={item.href} item={item} pathname={pathname} />
          ))}
        </nav>

        <div className="portal-topbar-actions">
          {localTest && <span className="portal-preview-pill hidden sm:inline-flex">Preview</span>}
          <Link href="/" className="portal-btn-ghost portal-topbar-site-link" title="Back to main site">
            <Home className="h-4 w-4" />
            <span className="hidden lg:inline">Main site</span>
          </Link>
          {!localTest && (
            <span className="portal-topbar-user">
              <ClerkUserButton />
            </span>
          )}
        </div>
      </header>

      <main className="portal-main">
        <div className="portal-main-inner">{children}</div>
      </main>

      {/* Mobile / tablet portrait — bottom tab bar (keeps top header minimal) */}
      <nav className="portal-mobile-nav" aria-label="Portal navigation">
        {nav.map((item) => {
          const active = !item.external && isNavActive(pathname, item.href);
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
