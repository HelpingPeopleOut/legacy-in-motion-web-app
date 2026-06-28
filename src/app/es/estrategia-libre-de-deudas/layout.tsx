import { getMarketingMetadata } from "@/lib/site-metadata";

export const metadata = getMarketingMetadata("estrategia-libre-de-deudas");

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
