import { getMarketingMetadata } from "@/lib/site-metadata";

export const metadata = getMarketingMetadata("mortgage-protection-los-angeles");

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
