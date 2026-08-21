import { getMarketingMetadata } from "@/lib/site-metadata";
import StructuredData from "@/components/seo/StructuredData";
import { buildServicePageSchema } from "@/lib/service-schema";

export const metadata = getMarketingMetadata("living-benefits-life-insurance-los-angeles");

const schema = buildServicePageSchema({
  name: "Living Benefits Life Insurance — Los Angeles",
  description:
    "Life insurance that can pay while you are alive for critical, chronic, or terminal illness — term and permanent options for LA families and homeowners.",
  path: "/living-benefits-life-insurance-los-angeles",
  areaServed: [
    { name: "Los Angeles", state: "California" },
    { name: "Pasadena", state: "California" },
    { type: "Country", name: "United States" },
  ],
  relatedPaths: [
    { name: "Mortgage Protection", path: "/mortgage-protection-los-angeles" },
    { name: "Los Angeles location", path: "/locations/california/los-angeles" },
    { name: "Free consultation", path: "/request-callback" },
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <StructuredData id="schema-living-benefits" data={schema} />
      {children}
    </>
  );
}
