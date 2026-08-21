import { getMarketingMetadata } from "@/lib/site-metadata";
import StructuredData from "@/components/seo/StructuredData";
import { buildServicePageSchema } from "@/lib/service-schema";

export const metadata = getMarketingMetadata("debt-free-wealth-strategy");

const schema = buildServicePageSchema({
  name: "Debt-Free Wealth Strategy",
  description:
    "Cash flow analysis and debt elimination strategies that lead into protected wealth-building — education-first planning with Legacy in Motion.",
  path: "/debt-free-wealth-strategy",
  relatedPaths: [
    { name: "Retirement Planning", path: "/retirement-planning-pasadena" },
    { name: "Financial Education", path: "/financial-education" },
    { name: "Free consultation", path: "/request-callback" },
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <StructuredData id="schema-debt-free" data={schema} />
      {children}
    </>
  );
}
