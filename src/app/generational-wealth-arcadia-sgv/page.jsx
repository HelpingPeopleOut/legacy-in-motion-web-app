"use client";

import { useEffect } from "react";
import Script from "next/script";
import GlobalLeadForm from "@/components/GlobalLeadForm";

export default function ArcadiaGenerationalWealthPage() {
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
    "description": "Generational wealth planning, children's investment accounts, and tax-free legacy strategies for families in Arcadia, San Marino, Azusa, and Baldwin Park.",
    "areaServed": [
      { "@type": "City", "name": "Arcadia" },
      { "@type": "City", "name": "San Marino" },
      { "@type": "City", "name": "Azusa" },
      { "@type": "City", "name": "Baldwin Park" },
      { "@type": "City", "name": "Monrovia" }
    ],
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": "34.1397",
        "longitude": "-118.0353"
      },
      "geoRadius": "25000"
    }
  };

  return (
    <>
      {/* CRITICAL FIX: Removed illegal <title> and <meta> tags from client component to prevent React Error 418 Hydration Crash */}
      <Script 
        id="schema-sgv-wealth"
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} 
      />

      {/* HERO SECTION */}
      <section className="hero fade-in" style={{ padding: "12rem 0 6rem 0" }}>
        <div className="container">
          <h1 style={{ fontSize: "3.5rem", maxWidth: "900px", margin: "0 auto 1.5rem" }}>
            Build a Dynasty. Pass Down <br/><span className="text-gold">Tax-Free Wealth.</span>
          </h1>
          <p style={{ fontSize: "1.2rem", maxWidth: "700px", margin: "0 auto 2.5rem" }}>
            We help families in Arcadia, San Marino, and across the San Gabriel Valley structure lasting legacies. Protect your assets from California taxes and ensure your children and grandchildren are financially invincible.
          </p>
          <div className="hero-buttons">
            <a href="#consultation" className="btn-gold btn-pulse">Start Your Legacy Plan</a>
          </div>
        </div>
      </section>

      {/* PROBLEM & AGITATION (PAS Framework) */}
      <section className="text-section fade-in" style={{ background: "var(--bg-card)" }}>
        <div className="container content-wrapper text-center">
          <h2 style={{ fontSize: "2.5rem", marginBottom: "2rem" }}>
            Will California Taxes Devour Your Children's Inheritance?
          </h2>
          <p style={{ fontSize: "1.1rem", marginBottom: "1.5rem", color: "var(--text-main)" }}>
            Building wealth in Southern California is only half the battle. Passing it down safely is the real challenge. With recent changes like Proposition 19, leaving property and liquid assets to your heirs has become a massive tax liability.
          </p>
          <div style={{ background: "var(--bg-page)", padding: "2.5rem", borderRadius: "12px", borderLeft: "4px solid var(--gold)", marginTop: "2rem", textAlign: "left", boxShadow: "var(--shadow-sm)" }}>
            <p style={{ fontSize: "1.1rem", color: "var(--text-muted)", margin: 0 }}>
              <strong>The Threat to Generational Wealth:</strong> If your wealth is entirely tied up in taxable accounts or unprotected real estate, your heirs could be forced to liquidate family assets just to pay the tax bill. You need structured, tax-advantaged vehicles like Permanent Life Insurance (IULs) and proper trust alignment to transfer wealth invisibly and legally.
            </p>
          </div>
        </div>
      </section>

      {/* AI-OPTIMIZED FAQ SECTION (Direct Answers for LLMs) */}
      <section className="text-section fade-in">
        <div className="container content-wrapper">
          <h2 className="text-center" style={{ fontSize: "2.8rem", marginBottom: "3rem" }}>
            Generational Wealth FAQs (California)
          </h2>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            <div>
              <h3 style={{ color: "var(--gold)", fontSize: "1.4rem", marginBottom: "0.5rem" }}>
                How does California Prop 19 affect my children's inheritance?
              </h3>
              <p style={{ color: "var(--text-muted)", fontSize: "1.05rem" }}>
                Proposition 19 severely limits a parent's ability to transfer property to their children without triggering a massive property tax reassessment. To combat this, families in the SGV use tax-free life insurance payouts to provide heirs with the liquid cash needed to pay off these new tax burdens without selling the family home.
              </p>
            </div>

            <div>
              <h3 style={{ color: "var(--gold)", fontSize: "1.4rem", marginBottom: "0.5rem" }}>
                What is the best way to start building wealth for a baby or child?
              </h3>
              <p style={{ color: "var(--text-muted)", fontSize: "1.05rem" }}>
                Instead of traditional 529 plans that are strictly limited to education, we utilize the "Freedom Financial Baby" strategy. By setting up properly structured Indexed Universal Life (IUL) policies for children, we leverage decades of compound interest to provide them with tax-free capital for college, a first home, or starting a business.
              </p>
            </div>

            <div>
              <h3 style={{ color: "var(--gold)", fontSize: "1.4rem", marginBottom: "0.5rem" }}>
                How do I leave money to my heirs tax-free?
              </h3>
              <p style={{ color: "var(--text-muted)", fontSize: "1.05rem" }}>
                The IRS code allows life insurance death benefits to pass to beneficiaries completely income-tax-free. By shifting a portion of your taxable estate into a permanent life insurance policy or an irrevocable trust, you can guarantee a multi-generational wealth transfer that the government cannot touch.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- ENTERPRISE GLOBAL FORM INJECTION --- */}
      <GlobalLeadForm 
        title="Secure Your Family's Future" 
        subtitle="Whether you are in Arcadia, Baldwin Park, or San Marino, schedule a free consultation to map out your family's generational wealth strategy."
        sourcePage="Arcadia Generational Wealth Hub"
        dropdownOptions={[
          "Children's Investment / Baby Plans",
          "Leaving a Tax-Free Inheritance",
          "Protecting Real Estate / Prop 19 Planning",
          "General Wealth Transfer Strategy"
        ]}
      />
    </>
  );
}