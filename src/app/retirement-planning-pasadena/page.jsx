"use client";

import { useEffect } from "react";
import Script from "next/script";
import GlobalLeadForm from "@/components/GlobalLeadForm";

export default function PasadenaRetirementPillar() {
  // Smooth fade-in scroll animation
  useEffect(() => {
    window.scrollTo(0, 0);

    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll(".fade-in").forEach((section) => {
      observer.observe(section);
    });
  }, []);

  // --- INVISIBLE LOCAL SEO SCHEMA (For Google & AI Overviews) ---
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    "name": "Legacy in Motion (Retirement Services)",
    "description": "Expert retirement planning for Pasadena and SGV residents. Learn how to protect your CalPERS pension, rollover your 401(k), and build tax-free wealth.",
    "areaServed": [
      { "@type": "City", "name": "Pasadena" },
      { "@type": "City", "name": "Arcadia" },
      { "@type": "City", "name": "San Marino" },
      { "@type": "Region", "name": "San Gabriel Valley" }
    ],
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": "34.1478",
        "longitude": "-118.1445"
      },
      "geoRadius": "25000"
    }
  };

  return (
    <>
      {/* --- SEO METADATA --- */}
      <title>Retirement Planning in Pasadena & San Gabriel Valley | Legacy in Motion</title>
      <meta name="description" content="Expert retirement planning for Pasadena and SGV residents. Learn how to protect your CalPERS pension, rollover your 401(k), and build tax-free wealth." />
      <meta name="keywords" content="Retirement planning Pasadena, CalPERS pension protection, 401(k) rollover San Gabriel Valley, Fixed Index Annuities California, Financial advisor Pasadena" />
      <Script 
        id="schema-pasadena-retirement"
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} 
      />
      {/* -------------------- */}

      {/* HERO SECTION */}
      <section className="hero fade-in" style={{ padding: "14rem 0 8rem 0" }}>
        <div className="container">
          <h1 style={{ fontSize: "3.8rem", maxWidth: "900px", margin: "0 auto 1.5rem", lineHeight: "1.1" }}>
            Secure Your Retirement in <br />
            <span className="text-gold">Pasadena & the SGV</span>
          </h1>
          <p style={{ fontSize: "1.2rem", maxWidth: "700px", margin: "0 auto 2.5rem" }}>
            You’ve worked hard for decades in California. Now, make sure your wealth is protected from market crashes, high taxes, and probate.
          </p>
          <div className="hero-buttons">
            <a href="#strategy" className="btn-gold btn-pulse">See Our Strategy</a>
            <a href="#consultation" className="btn-outline">Book a Free Consultation</a>
          </div>
        </div>
      </section>

      {/* PROBLEM & AGITATION (PAS Framework) */}
      <section className="text-section fade-in" style={{ background: "var(--bg-card)" }}>
        <div className="container content-wrapper text-center">
          <h2 style={{ fontSize: "2.8rem", marginBottom: "2rem" }}>
            Will Your Pension or 401(k) Be Enough?
          </h2>
          <p style={{ fontSize: "1.1rem", marginBottom: "1.5rem", color: "var(--text-main)" }}>
            Retiring in the Pasadena area comes with unique challenges. Whether you are a city employee relying on a CalPERS pension, or a private sector worker with a 401(k), the landscape is shifting. 
          </p>
          <div style={{ background: "var(--bg-page)", padding: "2.5rem", borderRadius: "12px", borderLeft: "4px solid var(--gold)", marginTop: "2rem", textAlign: "left", boxShadow: "var(--shadow-sm)" }}>
            <p style={{ fontSize: "1.1rem", color: "var(--text-muted)", margin: 0 }}>
              <strong>The Hidden Danger:</strong> Market volatility can wipe out years of 401(k) growth just as you are getting ready to retire. Meanwhile, high California taxes and inflation are silently eating away at your purchasing power. If your money is tied up entirely in the market, your retirement is at risk.
            </p>
          </div>
        </div>
      </section>

      {/* SOLUTION SECTION */}
      <section id="strategy" className="comparison-section fade-in">
        <div className="container">
          <div className="text-center" style={{ marginBottom: '4rem' }}>
            <h2 style={{ fontSize: "2.8rem" }}>The Legacy in Motion Solution</h2>
            <p style={{ color: "var(--text-muted)", fontSize: "1.1rem", marginTop: "1rem" }}>
              We help SGV families lock in their gains and secure guaranteed income.
            </p>
          </div>
          
          <div className="comp-grid">
            <div className="comp-card">
              <h3 style={{ color: 'var(--gold)', marginBottom: '1rem', fontSize: "1.6rem" }}>401(k) / IRA Rollovers</h3>
              <p style={{ fontSize: "1.05rem", color: "var(--text-muted)", lineHeight: "1.6" }}>
                Leaving an old employer? Don't leave your 401(k) behind. We help you seamlessly roll over your funds into safe, tax-advantaged vehicles that protect your principal from market losses.
              </p>
            </div>
            <div className="comp-card gold-focus">
              <h3 style={{ marginBottom: '1rem', color: "var(--gold)", fontSize: "1.6rem" }}>Fixed Index Annuities (FIAs)</h3>
              <p style={{ fontSize: "1.05rem", color: "var(--text-main)", lineHeight: "1.6" }}>
                Participate in the market's upside without experiencing the downside. FIAs offer a powerful way to secure a lifetime stream of income that you cannot outlive, giving you true peace of mind.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- ENTERPRISE GLOBAL FORM INJECTION --- */}
      <GlobalLeadForm 
        title="Speak with a Local SGV Expert" 
        subtitle="We are proud to serve families right here in Pasadena and the San Gabriel Valley. Schedule your complimentary retirement strategy session today."
        sourcePage="Pasadena Retirement Hub"
        dropdownOptions={[
          "401(k) or Pension Rollover",
          "Fixed Index Annuities (FIAs)",
          "General Retirement Planning",
          "Protecting wealth from market crashes"
        ]}
      />
    </>
  );
}