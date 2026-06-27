"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TrustedPartners from "@/components/TrustedPartners";

const PORTAL_PREFIXES = ["/dashboard", "/login", "/sign-up"];

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? "";
  const isPortal = PORTAL_PREFIXES.some((p) => pathname.startsWith(p));

  if (isPortal) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <main>{children}</main>
      <TrustedPartners />
      <Footer />
    </>
  );
}
