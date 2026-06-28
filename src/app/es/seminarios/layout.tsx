import { getMarketingMetadata } from "@/lib/site-metadata";

export const metadata = getMarketingMetadata("seminarios");

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
