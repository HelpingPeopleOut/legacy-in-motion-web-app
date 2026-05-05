"use client";

import { useEffect } from "react";
import Script from "next/script";
import GlobalLeadForm from "@/components/GlobalLeadForm";

export default function BusinessStrategiesPage() {
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
    "name": "Legacy in Motion - Business Financial Strategies",
    "description": "Protect your business and retain top talent with Key Person Insurance, Buy-Sell Agreements, and Executive Bonus Plans.",
    "areaServed": ["Los Angeles", "Pasadena", "San Gabriel Valley"],
  };

  return (
    <>
      <title>Business Owner Financial Strategies | Legacy in Motion</title>
      <meta name="description" content="Protect your company's future. Discover Key Person Insurance, Executive Bonus Plans, and Business Continuation strategies in Southern California." />
      <Script id="schema-business" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localSchema) }} />

      {/* HERO SECTION */}
      <section className="hero fade-in" style={{ padding: "12rem 0 6rem 0", background: "var(--bg-dark)" }}>
        <div className="container text-center">
          <span style={{ color: "var(--gold)", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase" }}>For Entrepreneurs & Founders</span>
          <h1 style={{ fontSize: "3.5rem", maxWidth: "900px", margin: "1rem auto 1.5rem", color: "#fff" }}>
            Protect Your Business. <br /><span className="text-gold">Reward Your Best.</span>
          </h1>
          <p style={{ fontSize: "1.2rem", maxWidth: "700px", margin: "0 auto 2.5rem", color: "#ccc" }}>
            You’ve poured your life into building your business. Ensure it survives unexpected tragedies, keep your top employees loyal, and build your own tax-free exit strategy.
          </p>
          <div className="hero-buttons" style={{ justifyContent: "center" }}>
            <a href="#quote" className="btn-gold btn-pulse">Schedule a Business Audit</a>
          </div>
        </div>
      </section>

      {/* EDUCATIONAL SECTION */}
      <section className="text-section fade-in" style={{ background: "var(--bg-page)" }}>
        <div className="container content-wrapper">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "3rem", alignItems: "center" }}>
            <div>
              <h2 style={{ fontSize: "2.5rem", marginBottom: "1.5rem" }}>Corporate Financial Safety Nets</h2>
              <p style={{ fontSize: "1.1rem", marginBottom: "1rem", color: "var(--text-muted)" }}>
                Most entrepreneurs reinvest every dollar back into their company, leaving their personal wealth tied entirely to the business's success. Furthermore, losing a key employee or a business partner to an unexpected tragedy can bankrupt the company overnight.
              </p>
              <p style={{ fontSize: "1.1rem", marginBottom: "1rem", color: "var(--text-main)", fontWeight: 600 }}>
                We design bulletproof corporate structures using specialized life insurance.
              </p>
              <ul style={{ listStylePosition: "inside", color: "var(--text-muted)", fontSize: "1.05rem", lineHeight: "1.8", marginTop: "1.5rem" }}>
                <li>✅ <strong>Key Person Insurance:</strong> Injects cash into the business if a vital employee dies or gets critically ill, covering lost revenue and hiring costs.</li>
                <li>✅ <strong>Executive Bonus Plans:</strong> Golden handcuffs. Offer top talent tax-advantaged retirement accounts to keep them from leaving for competitors.</li>
                <li>✅ <strong>Buy-Sell Agreements:</strong> Ensures you have the exact liquid cash needed to buy out a deceased partner's family so you keep control of the company.</li>
              </ul>
            </div>
            <div style={{ background: "var(--bg-card)", padding: "3rem", borderRadius: "16px", border: "1px solid var(--border-light)", boxShadow: "var(--shadow-md)" }}>
              <h3 style={{ color: "var(--gold)", marginBottom: "1rem", fontSize: "1.5rem" }}>Your Exit Strategy</h3>
              <p style={{ fontSize: "1.05rem", color: "var(--text-muted)", marginBottom: "1rem" }}>Selling your business isn't your only retirement option. You can use corporate dollars today to fund a tax-free personal retirement account for tomorrow.</p>
              <p style={{ fontSize: "1.05rem", color: "var(--text-muted)" }}>Let us show you how to pull money out of your business efficiently while protecting its future operations.</p>
            </div>
          </div>
        </div>
      </section>

      {/* LEAD CAPTURE FORM */}
      <section id="quote" className="fade-in" style={{ background: "var(--bg-dark)", padding: "7rem 0" }}>
        <GlobalLeadForm 
          title="Secure Your Corporate Future" 
          subtitle="Fill out the form below. We will reach out to discuss customized strategies for your specific business structure."
          lang="en"
          sourcePage="Business Owner Strategies (English)"
          dropdownOptions={[
            "Key Person Insurance",
            "Executive Bonus Plans (Retention)",
            "Buy-Sell Agreement Funding",
            "Business Owner Retirement Strategy"
          ]}
        />
      </section>
    </>
  );
}