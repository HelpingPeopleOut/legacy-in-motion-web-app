import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TrustedPartners from "@/components/TrustedPartners";

// --- ENTERPRISE PWA VIEWPORT LOCK ---
// This prevents iPhones from zooming in on input fields and gives the app a native feel
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
  // --- ENTERPRISE OPEN GRAPH (SOCIAL SHARING) ---
  openGraph: {
    title: "Legacy in Motion | Wealth & Estate Planning",
    description: "Establish your financial fortress. Expert retirement, living benefits, and estate planning in Southern California.",
    url: "https://www.legacyinmotion.org",
    siteName: "Legacy in Motion",
    images: [
      {
        url: "/og-image.jpg", // You can add a premium 1200x630 image to your public folder later!
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
      <head>
        {/* Light Mode Favicons & Manifest */}
        <link rel="icon" type="image/png" sizes="32x32" href="/light/favicon-32x32.png" media="(prefers-color-scheme: light)" />
        <link rel="icon" type="image/png" sizes="16x16" href="/light/favicon-16x16.png" media="(prefers-color-scheme: light)" />
        <link rel="apple-touch-icon" sizes="180x180" href="/light/apple-touch-icon.png" media="(prefers-color-scheme: light)" />
        <link rel="manifest" href="/light/site.webmanifest" media="(prefers-color-scheme: light)" />
        
        {/* Dark Mode Favicons & Manifest */}
        <link rel="icon" type="image/png" sizes="32x32" href="/dark/favicon-32x32.png" media="(prefers-color-scheme: dark)" />
        <link rel="icon" type="image/png" sizes="16x16" href="/dark/favicon-16x16.png" media="(prefers-color-scheme: dark)" />
        <link rel="apple-touch-icon" sizes="180x180" href="/dark/apple-touch-icon.png" media="(prefers-color-scheme: dark)" />
        <link rel="manifest" href="/dark/site.webmanifest" media="(prefers-color-scheme: dark)" />
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