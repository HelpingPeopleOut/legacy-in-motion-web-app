import { getMarketingMetadata } from "@/lib/site-metadata";

export const metadata = getMarketingMetadata("debt-free-wealth-strategy");

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
