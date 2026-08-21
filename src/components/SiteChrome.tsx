"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HomeQuickLinksDock from "@/components/HomeQuickLinksDock";
import ScrollToTop from "@/components/ScrollToTop";

const TrustedPartners = dynamic(() => import("@/components/TrustedPartners"), {
  ssr: false,
  loading: () => null,
});

const PORTAL_PREFIXES = ["/dashboard", "/login", "/sign-up"];

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? "";
  const isPortal = PORTAL_PREFIXES.some((p) => pathname.startsWith(p));
  const isLinksHub = pathname === "/links" || pathname === "/es/links";
  const isSpanish = pathname.startsWith("/es");

  useEffect(() => {
    document.documentElement.lang = isSpanish ? "es" : "en";
  }, [isSpanish]);

  if (isPortal) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <main className={isLinksHub ? "main--linkhub" : undefined}>{children}</main>
      {!isLinksHub && <HomeQuickLinksDock />}
      <ScrollToTop variant="site" />
      {!isLinksHub && <TrustedPartners />}
      {!isLinksHub && <Footer />}
    </>
  );
}
