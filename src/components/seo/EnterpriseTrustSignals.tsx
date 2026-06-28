import Link from "next/link";
import { PRINCIPAL, SERVICE_CATALOG } from "@/lib/ai-enterprise";
import { BUSINESS, TRUST } from "@/lib/business";
import { buildSiteUrl } from "@/lib/seo-metadata";

import type { SiteLocale } from "@/lib/locations";

type EnterpriseTrustSignalsProps = {
  cityName?: string;
  locale?: SiteLocale;
};

/** Visible enterprise credibility strip — reinforces AI/schema signals for users. */
export default function EnterpriseTrustSignals({ cityName, locale = "en" }: EnterpriseTrustSignalsProps) {
  const isSpanish = locale === "es";
  return (
    <section className="enterprise-signals fade-in" aria-label={isSpanish ? "Credenciales profesionales" : "Professional credentials"}>
      <div className="container">
        <div className="enterprise-signals-grid">
          <div className="enterprise-signal-card">
            <p className="enterprise-signal-label">{isSpanish ? "Asesora Principal" : "Lead Advisor"}</p>
            <p className="enterprise-signal-value">{PRINCIPAL.name}</p>
            <p className="enterprise-signal-meta">
              {PRINCIPAL.jobTitle} · {PRINCIPAL.affiliation}
            </p>
            <p className="enterprise-signal-meta">{TRUST.educationHighlight}</p>
            <p className="enterprise-signal-meta">
              {TRUST.yearsExperience} {isSpanish ? "años de experiencia" : "years experience"} · {isSpanish ? "Bilingüe EN/ES" : "Bilingual EN/ES"}
            </p>
          </div>
          <div className="enterprise-signal-card">
            <p className="enterprise-signal-label">{isSpanish ? "Sede" : "Headquarters"}</p>
            <p className="enterprise-signal-value">
              {BUSINESS.address.addressLocality}, {BUSINESS.address.addressRegion}
            </p>
            <p className="enterprise-signal-meta">
              {isSpanish ? "Sirviendo" : "Serving"} {cityName ? `${cityName} & ` : ""}
              {isSpanish ? "clientes a nivel nacional (EE. UU.)" : "clients nationwide (US)"}
            </p>
          </div>
          <div className="enterprise-signal-card">
            <p className="enterprise-signal-label">{isSpanish ? "Planificación Integral" : "Full-Service Planning"}</p>
            <p className="enterprise-signal-value">
              {SERVICE_CATALOG.length}+ {isSpanish ? "Estrategias Clave" : "Core Strategies"}
            </p>
            <p className="enterprise-signal-meta">
              {isSpanish ? "Jubilación · Beneficios en Vida · Patrimonio · Legado" : "Retirement · Living Benefits · Estate · Legacy"}
            </p>
          </div>
          <div className="enterprise-signal-card enterprise-signal-card--cta">
            <p className="enterprise-signal-label">{isSpanish ? "Consulta Gratuita" : "Free Consultation"}</p>
            <Link
              href={isSpanish ? "/es/solicitar-llamada" : "/request-callback"}
              className="btn-gold"
              style={{ display: "inline-block", marginTop: "0.5rem" }}
            >
              {isSpanish ? "Solicitar Sesión" : "Request Strategy Session"}
            </Link>
            <a href={`tel:${BUSINESS.phone.replace(/\D/g, "")}`} className="enterprise-signal-phone">
              {BUSINESS.phoneDisplay}
            </a>
          </div>
        </div>
        <p className="enterprise-trust-footnote">
          {TRUST.serviceModel}{" "}
          <Link href={isSpanish ? "/es/educacion-financiera" : "/financial-education"}>
            {isSpanish ? "Centro de educación →" : "Education hub →"}
          </Link>
        </p>
      </div>
    </section>
  );
}

export function EnterpriseExpertiseList({ locale = "en" }: { locale?: SiteLocale }) {
  const isSpanish = locale === "es";
  const topicsEs = [
    "Planificación de jubilación y rollovers 401(k)",
    "Anualidades de índice fijo (FIAs) e ingreso garantizado",
    "Seguros de vida con beneficios en vida",
    "Planificación patrimonial, fideicomisos y sucesión",
    "Salida de negocio y seguro de personas clave",
    "Transferencia de riqueza generacional",
    "Eliminación de deudas y protección de hipoteca",
    "Estrategias CalPERS y pensiones del sector público",
    "Riqueza fiscalmente eficiente para hijos (IUL / Futuro Infantil)",
  ];

  return (
    <section className="text-section fade-in" style={{ background: "var(--bg-page)" }}>
      <div className="container">
        <h2 style={{ fontSize: "2rem", textAlign: "center", marginBottom: "1rem" }}>
          {isSpanish ? `Cómo ${PRINCIPAL.name} Ayuda a sus Clientes` : `What ${PRINCIPAL.name} Helps Clients With`}
        </h2>
        <p style={{ textAlign: "center", color: "var(--text-muted)", maxWidth: "640px", margin: "0 auto 2rem" }}>
          {isSpanish
            ? "Fortalezas financieras basadas en seguros — experiencia local en Pasadena con servicio virtual nacional."
            : "Insurance-based financial fortresses for families and business owners — local Pasadena expertise with nationwide virtual service."}
        </p>
        <ul className="enterprise-expertise-list">
          {(isSpanish ? topicsEs : PRINCIPAL.expertiseTopics).map((topic) => (
            <li key={topic}>{topic}</li>
          ))}
        </ul>
        <div className="enterprise-service-links">
          {SERVICE_CATALOG.slice(0, 6).map((service) => (
            <Link key={service.id} href={service.pageUrl}>
              {service.name} →
            </Link>
          ))}
          <Link href={isSpanish ? "/es/locations" : "/locations"} className="highlight">
            {isSpanish ? "Todas las ubicaciones →" : "All location pages →"}
          </Link>
        </div>
      </div>
    </section>
  );
}
