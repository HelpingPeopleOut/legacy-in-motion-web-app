import { getMarketingMetadata } from "@/lib/site-metadata";

export const metadata = getMarketingMetadata("futuro-financiero-infantil");

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
