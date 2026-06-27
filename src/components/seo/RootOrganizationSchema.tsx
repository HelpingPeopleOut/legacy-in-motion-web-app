import StructuredData from "@/components/seo/StructuredData";
import { buildOrganizationSchema } from "@/lib/schema";

/** Site-wide Organization + LocalBusiness JSON-LD for root layout. */
export default function RootOrganizationSchema() {
  return <StructuredData id="schema-organization" data={buildOrganizationSchema()} />;
}
