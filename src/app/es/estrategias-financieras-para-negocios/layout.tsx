import { getMarketingMetadata } from "@/lib/site-metadata";

export const metadata = getMarketingMetadata("estrategias-financieras-para-negocios");

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
