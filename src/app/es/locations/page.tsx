import Link from "next/link";
import StructuredData from "@/components/seo/StructuredData";
import EnterpriseFaqSection from "@/components/seo/EnterpriseFaqSection";
import { EnterpriseExpertiseList } from "@/components/seo/EnterpriseTrustSignals";
import { GLOBAL_FAQS_ES } from "@/lib/ai-enterprise";
import { BUSINESS } from "@/lib/business";
import { getLocationsByState, getPriorityLocations, getLocationPath } from "@/lib/locations";
import { buildOrganizationSchema } from "@/lib/schema";
import { buildLocationsIndexMetadata, buildSiteUrl } from "@/lib/seo-metadata";

export const dynamic = "force-static";

export const metadata = buildLocationsIndexMetadata("es");

export default function SpanishLocationsIndexPage() {
  const priority = getPriorityLocations().filter((l) => l.priority <= 2);
  const byState = getLocationsByState();

  const indexSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Ubicaciones de Servicio — Legacy in Motion",
    description: `Páginas de planificación financiera por ciudad — ${BUSINESS.name}, sede Pasadena, CA, servicio nacional.`,
    url: buildSiteUrl("/es/locations"),
    inLanguage: "es-US",
    isPartOf: { "@type": "WebSite", url: buildSiteUrl("/es"), name: BUSINESS.name },
  };

  return (
    <>
      <StructuredData id="schema-locations-index-es" data={buildOrganizationSchema()} />
      <StructuredData id="schema-locations-collection-es" data={indexSchema} />

      <section className="hero fade-in visible" style={{ padding: "12rem 0 5rem" }}>
        <div className="container text-center">
          <h1 style={{ fontSize: "clamp(2.2rem, 5vw, 3.5rem)", marginBottom: "1rem" }}>
            Ubicaciones de Planificación Financiera
          </h1>
          <p style={{ fontSize: "1.15rem", maxWidth: "720px", margin: "0 auto", color: "var(--text-muted)" }}>
            Con sede en Pasadena, California — servimos familias del área de Los Ángeles y clientes en todo Estados Unidos.
          </p>
          <p style={{ marginTop: "1rem" }}>
            <Link href="/locations" className="btn-outline" style={{ display: "inline-block" }}>
              English version →
            </Link>
          </p>
        </div>
      </section>

      <section className="text-section" style={{ background: "var(--bg-card)" }}>
        <div className="container">
          <h2 style={{ fontSize: "2rem", marginBottom: "1.5rem", textAlign: "center" }}>Mercados Prioritarios</h2>
          <div className="card-grid">
            {priority.map((loc) => (
              <article key={`${loc.state}-${loc.city}`} className="card">
                <h3 style={{ marginBottom: "0.5rem" }}>
                  {loc.name}, {loc.stateAbbr}
                </h3>
                <p style={{ color: "var(--text-muted)", marginBottom: "1rem" }}>{loc.region}</p>
                <Link href={getLocationPath(loc, "es")} className="btn-outline" style={{ display: "inline-block" }}>
                  Ver {loc.name} →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="text-section">
        <div className="container">
          <h2 style={{ fontSize: "2rem", marginBottom: "2rem", textAlign: "center" }}>Todas las Áreas</h2>
          {[...byState.entries()].map(([stateSlug, cities]) => (
            <div key={stateSlug} style={{ marginBottom: "2.5rem" }}>
              <h3 style={{ color: "var(--gold)", marginBottom: "1rem", textTransform: "capitalize" }}>
                {cities[0]?.stateName ?? stateSlug.replace(/-/g, " ")}
              </h3>
              <ul className="location-index-list">
                {cities.map((loc) => (
                  <li key={loc.city}>
                    <Link href={getLocationPath(loc, "es")}>
                      {loc.name}, {loc.stateAbbr}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <p className="text-center" style={{ marginTop: "2rem", display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/es/links" className="btn-gold" style={{ display: "inline-block", padding: "0.85rem 1.5rem" }}>
              Enlaces Rápidos de Nelly →
            </Link>
            <Link href="/service-areas" className="btn-outline" style={{ display: "inline-block", padding: "0.85rem 1.5rem" }}>
              Áreas de Servicio
            </Link>
          </p>
        </div>
      </section>

      <EnterpriseExpertiseList locale="es" />

      <EnterpriseFaqSection title="Preguntas Frecuentes" faqs={GLOBAL_FAQS_ES} id="locations-faq-es" />
    </>
  );
}
