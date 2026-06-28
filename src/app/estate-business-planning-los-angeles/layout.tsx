import { getMarketingMetadata } from "@/lib/site-metadata";

export const metadata = getMarketingMetadata("estate-business-planning-los-angeles");

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
