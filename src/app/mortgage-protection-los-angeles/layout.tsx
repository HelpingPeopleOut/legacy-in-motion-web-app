import { getMarketingMetadata } from "@/lib/site-metadata";
import StructuredData from "@/components/seo/StructuredData";
import { buildServicePageSchema } from "@/lib/service-schema";

export const metadata = getMarketingMetadata("mortgage-protection-los-angeles");

const schema = buildServicePageSchema({
  name: "Mortgage Protection — Los Angeles",
  description:
    "Protect your home and mortgage obligations with living benefits and income replacement strategies for LA and SGV homeowners.",
  path: "/mortgage-protection-los-angeles",
  areaServed: [
    { name: "Los Angeles", state: "California" },
    { name: "Pasadena", state: "California" },
    { type: "Country", name: "United States" },
  ],
  relatedPaths: [
    { name: "Living Benefits", path: "/living-benefits-life-insurance-los-angeles" },
    { name: "Free consultation", path: "/request-callback" },
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <StructuredData id="schema-mortgage-protection" data={schema} />
      {children}
    </>
  );
}
