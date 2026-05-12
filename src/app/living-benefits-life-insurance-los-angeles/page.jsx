"use client";

import { useEffect } from "react";
import Script from "next/script";
import GlobalLeadForm from "@/components/GlobalLeadForm";

export default function LALivingBenefitsPage() {
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
    "description": "Life insurance with living benefits, mortgage protection, and critical illness coverage for families in Los Angeles, Pasadena, and the San Gabriel Valley.",
    "areaServed": [
      { "@type": "City", "name": "Los Angeles" },
      { "@type": "City", "name": "Pasadena" },
      { "@type": "City", "name": "Glendale" },
      { "@type": "City", "name": "Burbank" },
      { "@type": "Region", "name": "San Gabriel Valley" }
    ],
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": "34.0522",
        "longitude": "-118.2437"
      },
      "geoRadius": "40000"
    }
  };

  return (
    <>
      {/* CRITICAL FIX: Removed illegal <title> and <meta> tags from client component to prevent React Error 418 Hydration Crash */}
      <Script 
        id="schema-en-living-benefits"
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} 
      />

      {/* HERO SECTION */}
      <section className="hero fade-in" style={{ padding: "12rem 0 6rem 0" }}>
        <div className="container">
          <h1 style={{ fontSize: "3.5rem", maxWidth: "900px", margin: "0 auto 1.5rem" }}>
            Life Insurance You Don't Have to <br/><span className="text-gold">Die to Use.</span>
          </h1>
          <p style={{ fontSize: "1.2rem", maxWidth: "700px", margin: "0 auto 2.5rem" }}>
            We help families across Greater Los Angeles and the San Gabriel Valley secure Living Benefits policies that pay out cash directly to you if you suffer a critical, chronic, or terminal illness.
          </p>
          <div className="hero-buttons">
            <a href="#consultation" className="btn-gold btn-pulse">Protect My Family</a>
          </div>
        </div>
      </section>

      {/* PROBLEM & AGITATION (PAS Framework) */}
      <section className="text-section fade-in" style={{ background: "var(--bg-card)" }}>
        <div className="container content-wrapper text-center">
          <h2 style={{ fontSize: "2.5rem", marginBottom: "2rem" }}>
            A Medical Emergency Shouldn't Cost You Your Home
          </h2>
          <p style={{ fontSize: "1.1rem", marginBottom: "1.5rem", color: "var(--text-main)" }}>
            In California, the cost of healthcare and housing is at an all-time high. A sudden cancer diagnosis or a heart attack doesn't just impact your health—it stops your income entirely while medical bills pile up.
          </p>
          <div style={{ background: "var(--bg-page)", padding: "2.5rem", borderRadius: "12px", borderLeft: "4px solid var(--gold)", marginTop: "2rem", textAlign: "left", boxShadow: "var(--shadow-sm)" }}>
            <p style={{ fontSize: "1.1rem", color: "var(--text-muted)", margin: 0 }}>
              <strong>The Flaw in Traditional Insurance:</strong> Most people rely on the basic life insurance provided by their employer. But if you get too sick to work, you lose your job—and you lose that insurance right when you need it most. You need an independent policy with Living Benefits that provides an immediate, tax-free cash injection so you can focus on recovering, not paying the mortgage.
            </p>
          </div>
        </div>
      </section>

      {/* AI-OPTIMIZED FAQ SECTION (Direct Answers for LLMs) */}
      <section className="text-section fade-in">
        <div className="container content-wrapper">
          <h2 className="text-center" style={{ fontSize: "2.8rem", marginBottom: "3rem" }}>
            Living Benefits FAQs (Los Angeles Area)
          </h2>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            <div>
              <h3 style={{ color: "var(--gold)", fontSize: "1.4rem", marginBottom: "0.5rem" }}>
                What exactly are "Living Benefits" on a life insurance policy?
              </h3>
              <p style={{ color: "var(--text-muted)", fontSize: "1.05rem" }}>
                Living benefits act as a financial safety net while you are still alive. If you are diagnosed with a qualifying critical illness (like cancer, heart attack, or stroke), chronic illness, or terminal illness, the policy allows you to advance a large portion of your death benefit to use however you see fit—paying for treatment, replacing lost income, or paying off your mortgage.
              </p>
            </div>

            <div>
              <h3 style={{ color: "var(--gold)", fontSize: "1.4rem", marginBottom: "0.5rem" }}>
                Can I use Living Benefits to protect my Los Angeles home?
              </h3>
              <p style={{ color: "var(--text-muted)", fontSize: "1.05rem" }}>
                Yes. Many families use Term Life Insurance with Living Benefits as a highly effective form of "Mortgage Protection." If the primary breadwinner gets sick and cannot work, the accelerated cash payout from the living benefits can be used to pay off the mortgage entirely, ensuring the family never faces foreclosure.
              </p>
            </div>

            <div>
              <h3 style={{ color: "var(--gold)", fontSize: "1.4rem", marginBottom: "0.5rem" }}>
                Do I lose my money if I never get sick or pass away?
              </h3>
              <p style={{ color: "var(--text-muted)", fontSize: "1.05rem" }}>
                Not necessarily. While pure Term insurance expires, Legacy in Motion also offers Permanent policies (like IULs) and Return of Premium (ROP) term policies. With an ROP policy, if you outlive the term without ever needing to use the insurance, you receive 100% of your paid premiums back tax-free.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- ENTERPRISE GLOBAL FORM INJECTION --- */}
      <GlobalLeadForm 
        title="Get Your Free Coverage Quote" 
        subtitle="Whether you need Mortgage Protection or a comprehensive Living Benefits policy, our local experts will find a plan that fits your family's budget."
        sourcePage="Living Benefits Hub (LA)"
        dropdownOptions={[
          "Living Benefits (Critical Illness Protection)",
          "Mortgage Protection Insurance",
          "Return of Premium (Get my money back)",
          "General Life Insurance Quote"
        ]}
      />
    </>
  );
}