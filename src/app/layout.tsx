import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TrustedPartners from "@/components/TrustedPartners";

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
    description: "Establish your financial fortress in as little as 90 days.",
    images: ["/og-image.jpg"],
  },
  appleWebApp: {
    capable: true,
    title: "Legacy",
    statusBarStyle: "default",
  },
};

export const viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
        
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
        
        {/* Fallback for older browsers */}
        <link rel="shortcut icon" href="/light/favicon.ico" />
      </head>
      <body>
        <Navbar />
        
        {/* 'children' is where your page content (and Cinematic Intro) will automatically go */}
        <main>{children}</main>
        
        {/* --- GLOBAL COMPONENTS --- */}
        <TrustedPartners />
        <Footer />
        
      </body>
    </html>
  );
}