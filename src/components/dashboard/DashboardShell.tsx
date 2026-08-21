"use client";

import type { ComponentType } from "react";
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
  ArrowLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";
import ScrollToTop from "@/components/ScrollToTop";

const iconMap: Record<string, ComponentType<{ className?: string }>> = {
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

type NavItem = {
  href: string;
  label: string;
  shortLabel: string;
  icon: ComponentType<{ className?: string }>;
  external?: boolean;
  siteHome?: boolean;
};

function isNavActive(pathname: string, item: NavItem) {
  if (item.siteHome) return false;
  if (item.href === "/dashboard") return pathname === "/dashboard";
  return pathname.startsWith(item.href);
}

function NavTab({ item, pathname }: { item: NavItem; pathname: string }) {
  const active = !item.external && !item.siteHome && isNavActive(pathname, item);
  const className = cn(
    "portal-topbar-tab",
    active && "active",
    item.siteHome && "portal-topbar-tab--home"
  );

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

/**
 * Account menu for non-static deployments (Vercel/Node with ClerkProvider in root layout).
 * Cloudflare static export must keep localTest=true so this never mounts — @clerk/nextjs
 * uses Server Actions incompatible with `output: "export"`.
 */
function ClerkUserButton() {
  // Lazy require keeps Clerk out of the CF Pages SSR graph when this branch is unused.
  // eslint-disable-next-line @typescript-eslint/no-require-imports
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
  const pathname = usePathname() ?? "";
  const isSpanish = pathname.startsWith("/es");
  const homeHref = isSpanish ? "/es" : "/";
  const consultationHref = isSpanish ? "/es#consultation" : "/#consultation";

  const nav: NavItem[] = [
    {
      href: homeHref,
      label: isSpanish ? "Inicio" : "Home",
      shortLabel: isSpanish ? "Inicio" : "Home",
      icon: Home,
      siteHome: true,
    },
    { href: "/dashboard", label: "Tool Hub", shortLabel: "Tools", icon: LayoutDashboard },
    { href: "/dashboard/billing", label: "Plans & Billing", shortLabel: "Billing", icon: CreditCard },
    {
      href: consultationHref,
      label: isSpanish ? "Ayuda" : "Advisor Help",
      shortLabel: isSpanish ? "Asesor" : "Advisor",
      icon: Phone,
      external: true,
    },
  ];

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

        <nav className="portal-topbar-nav" aria-label="Portal sections">
          {nav.map((item) => (
            <NavTab key={item.href} item={item} pathname={pathname} />
          ))}
        </nav>

        <div className="portal-topbar-actions">
          {localTest && <span className="portal-preview-pill hidden sm:inline-flex">Preview</span>}
          <Link
            href={homeHref}
            className="portal-btn-secondary portal-topbar-home-btn hidden sm:inline-flex"
            title={isSpanish ? "Volver al sitio principal" : "Back to main website"}
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            <span>{isSpanish ? "Sitio principal" : "Main site"}</span>
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

      <nav className="portal-mobile-nav" aria-label="Portal navigation">
        {nav.map((item) => {
          const active = !item.external && !item.siteHome && isNavActive(pathname, item);
          const className = cn(active && "active", item.siteHome && "portal-mobile-nav-home");
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

      <ScrollToTop variant="portal" />
    </div>
  );
}
