import { getMarketingMetadata } from "@/lib/site-metadata";

export const metadata = getMarketingMetadata("financial-education");

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
