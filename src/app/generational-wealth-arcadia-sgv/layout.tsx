import { getMarketingMetadata } from "@/lib/site-metadata";

export const metadata = getMarketingMetadata("generational-wealth-arcadia-sgv");

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
