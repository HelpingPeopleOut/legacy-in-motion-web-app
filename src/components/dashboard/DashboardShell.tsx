"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  CreditCard,
  Home,
  Phone,
  ArrowLeft,
} from "lucide-react";
import { UserButton } from "@clerk/react";
import { cn } from "@/lib/utils";
import ScrollToTop from "@/components/ScrollToTop";
import { ToolIcon } from "./ToolIcon";

export { ToolIcon };

type NavItem = {
  href: string;
  label: string;
  shortLabel: string;
  icon: React.ComponentType<{ className?: string }>;
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

function ClerkUserButton() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted || !process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) return null;
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
      <header className="portal-topbar portal-topbar--premium">
        <Link href="/dashboard" className="portal-topbar-brand">
          <span className="portal-sidebar-logo portal-sidebar-logo--premium">LM</span>
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

      {/* Mobile / tablet portrait — bottom tab bar (keeps top header minimal) */}
      <nav className="portal-mobile-nav portal-mobile-nav--premium" aria-label="Portal navigation">
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
