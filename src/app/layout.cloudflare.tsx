import "./globals.css";
import SiteChrome from "@/components/SiteChrome";

// Static export layout — no Clerk (used only during Cloudflare Pages build)
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
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico?v=3" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png?v=3" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png?v=3" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png?v=3" />
        <link rel="manifest" href="/site.webmanifest?v=3" />
      </head>
      <body>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
