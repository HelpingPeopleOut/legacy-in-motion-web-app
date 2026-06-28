"use client";

import { useEffect } from "react";
import Link from "next/link";
import Script from "next/script";
import GlobalLeadForm from "@/components/GlobalLeadForm";
import EnterpriseTrustSignals, { EnterpriseExpertiseList } from "@/components/seo/EnterpriseTrustSignals";
import EnterpriseFaqSection from "@/components/seo/EnterpriseFaqSection";
import {
  EDUCATION_HUB_FAQS_ES,
  FINANCIAL_EDUCATION_TOPICS_ES,
} from "@/lib/financial-education-content";
import { BUSINESS, TRUST } from "@/lib/business";
import { buildSiteUrl } from "@/lib/seo-metadata";

export default function EducacionFinancieraPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(".fade-in").forEach((sec) => observer.observe(sec));
  }, []);

  const hubSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: "Centro de Educación Financiera — Legacy in Motion",
        description: "Guías sobre rollovers 401(k), beneficios en vida, deudas, fondo de emergencia y patrimonio.",
        url: buildSiteUrl("/es/educacion-financiera"),
        inLanguage: "es-US",
        isPartOf: { "@type": "WebSite", url: BUSINESS.url },
        publisher: { "@type": "Organization", name: BUSINESS.name, url: BUSINESS.url },
      },
      {
        "@type": "FAQPage",
        mainEntity: EDUCATION_HUB_FAQS_ES.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },
    ],
  };

  return (
    <>
      <Script id="schema-education-hub-es" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(hubSchema) }} />

      <section className="hero fade-in" style={{ padding: "11rem 0 5rem", background: "var(--bg-dark)" }}>
        <div className="container text-center">
          <span style={{ color: "var(--gold)", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase" }}>
            Contenido Útil · E-E-A-T
          </span>
          <h1 style={{ fontSize: "3.2rem", maxWidth: "920px", margin: "1rem auto 1.25rem", color: "#fff" }}>
            Centro de Educación Financiera — <span className="text-gold">Respuestas Antes que Productos</span>
          </h1>
          <p style={{ fontSize: "1.15rem", maxWidth: "760px", margin: "0 auto 2rem", color: "#ccc" }}>
            Preguntas reales de familias y empresarios en Pasadena, Los Ángeles y a nivel nacional. Por {TRUST.advisorName},{" "}
            {TRUST.jobTitle} — planificación con educación primero.
          </p>
          <div className="hero-buttons" style={{ justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
            <a href="#topics" className="btn-gold btn-pulse">
              Ver Guías
            </a>
            <Link href="/es/solicitar-llamada" className="btn-outline">
              Consulta Gratuita
            </Link>
            <Link href="/es/herramientas" className="btn-outline btn-ghost">
              Calculadoras Gratis
            </Link>
          </div>
        </div>
      </section>

      <EnterpriseTrustSignals locale="es" />

      <section id="topics" className="text-section fade-in" style={{ background: "var(--bg-page)" }}>
        <div className="container content-wrapper">
          <h2 style={{ fontSize: "2.4rem", textAlign: "center", marginBottom: "0.75rem" }}>Guías por Intención de Búsqueda</h2>
          <p style={{ textAlign: "center", color: "var(--text-muted)", maxWidth: "680px", margin: "0 auto 3rem" }}>
            Cada guía enlaza a una página de estrategia cuando esté listo — sin presión.
          </p>
          <div className="education-hub-grid">
            {FINANCIAL_EDUCATION_TOPICS_ES.map((topic) => (
              <article key={topic.id} className="education-hub-card">
                <p className="education-hub-intent">{topic.intent}</p>
                <h3>{topic.title}</h3>
                <p className="education-hub-summary">{topic.summary}</p>
                <ul>
                  {topic.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
                <Link href={topic.href} className="education-hub-link">
                  Página de estrategia →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <EnterpriseExpertiseList locale="es" />

      <section className="text-section fade-in enterprise-compliance-strip">
        <div className="container content-wrapper">
          <p className="enterprise-compliance-text">{TRUST.complianceNote}</p>
          <p className="enterprise-compliance-meta">
            {TRUST.advisorName} · {TRUST.educationHighlight} · {TRUST.yearsExperience} años sirviendo familias ·{" "}
            <a href={TRUST.disclosuresUrl} rel="noopener noreferrer" target="_blank">
              Divulgaciones del socio
            </a>
          </p>
        </div>
      </section>

      <EnterpriseFaqSection title="Sobre Este Centro" faqs={EDUCATION_HUB_FAQS_ES} id="education-hub-faq-es" />

      <section id="consultation" className="fade-in" style={{ background: "var(--bg-dark)", padding: "7rem 0" }}>
        <GlobalLeadForm
          title="¿Quiere Orientación Personalizada?"
          subtitle="Cuéntenos su situación. Le llamaremos en un día hábil — educación primero."
          sourcePage="Centro Educación Financiera ES"
          dropdownOptions={[
            "Preguntas sobre Rollover 401(k)",
            "Beneficios en Vida / Seguro",
            "Deudas y Flujo de Efectivo",
            "Patrimonio y Beneficiarios",
            "CalPERS / Jubilación Pública",
            "Riqueza para Niños (Futuro Financiero Infantil)",
          ]}
        />
      </section>
    </>
  );
}
