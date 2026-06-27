import Link from "next/link";
import StructuredData from "@/components/seo/StructuredData";
import EnterpriseFaqSection from "@/components/seo/EnterpriseFaqSection";
import { EnterpriseExpertiseList } from "@/components/seo/EnterpriseTrustSignals";
import { GLOBAL_FAQS } from "@/lib/ai-enterprise";
import { BUSINESS } from "@/lib/business";
import { getLocationsByState, getPriorityLocations, getLocationPath } from "@/lib/locations";
import { buildOrganizationSchema } from "@/lib/schema";
import { buildLocationsIndexMetadata, buildSiteUrl } from "@/lib/seo-metadata";

export const dynamic = "force-static";

export const metadata = buildLocationsIndexMetadata();

export default function LocationsIndexPage() {
  const priority = getPriorityLocations().filter((l) => l.priority <= 2);
  const byState = getLocationsByState();

  const indexSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Legacy in Motion Service Locations",
    description: `Financial planning locations served by ${BUSINESS.name} — headquartered in Pasadena, CA with nationwide US service.`,
    url: buildSiteUrl("/locations"),
    isPartOf: { "@type": "WebSite", url: BUSINESS.url, name: BUSINESS.name },
  };

  return (
    <>
      <StructuredData id="schema-locations-index" data={buildOrganizationSchema()} />
      <StructuredData id="schema-locations-collection" data={indexSchema} />

      <section className="hero fade-in visible" style={{ padding: "12rem 0 5rem" }}>
        <div className="container text-center">
          <h1 style={{ fontSize: "clamp(2.2rem, 5vw, 3.5rem)", marginBottom: "1rem" }}>
            Financial Planning Locations
          </h1>
          <p style={{ fontSize: "1.15rem", maxWidth: "720px", margin: "0 auto", color: "var(--text-muted)" }}>
            Headquartered in Pasadena, California — serving local LA-area families and clients nationwide across the United States.
          </p>
          <p style={{ marginTop: "1rem" }}>
            <Link href="/es/locations" className="btn-outline" style={{ display: "inline-block" }}>
              Versión en español →
            </Link>
          </p>
        </div>
      </section>

      <section className="text-section" style={{ background: "var(--bg-card)" }}>
        <div className="container">
          <h2 style={{ fontSize: "2rem", marginBottom: "1.5rem", textAlign: "center" }}>Priority Markets</h2>
          <div className="card-grid">
            {priority.map((loc) => (
              <article key={`${loc.state}-${loc.city}`} className="card">
                <h3 style={{ marginBottom: "0.5rem" }}>
                  {loc.name}, {loc.stateAbbr}
                </h3>
                <p style={{ color: "var(--text-muted)", marginBottom: "1rem" }}>{loc.region}</p>
                <Link href={getLocationPath(loc)} className="btn-outline" style={{ display: "inline-block" }}>
                  View {loc.name} Hub →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="text-section">
        <div className="container">
          <h2 style={{ fontSize: "2rem", marginBottom: "2rem", textAlign: "center" }}>All Service Areas</h2>
          {[...byState.entries()].map(([stateSlug, cities]) => (
            <div key={stateSlug} style={{ marginBottom: "2.5rem" }}>
              <h3 style={{ color: "var(--gold)", marginBottom: "1rem", textTransform: "capitalize" }}>
                {cities[0]?.stateName ?? stateSlug.replace(/-/g, " ")}
              </h3>
              <ul className="location-index-list">
                {cities.map((loc) => (
                  <li key={loc.city}>
                    <Link href={getLocationPath(loc)}>
                      {loc.name}, {loc.stateAbbr}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <p className="text-center" style={{ marginTop: "2rem" }}>
            <Link href="/service-areas" className="btn-gold" style={{ display: "inline-block", padding: "0.85rem 1.5rem" }}>
              View Regional Service Areas Hub
            </Link>
          </p>
        </div>
      </section>

      <EnterpriseExpertiseList />

      <EnterpriseFaqSection title="Financial Planning FAQ" faqs={GLOBAL_FAQS} id="locations-faq" />
    </>
  );
}
