"use client";

import { useEffect } from "react";
import Link from "next/link";
import Script from "next/script";
import GlobalLeadForm from "@/components/GlobalLeadForm";
import EnterpriseTrustSignals, { EnterpriseExpertiseList } from "@/components/seo/EnterpriseTrustSignals";
import EnterpriseFaqSection from "@/components/seo/EnterpriseFaqSection";
import {
  EDUCATION_HUB_FAQS_EN,
  FINANCIAL_EDUCATION_TOPICS_EN,
} from "@/lib/financial-education-content";
import { BUSINESS, TRUST } from "@/lib/business";
import { buildSiteUrl } from "@/lib/seo-metadata";

export default function FinancialEducationPage() {
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
        name: "Financial Education Hub — Legacy in Motion",
        description:
          "Helpful guides on 401(k) rollovers, living benefits, debt payoff, emergency funds, estate basics, and children's wealth.",
        url: buildSiteUrl("/financial-education"),
        inLanguage: "en-US",
        isPartOf: { "@type": "WebSite", url: BUSINESS.url },
        publisher: { "@type": "Organization", name: BUSINESS.name, url: BUSINESS.url },
        about: FINANCIAL_EDUCATION_TOPICS_EN.map((t) => ({ "@type": "Thing", name: t.title })),
      },
      {
        "@type": "FAQPage",
        mainEntity: EDUCATION_HUB_FAQS_EN.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },
    ],
  };

  return (
    <>
      <Script id="schema-education-hub" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(hubSchema) }} />

      <section className="hero fade-in" style={{ padding: "11rem 0 5rem", background: "var(--bg-dark)" }}>
        <div className="container text-center">
          <span style={{ color: "var(--gold)", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase" }}>
            Helpful Content · Google E-E-A-T Aligned
          </span>
          <h1 style={{ fontSize: "3.2rem", maxWidth: "920px", margin: "1rem auto 1.25rem", color: "#fff" }}>
            Financial Education Hub — <span className="text-gold">Answers Before Products</span>
          </h1>
          <p style={{ fontSize: "1.15rem", maxWidth: "760px", margin: "0 auto 2rem", color: "#ccc" }}>
            Real questions from families and business owners in Pasadena, Los Angeles, and nationwide. Written by{" "}
            {TRUST.advisorName}, {TRUST.jobTitle} — {TRUST.serviceModel.toLowerCase()}.
          </p>
          <div className="hero-buttons" style={{ justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
            <a href="#topics" className="btn-gold btn-pulse">
              Browse Guides
            </a>
            <Link href="/request-callback" className="btn-outline">
              Free Strategy Session
            </Link>
            <Link href="/toolbox" className="btn-outline btn-ghost">
              Free Calculators
            </Link>
          </div>
        </div>
      </section>

      <EnterpriseTrustSignals locale="en" />

      <section id="topics" className="text-section fade-in" style={{ background: "var(--bg-page)" }}>
        <div className="container content-wrapper">
          <h2 style={{ fontSize: "2.4rem", textAlign: "center", marginBottom: "0.75rem" }}>Guides by Search Intent</h2>
          <p style={{ textAlign: "center", color: "var(--text-muted)", maxWidth: "680px", margin: "0 auto 3rem" }}>
            Each guide links to a deeper strategy page when you are ready — no pressure, no jargon without explanation.
          </p>
          <div className="education-hub-grid">
            {FINANCIAL_EDUCATION_TOPICS_EN.map((topic) => (
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
                  Deep-dive strategy page →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <EnterpriseExpertiseList locale="en" />

      <section className="text-section fade-in enterprise-compliance-strip">
        <div className="container content-wrapper">
          <p className="enterprise-compliance-text">{TRUST.complianceNote}</p>
          <p className="enterprise-compliance-meta">
            {TRUST.advisorName} · {TRUST.educationHighlight} · {TRUST.yearsExperience} years serving families ·{" "}
            <a href={TRUST.disclosuresUrl} rel="noopener noreferrer" target="_blank">
              Partner disclosures
            </a>
          </p>
        </div>
      </section>

      <EnterpriseFaqSection title="About This Education Hub" faqs={EDUCATION_HUB_FAQS_EN} id="education-hub-faq" />

      <section id="consultation" className="fade-in" style={{ background: "var(--bg-dark)", padding: "7rem 0" }}>
        <GlobalLeadForm
          title="Want Personalized Guidance?"
          subtitle="Tell us your situation. We will call back within one business day — education first, always."
          sourcePage="Financial Education Hub"
          dropdownOptions={[
            "401(k) Rollover Questions",
            "Living Benefits / Life Insurance",
            "Debt & Cash Flow Planning",
            "Estate & Beneficiary Review",
            "CalPERS / Public Employee Retirement",
            "Children's Wealth (Freedom Financial Baby)",
          ]}
        />
      </section>
    </>
  );
}
