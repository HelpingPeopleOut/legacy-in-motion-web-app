import { getMarketingMetadata } from "@/lib/site-metadata";

export const metadata = getMarketingMetadata("toolbox");

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
