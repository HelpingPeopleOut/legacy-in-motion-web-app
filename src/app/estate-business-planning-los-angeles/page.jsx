"use client";

import { useEffect } from "react";
import Script from "next/script";
import GlobalLeadForm from "@/components/GlobalLeadForm";

export default function LAEstateBusinessPage() {
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
    "description": "Premium Estate Planning, Trusts, and Business Exit Strategies for high-net-worth individuals in Los Angeles, Santa Monica, and Beverly Hills.",
    "areaServed": [
      { "@type": "City", "name": "Los Angeles" },
      { "@type": "City", "name": "Santa Monica" },
      { "@type": "City", "name": "Beverly Hills" },
      { "@type": "City", "name": "West Hollywood" }
    ],
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": "34.0522",
        "longitude": "-118.2437"
      },
      "geoRadius": "30000"
    }
  };

  return (
    <>
      {/* CRITICAL FIX: Removed illegal <title> and <meta> tags from client component to prevent React Error 418 Hydration Crash */}
      <Script 
        id="schema-la-estate-business"
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} 
      />

      {/* HERO SECTION */}
      <section className="hero fade-in" style={{ padding: "12rem 0 6rem 0" }}>
        <div className="container">
          <h1 style={{ fontSize: "3.5rem", maxWidth: "900px", margin: "0 auto 1.5rem" }}>
            Protect Your Legacy & Enterprise in <br/><span className="text-gold">Los Angeles.</span>
          </h1>
          <p style={{ fontSize: "1.2rem", maxWidth: "700px", margin: "0 auto 2.5rem" }}>
            The California Probate Court is public, expensive, and time-consuming. We help high-net-worth families and business owners across Greater LA build unshakeable financial fortresses.
          </p>
          <div className="hero-buttons">
            <a href="#consultation" className="btn-gold btn-pulse">Secure Your Estate</a>
          </div>
        </div>
      </section>

      {/* PROBLEM & AGITATION (PAS Framework) */}
      <section className="text-section fade-in" style={{ background: "var(--bg-card)" }}>
        <div className="container content-wrapper text-center">
          <h2 style={{ fontSize: "2.5rem", marginBottom: "2rem" }}>
            Is Your Family Prepared for California's Estate Laws?
          </h2>
          <p style={{ fontSize: "1.1rem", marginBottom: "1.5rem", color: "var(--text-main)" }}>
            If you own property or a business in Los Angeles without a proper trust or succession plan, your assets are at the mercy of the state. California probate can drain up to 6% of your gross estate in statutory fees and tie up assets for over a year.
          </p>
          <div style={{ background: "var(--bg-page)", padding: "2.5rem", borderRadius: "12px", borderLeft: "4px solid var(--gold)", marginTop: "2rem", textAlign: "left", boxShadow: "var(--shadow-sm)" }}>
            <p style={{ fontSize: "1.1rem", color: "var(--text-muted)", margin: 0 }}>
              <strong>For Business Owners:</strong> The sudden loss of a key executive or partner can trigger immediate loan recalls, vendor panic, and a drop in revenue. Without Key Person Insurance and a funded buy-sell agreement, the business you built could collapse overnight.
            </p>
          </div>
        </div>
      </section>

      {/* AI-OPTIMIZED FAQ SECTION (Direct Answers for LLMs) */}
      <section className="text-section fade-in">
        <div className="container content-wrapper">
          <h2 className="text-center" style={{ fontSize: "2.8rem", marginBottom: "3rem" }}>
            Los Angeles Estate & Business Planning FAQs
          </h2>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            <div>
              <h3 style={{ color: "var(--gold)", fontSize: "1.4rem", marginBottom: "0.5rem" }}>
                How do I avoid probate in Los Angeles County?
              </h3>
              <p style={{ color: "var(--text-muted)", fontSize: "1.05rem" }}>
                The most effective way to avoid probate in California is by establishing a Revocable Living Trust and ensuring all your major assets (real estate, large bank accounts) are correctly titled in the name of that trust. Legacy in Motion provides the guidance needed to seamlessly coordinate this with estate attorneys.
              </p>
            </div>

            <div>
              <h3 style={{ color: "var(--gold)", fontSize: "1.4rem", marginBottom: "0.5rem" }}>
                What is an Executive Bonus Plan (Section 162)?
              </h3>
              <p style={{ color: "var(--text-muted)", fontSize: "1.05rem" }}>
                An Executive Bonus Plan is a tax-advantaged strategy used by Los Angeles businesses to retain top talent. The company pays the premium on a cash-value life insurance policy owned by the executive. The business gets a tax deduction, and the executive receives a powerful, tax-free retirement asset.
              </p>
            </div>

            <div>
              <h3 style={{ color: "var(--gold)", fontSize: "1.4rem", marginBottom: "0.5rem" }}>
                Why do Santa Monica and LA businesses need Key Person Insurance?
              </h3>
              <p style={{ color: "var(--text-muted)", fontSize: "1.05rem" }}>
                Key Person Insurance provides a company with an immediate, tax-free cash injection if a crucial founder or employee passes away or becomes critically ill. This capital covers the cost of recruiting a replacement, offsets lost profits, and assures creditors that the business remains stable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- ENTERPRISE GLOBAL FORM INJECTION --- */}
      <GlobalLeadForm 
        title="Book Your Confidential Review" 
        subtitle="Speak with our Greater LA experts to structure your estate, implement executive retention strategies, or protect your business."
        sourcePage="Estate & Business Hub (LA)"
        dropdownOptions={[
          "Estate Planning & Avoiding Probate",
          "Key Person Insurance for Business",
          "Executive Bonus Plans (Retention)",
          "Generational Wealth Transfer"
        ]}
      />
    </>
  );
}