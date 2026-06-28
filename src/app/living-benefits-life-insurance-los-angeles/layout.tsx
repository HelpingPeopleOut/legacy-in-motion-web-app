import { getMarketingMetadata } from "@/lib/site-metadata";

export const metadata = getMarketingMetadata("living-benefits-life-insurance-los-angeles");

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
