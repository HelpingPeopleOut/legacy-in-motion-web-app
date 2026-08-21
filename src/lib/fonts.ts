import { Inter, Playfair_Display } from "next/font/google";

export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  /** Do not preload — competes with LCP image on Slow 4G */
  preload: false,
  adjustFontFallback: true,
});

/** Display font — optional so it never delays LCP text paint. */
export const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "optional",
  variable: "--font-playfair",
  preload: false,
  adjustFontFallback: true,
});
