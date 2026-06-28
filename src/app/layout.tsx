import type { Metadata } from "next";
import { rootSiteMetadata } from "@/lib/site-metadata";
import { inter, playfair } from "@/lib/fonts";
import "./globals.css";
import "./responsive.css";
import SiteChrome from "@/components/SiteChrome";
import RootOrganizationSchema from "@/components/seo/RootOrganizationSchema";

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover" as const,
  themeColor: "#ffffff",
};

export const metadata: Metadata = rootSiteMetadata;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico?v=4" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png?v=4" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png?v=4" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png?v=4" />
        <link rel="manifest" href="/site.webmanifest?v=4" />
        <link rel="preload" href="/images/nelly/nelly-professional.jpg" as="image" type="image/jpeg" />
        <link rel="alternate" type="text/plain" href="/llms.txt" title="LLMs Context" />
        <link rel="alternate" type="text/plain" href="/llms-es.txt" hrefLang="es" title="LLMs Context (Spanish)" />
        <link rel="alternate" type="application/json" href="/enterprise-profile.json" title="Enterprise AI Profile" />
        <link rel="alternate" type="application/json" href="/ai-plugin.json" title="AI Plugin Manifest" />
        <link rel="author" type="text/plain" href="/humans.txt" title="humans.txt" />
      </head>
      <body>
        <RootOrganizationSchema />
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
