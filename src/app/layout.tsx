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
  // --- ENTERPRISE ICON & MANIFEST ROUTING ---
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" }
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }
    ]
  },
  // --- MANDATORY PWA FLAGS FOR iOS/ANDROID ---
  appleWebApp: {
    capable: true,
    title: "Legacy in Motion",
    statusBarStyle: "black-translucent",
  },
  formatDetection: {
    telephone: false,
  },
  // --- ENTERPRISE OPEN GRAPH (SOCIAL SHARING) ---
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
  // --- TWITTER / X CARDS ---
  twitter: {
    card: "summary_large_image",
    title: "Legacy in Motion | Wealth & Estate Planning",
    description: "Establish your financial fortress in Southern California.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      {/* Note: The manual <head> was removed. Next.js natively injects everything from the metadata object above for perfect SEO. */}
      <body>
        <Navbar />
        <main>{children}</main>
        <TrustedPartners />
        <Footer />
      </body>
    </html>
  );
}