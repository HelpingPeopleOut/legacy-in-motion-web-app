import { getMarketingMetadata } from "@/lib/site-metadata";

export const metadata = getMarketingMetadata("thanks");

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
