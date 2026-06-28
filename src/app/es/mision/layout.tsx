import { getMarketingMetadata } from "@/lib/site-metadata";

export const metadata = getMarketingMetadata("mision");

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
