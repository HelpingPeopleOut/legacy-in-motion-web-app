import "./globals.css";
import SiteChrome from "@/components/SiteChrome";
import { isLocalTestMode } from "@/lib/app-env";

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#000000",
};

export const metadata = {
  title: "Legacy in Motion | Wealth & Estate Planning",
  description:
    "Expert financial consulting in Los Angeles & the San Gabriel Valley. Specializing in Retirement Planning, Life Insurance with Living Benefits, and Estate Planning.",
  applicationName: "Legacy in Motion",
  keywords: [
    "Financial Planner Los Angeles",
    "Estate Planning SGV",
    "Living Benefits Life Insurance",
    "401k Rollovers",
    "Generational Wealth California",
  ],
  openGraph: {
    title: "Legacy in Motion | Wealth & Estate Planning",
    description:
      "Establish your financial fortress. Expert retirement, living benefits, and estate planning in Southern California.",
    url: "https://www.legacyinmotion.org",
    siteName: "Legacy in Motion",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Legacy in Motion - Financial Planning" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Legacy in Motion | Wealth & Estate Planning",
    description: "Establish your financial fortress in Southern California.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const head = (
    <>
      <link rel="icon" href="/favicon.ico?v=3" sizes="any" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png?v=3" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png?v=3" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png?v=3" />
      <link rel="manifest" href="/site.webmanifest?v=3" />
    </>
  );

  if (isLocalTestMode()) {
    return (
      <html lang="en" suppressHydrationWarning>
        <head>{head}</head>
        <body>
          <SiteChrome>{children}</SiteChrome>
        </body>
      </html>
    );
  }

  const ProductionRootLayout = require("@/components/ProductionRootLayout").default;

  return (
    <html lang="en" suppressHydrationWarning>
      <head>{head}</head>
      <body>
        <ProductionRootLayout>{children}</ProductionRootLayout>
      </body>
    </html>
  );
}
