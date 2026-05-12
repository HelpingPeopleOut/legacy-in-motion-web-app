import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TrustedPartners from "@/components/TrustedPartners";

// --- ENTERPRISE PWA VIEWPORT LOCK ---
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#000000",
};

export const metadata = {
  title: "Legacy in Motion | Wealth & Estate Planning",
  description: "Expert financial consulting in Los Angeles & the San Gabriel Valley. Specializing in Retirement Planning, Life Insurance with Living Benefits, and Estate Planning.",
  applicationName: "Legacy in Motion",
  keywords: [
    "Financial Planner Los Angeles", 
    "Estate Planning SGV", 
    "Living Benefits Life Insurance", 
    "401k Rollovers",
    "Generational Wealth California"
  ],
  openGraph: {
    title: "Legacy in Motion | Wealth & Estate Planning",
    description: "Establish your financial fortress. Expert retirement, living benefits, and estate planning in Southern California.",
    url: "https://www.legacyinmotion.org",
    siteName: "Legacy in Motion",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Legacy in Motion - Financial Planning",
      },
    ],
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
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Universal Brand Icons with Cache Busting (?v=3) */}
        <link rel="icon" href="/favicon.ico?v=3" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png?v=3" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png?v=3" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png?v=3" />
        <link rel="manifest" href="/site.webmanifest?v=3" />
      </head>
      <body>
        <Navbar />
        <main>{children}</main>
        <TrustedPartners />
        <Footer />
      </body>
    </html>
  );
}