import { getMarketingMetadata } from "@/lib/site-metadata";

export const metadata = getMarketingMetadata("beneficios-en-vida-los-angeles");

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
