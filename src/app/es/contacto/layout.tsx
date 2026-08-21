import { getMarketingMetadata } from "@/lib/site-metadata";

export const metadata = getMarketingMetadata("solicitar-llamada");

export default function ContactoLayout({ children }: { children: React.ReactNode }) {
  return children;
}
