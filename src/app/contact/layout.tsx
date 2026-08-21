import { getMarketingMetadata } from "@/lib/site-metadata";

export const metadata = getMarketingMetadata("request-callback");

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
