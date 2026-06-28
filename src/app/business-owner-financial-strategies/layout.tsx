import { getMarketingMetadata } from "@/lib/site-metadata";

export const metadata = getMarketingMetadata("business-owner-financial-strategies");

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
