import { getMarketingMetadata } from "@/lib/site-metadata";

export const metadata = getMarketingMetadata("request-callback");

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
