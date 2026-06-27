import "./globals.css";
import "./responsive.css";
import SiteChrome from "@/components/SiteChrome";
import RootOrganizationSchema from "@/components/seo/RootOrganizationSchema";

// Static export layout — no Clerk (used only during Cloudflare Pages build)
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover",
  themeColor: "#ffffff",
};

export const metadata = {
  metadataBase: new URL("https://www.legacyinmotion.org"),
  title: "Legacy in Motion | Wealth & Estate Planning",
  description:
    "Expert financial consulting in Los Angeles & the San Gabriel Valley. Specializing in Retirement Planning, Life Insurance with Living Benefits, and Estate Planning.",
  applicationName: "Legacy in Motion",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@500;600;700&display=swap" rel="stylesheet" />
        <link rel="icon" href="/favicon.ico?v=3" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png?v=3" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png?v=3" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png?v=3" />
        <link rel="manifest" href="/site.webmanifest?v=3" />
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
