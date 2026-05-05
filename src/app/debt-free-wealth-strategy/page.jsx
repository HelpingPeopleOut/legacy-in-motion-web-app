"use client";

import { useEffect } from "react";
import Script from "next/script";
import GlobalLeadForm from "@/components/GlobalLeadForm";

export default function DebtFreeWealthPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll(".fade-in").forEach(sec => observer.observe(sec));
  }, []);

  const localSchema = {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    "name": "Legacy in Motion - Debt Elimination Strategy",
    "description": "Customized cash flow analysis and debt elimination strategies to help you get out of debt faster and start building tax-free wealth.",
    "areaServed": ["Los Angeles", "Pasadena", "San Gabriel Valley"],
  };

  return (
    <>
      <title>Debt Elimination & Cash Flow Strategy | Legacy in Motion</title>
      <meta name="description" content="Stop drowning in debt. Discover our customized cash flow and debt elimination strategies to pay off loans faster while building tax-free wealth." />
      <Script id="schema-debt-free" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localSchema) }} />

      {/* HERO SECTION */}
      <section className="hero fade-in" style={{ padding: "12rem 0 6rem 0", background: "var(--bg-dark)" }}>
        <div className="container text-center">
          <span style={{ color: "var(--gold)", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase" }}>Financial Freedom Starts Here</span>
          <h1 style={{ fontSize: "3.5rem", maxWidth: "900px", margin: "1rem auto 1.5rem", color: "#fff" }}>
            Eliminate Debt. <span className="text-gold">Build Wealth.</span>
          </h1>
          <p style={{ fontSize: "1.2rem", maxWidth: "700px", margin: "0 auto 2.5rem", color: "#ccc" }}>
            You don't have to wait until you are debt-free to start building your legacy. Discover the strategy to rapidly eliminate high-interest debt while simultaneously funding your future.
          </p>
          <div className="hero-buttons" style={{ justifyContent: "center" }}>
            <a href="#quote" className="btn-gold btn-pulse">Get Your Free Debt Analysis</a>
          </div>
        </div>
      </section>

      {/* EDUCATIONAL SECTION */}
      <section className="text-section fade-in" style={{ background: "var(--bg-page)" }}>
        <div className="container content-wrapper">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "3rem", alignItems: "center" }}>
            <div>
              <h2 style={{ fontSize: "2.5rem", marginBottom: "1.5rem" }}>The Cash Flow Illusion</h2>
              <p style={{ fontSize: "1.1rem", marginBottom: "1rem", color: "var(--text-muted)" }}>
                Most people believe they don't make enough money to invest. The reality is, their wealth is being quietly drained by inefficient cash flow, high-interest credit cards, and poorly structured loans.
              </p>
              <p style={{ fontSize: "1.1rem", marginBottom: "1rem", color: "var(--text-main)", fontWeight: 600 }}>
                We help you restructure your cash flow to turn your liabilities into assets. 
              </p>
              <ul style={{ listStylePosition: "inside", color: "var(--text-muted)", fontSize: "1.05rem", lineHeight: "1.8", marginTop: "1.5rem" }}>
                <li>✅ <strong>Debt Snowball Strategy:</strong> Target and eliminate toxic debt in record time without changing your lifestyle.</li>
                <li>✅ <strong>Simultaneous Growth:</strong> Start funding a tax-advantaged wealth account even while paying off loans.</li>
                <li>✅ <strong>Financial Clarity:</strong> Know exactly where every dollar goes to take back control of your life.</li>
              </ul>
            </div>
            <div style={{ background: "var(--bg-card)", padding: "3rem", borderRadius: "16px", border: "1px solid var(--border-light)", boxShadow: "var(--shadow-md)" }}>
              <h3 style={{ color: "var(--gold)", marginBottom: "1rem", fontSize: "1.5rem" }}>Stop Paying the Banks</h3>
              <p style={{ fontSize: "1.05rem", color: "var(--text-muted)", marginBottom: "1rem" }}>Every dollar you pay in credit card interest is a dollar stolen from your retirement, your children, and your legacy.</p>
              <p style={{ fontSize: "1.05rem", color: "var(--text-muted)" }}>Let us run the numbers. Within 90 days, we can help you establish a clear path to becoming 100% debt-free.</p>
            </div>
          </div>
        </div>
      </section>

      {/* LEAD CAPTURE FORM */}
      <section id="quote" className="fade-in" style={{ background: "var(--bg-dark)", padding: "7rem 0" }}>
        <GlobalLeadForm 
          title="Start Your Path to Zero Debt" 
          subtitle="Fill out the form below. We will reach out to schedule your free cash flow analysis and debt elimination strategy session."
          lang="en"
          sourcePage="Debt Elimination Strategy (English)"
          dropdownOptions={[
            "Debt Elimination & Cash Flow Analysis",
            "Emergency Fund Planning",
            "Starting to Invest While in Debt",
            "General Financial Review"
          ]}
        />
      </section>
    </>
  );
}