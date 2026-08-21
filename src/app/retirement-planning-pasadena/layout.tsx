import { getMarketingMetadata } from "@/lib/site-metadata";
import StructuredData from "@/components/seo/StructuredData";
import { buildServicePageSchema } from "@/lib/service-schema";

export const metadata = getMarketingMetadata("retirement-planning-pasadena");

const schema = buildServicePageSchema({
  name: "Retirement Planning & 401(k) Rollovers — Pasadena & SGV",
  description:
    "Protect pensions and roll over 401(k)s into tax-advantaged, principal-protected strategies including Fixed Index Annuities for Pasadena and San Gabriel Valley families.",
  path: "/retirement-planning-pasadena",
  areaServed: [
    { name: "Pasadena", state: "California" },
    { name: "Arcadia", state: "California" },
    { name: "San Marino", state: "California" },
    { type: "AdministrativeArea", name: "San Gabriel Valley" },
    { type: "Country", name: "United States" },
  ],
  relatedPaths: [
    { name: "Living Benefits Life Insurance", path: "/living-benefits-life-insurance-los-angeles" },
    { name: "Pasadena location", path: "/locations/california/pasadena" },
    { name: "Free consultation", path: "/request-callback" },
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <StructuredData id="schema-retirement-pasadena" data={schema} />
      {children}
    </>
  );
}
