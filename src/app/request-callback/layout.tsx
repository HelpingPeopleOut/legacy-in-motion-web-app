import { getMarketingMetadata } from "@/lib/site-metadata";
import StructuredData from "@/components/seo/StructuredData";
import { buildServicePageSchema } from "@/lib/service-schema";

export const metadata = getMarketingMetadata("request-callback");

const schema = buildServicePageSchema({
  name: "Free Financial Strategy Consultation",
  description:
    "Schedule a free, no-obligation strategy session with Nelly Lara — retirement, insurance, estate, debt, or business planning. Bilingual English & Spanish.",
  path: "/request-callback",
  relatedPaths: [
    { name: "Locations", path: "/locations" },
    { name: "Mission", path: "/mission" },
    { name: "Home", path: "/" },
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <StructuredData id="schema-request-callback" data={schema} />
      {children}
    </>
  );
}
