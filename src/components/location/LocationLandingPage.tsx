"use client";

import { useEffect } from "react";
import Link from "next/link";
import GlobalLeadForm from "@/components/GlobalLeadForm";
import EnterpriseFaqSection from "@/components/seo/EnterpriseFaqSection";
import EnterpriseTrustSignals from "@/components/seo/EnterpriseTrustSignals";
import { BUSINESS } from "@/lib/business";
import type { FaqItem } from "@/lib/ai-enterprise";
import type { LocationEntry, SiteLocale } from "@/lib/locations";
import { getLocationUi, localizeLocation } from "@/lib/locations-i18n";

type LocationLandingPageProps = {
  location: LocationEntry;
  faqs: FaqItem[];
  locale?: SiteLocale;
};

export default function LocationLandingPage({ location, faqs, locale = "en" }: LocationLandingPageProps) {
  const localized = localizeLocation(location, locale);
  const ui = getLocationUi(locale);
  const isSpanish = locale === "es";

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
      { root: null, rootMargin: "0px", threshold: 0.1 }
    );

    document.querySelectorAll(".fade-in").forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [location.city, location.state, locale]);

  const isLocalHq = location.state === "california" && location.priority <= 2;
  const sourcePage = isSpanish
    ? `Ubicación: ${location.name}, ${location.stateAbbr}`
    : `Location: ${location.name}, ${location.stateAbbr}`;

  return (
    <>
      <section className="hero fade-in location-hero">
        <div className="container">
          <p className="location-eyebrow">
            {isLocalHq ? ui.eyebrowLocal : ui.eyebrowNational}
          </p>
          <h1 style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)", maxWidth: "900px", margin: "0 auto 1.5rem", lineHeight: 1.1 }}>
            {localized.headline}
          </h1>
          <p style={{ fontSize: "1.15rem", maxWidth: "720px", margin: "0 auto 2rem", color: "var(--text-muted)" }}>
            {localized.subheadline}
          </p>
          <div className="hero-buttons">
            <a href="#consultation" className="btn-gold btn-pulse">
              {ui.bookSession}
            </a>
            <a href="tel:6262037652" className="btn-outline">
              {ui.call} {BUSINESS.phoneDisplay}
            </a>
          </div>
          <p className="location-lang-toggle">
            <Link href={ui.langToggleHref(location.state, location.city)}>{ui.langToggle} →</Link>
          </p>
          {localized.legacyPillarHref && (
            <p className="location-legacy-link">
              {ui.legacyLink}{" "}
              <Link href={localized.legacyPillarHref}>{ui.legacyLinkSuffix}</Link> {ui.legacyLinkFor} {location.name}.
            </p>
          )}
        </div>
      </section>

      <section className="text-section fade-in" style={{ background: "var(--bg-card)" }}>
        <div className="container content-wrapper">
          <div className="location-trust-bar">
            <div>
              <strong>{ui.hq}</strong>
              <span>
                {BUSINESS.address.addressLocality}, {BUSINESS.address.addressRegion}
              </span>
            </div>
            <div>
              <strong>{ui.serving}</strong>
              <span>
                {location.name}, {location.stateAbbr} &amp; {ui.nationwide}
              </span>
            </div>
            <div>
              <strong>{ui.languages}</strong>
              <span>{ui.languagesValue}</span>
            </div>
          </div>
        </div>
      </section>

      <EnterpriseTrustSignals cityName={location.name} locale={locale} />

      <section className="text-section fade-in">
        <div className="container content-wrapper">
          <h2 style={{ fontSize: "2.4rem", marginBottom: "1.5rem", textAlign: "center" }}>
            {ui.challengesTitle(location.name)}
          </h2>
          <ul className="location-challenge-list">
            {localized.localChallenges.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="comparison-section fade-in">
        <div className="container">
          <div className="text-center" style={{ marginBottom: "3rem" }}>
            <h2 style={{ fontSize: "2.4rem" }}>{ui.servicesTitle(location.name)}</h2>
            <p style={{ color: "var(--text-muted)", fontSize: "1.05rem", marginTop: "0.75rem" }}>
              {ui.servicesSub}
            </p>
          </div>
          <div className="comp-grid">
            {localized.services.map((service, index) => (
              <article key={service} className={`comp-card${index === 1 ? " gold-focus" : ""}`}>
                <h3 style={{ color: "var(--gold)", marginBottom: "0.75rem", fontSize: "1.35rem" }}>{service}</h3>
                <p style={{ color: "var(--text-muted)", lineHeight: 1.6, margin: 0 }}>
                  {ui.serviceBody(location.stateAbbr)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="text-section fade-in" style={{ background: "var(--bg-card)" }}>
        <div className="container">
          <h2 style={{ fontSize: "2.4rem", marginBottom: "2rem", textAlign: "center" }}>
            {ui.caseStudiesTitle(localized.region ?? location.name)}
          </h2>
          <div className="card-grid">
            {localized.caseStudies.map((study) => (
              <article key={study.title} className="card location-case-card">
                <h3 style={{ fontSize: "1.35rem", marginBottom: "0.75rem" }}>{study.title}</h3>
                <p style={{ color: "var(--text-muted)", marginBottom: "1rem" }}>{study.summary}</p>
                <p style={{ margin: 0, fontWeight: 600, color: "var(--text-main)" }}>
                  <span className="text-gold">{ui.outcome}</span> {study.outcome}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <EnterpriseFaqSection
        title={ui.faqTitle(location.name, location.stateAbbr)}
        faqs={faqs}
        id={`faq-${location.city}-${locale}`}
      />

      <GlobalLeadForm
        title={ui.formTitle(location.name)}
        subtitle={ui.formSubtitle(location.name, location.stateName)}
        sourcePage={sourcePage}
        dropdownOptions={localized.dropdownOptions}
        locationCity={location.name}
        locationState={location.stateAbbr}
      />
    </>
  );
}
