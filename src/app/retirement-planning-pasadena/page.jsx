"use client";

import { useEffect } from "react";
import Script from "next/script";
import GlobalLeadForm from "@/components/GlobalLeadForm";

export default function PasadenaRetirementPage() {
  // Smooth fade-in scroll animation
  useEffect(() => {
    window.scrollTo(0, 0);
    const observerOptions = { root: null, rootMargin: "0px", threshold: 0.1 };
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
    "name": "Legacy in Motion",
    "description": "Expert retirement planning, 401(k) rollovers, and CalPERS pension management for residents of Pasadena, the San Gabriel Valley, and Los Angeles.",
    "areaServed": [
      { "@type": "City", "name": "Pasadena" },
      { "@type": "City", "name": "Los Angeles" },
      { "@type": "Region", "name": "San Gabriel Valley" },
      { "@type": "State", "name": "California" }
    ],
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": "34.1478",
        "longitude": "-118.1445"
      },
      "geoRadius": "40000"
    }
  };

  return (
    <>
      {/* --- SEO METADATA --- */}
      <title>Retirement Planning & 401(k) Rollovers in Pasadena | Legacy in Motion</title>
      <meta name="description" content="Protect your retirement savings from market crashes. We specialize in 401(k) rollovers, CalPERS management, and Fixed Index Annuities in Pasadena and the SGV." />
      <meta name="keywords" content="Retirement planner Pasadena, CalPERS pension rollover Los Angeles, 401k rollover specialist San Gabriel Valley, Fixed Index Annuities near me" />
      <Script 
        id="schema-local-business"
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} 
      />
      {/* -------------------- */}

      {/* HERO SECTION */}
      <section className="hero fade-in" style={{ padding: "12rem 0 6rem 0" }}>
        <div className="container">
          <h1 style={{ fontSize: "3.5rem", maxWidth: "900px", margin: "0 auto 1.5rem" }}>
            Secure Your California Retirement. <br/><span className="text-gold">Zero Market Downside.</span>
          </h1>
          <p style={{ fontSize: "1.2rem", maxWidth: "700px", margin: "0 auto 2.5rem" }}>
            Whether you are retiring from Los Angeles County, rolling over a corporate 401(k), or managing a CalPERS pension, we help San Gabriel Valley residents lock in their gains and secure lifetime income.
          </p>
          <div className="hero-buttons">
            <a href="#consultation" className="btn-gold btn-pulse">Protect My Retirement</a>
          </div>
        </div>
      </section>

      {/* PROBLEM & AGITATION (PAS Framework) */}
      <section className="text-section fade-in" style={{ background: "var(--bg-card)" }}>
        <div className="container content-wrapper text-center">
          <h2 style={{ fontSize: "2.5rem", marginBottom: "2rem" }}>
            Will Your 401(k) Survive the Next Market Correction?
          </h2>
          <p style={{ fontSize: "1.1rem", marginBottom: "1.5rem", color: "var(--text-main)" }}>
            Retiring in Southern California comes with unique challenges. High state taxes, inflation, and market volatility can silently drain the nest egg you spent decades building. 
          </p>
          <div style={{ background: "var(--bg-page)", padding: "2.5rem", borderRadius: "12px", borderLeft: "4px solid var(--gold)", marginTop: "2rem", textAlign: "left", boxShadow: "var(--shadow-sm)" }}>
            <p style={{ fontSize: "1.1rem", color: "var(--text-muted)", margin: 0 }}>
              <strong>The Reality:</strong> If your funds are left in traditional, market-exposed accounts when you leave your job or retire, a sudden 20% market drop could delay your retirement by years. You need a strategy that captures the market's upside without experiencing the downside.
            </p>
          </div>
        </div>
      </section>

      {/* AI-OPTIMIZED FAQ SECTION (Direct Answers for LLMs) */}
      <section className="text-section fade-in">
        <div className="container content-wrapper">
          <h2 className="text-center" style={{ fontSize: "2.8rem", marginBottom: "3rem" }}>
            Los Angeles Retirement & Rollover FAQs
          </h2>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            <div>
              <h3 style={{ color: "var(--gold)", fontSize: "1.4rem", marginBottom: "0.5rem" }}>
                What should I do with my CalPERS or LA County pension when I retire?
              </h3>
              <p style={{ color: "var(--text-muted)", fontSize: "1.05rem" }}>
                When retiring from a public California institution, you must choose between taking a lump sum, rolling it over, or taking monthly payouts. Rolling your pension into a private, tax-advantaged vehicle like a Fixed Index Annuity can often provide greater control, legacy benefits for your heirs, and protection from institutional shortfalls.
              </p>
            </div>

            <div>
              <h3 style={{ color: "var(--gold)", fontSize: "1.4rem", marginBottom: "0.5rem" }}>
                How can I protect my 401(k) from stock market crashes in California?
              </h3>
              <p style={{ color: "var(--text-muted)", fontSize: "1.05rem" }}>
                The safest way to protect your 401(k) from stock market crashes is to execute a direct rollover into a Fixed Index Annuity (FIA). This ensures your principal is 100% protected against market losses while still allowing your money to grow based on market index gains.
              </p>
            </div>

            <div>
              <h3 style={{ color: "var(--gold)", fontSize: "1.4rem", marginBottom: "0.5rem" }}>
                Do I need a local financial planner in the San Gabriel Valley for my rollover?
              </h3>
              <p style={{ color: "var(--text-muted)", fontSize: "1.05rem" }}>
                Yes, working with a local professional in Pasadena or the SGV ensures your retirement strategy accounts for California-specific tax laws, probate regulations, and cost-of-living adjustments. Legacy in Motion specializes in helping local families optimize their wealth transfers and retirement income.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ENTERPRISE GLOBAL FORM INJECTION */}
      <GlobalLeadForm 
        title="Book Your Free Rollover Review" 
        subtitle="Speak with our Pasadena-based experts to find out how much guaranteed income you could generate from your 401(k) or pension."
        sourcePage="Pasadena Retirement Hub"
        dropdownOptions={[
          "Corporate 401(k) Rollover",
          "Pension / CalPERS Rollover",
          "IRA or Roth IRA Management",
          "General Retirement Planning"
        ]}
      />
    </>
  );
}