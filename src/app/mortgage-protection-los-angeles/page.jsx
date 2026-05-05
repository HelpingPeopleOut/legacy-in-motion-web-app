"use client";

import { useEffect } from "react";
import Script from "next/script";
import GlobalLeadForm from "@/components/GlobalLeadForm";

export default function MortgageProtectionPage() {
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
    "name": "Legacy in Motion - Mortgage Protection",
    "description": "Keep your family in their home. Mortgage protection insurance with living benefits to cover your home loan in case of death, cancer, or heart attack.",
    "areaServed": ["Los Angeles", "Pasadena", "San Gabriel Valley"],
  };

  return (
    <>
      <title>Mortgage Protection Insurance Los Angeles | Legacy in Motion</title>
      <meta name="description" content="Protect your family's biggest asset. Discover mortgage protection life insurance with living benefits to pay off your home if the unthinkable happens." />
      <Script id="schema-mortgage" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localSchema) }} />

      {/* HERO SECTION */}
      <section className="hero fade-in" style={{ padding: "12rem 0 6rem 0", background: "var(--bg-dark)" }}>
        <div className="container text-center">
          <span style={{ color: "var(--gold)", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase" }}>For Homeowners in Southern California</span>
          <h1 style={{ fontSize: "3.5rem", maxWidth: "900px", margin: "1rem auto 1.5rem", color: "#fff" }}>
            Don't Let the Bank <span className="text-gold">Take Your Home.</span>
          </h1>
          <p style={{ fontSize: "1.2rem", maxWidth: "700px", margin: "0 auto 2.5rem", color: "#ccc" }}>
            If you suffered a heart attack, stroke, or unexpectedly passed away tomorrow, could your family still afford the mortgage? Secure their future for pennies on the dollar.
          </p>
          <div className="hero-buttons" style={{ justifyContent: "center" }}>
            <a href="#quote" className="btn-gold btn-pulse">Get a Free Protection Quote</a>
          </div>
        </div>
      </section>

      {/* EDUCATIONAL SECTION */}
      <section className="text-section fade-in" style={{ background: "var(--bg-page)" }}>
        <div className="container content-wrapper">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "3rem", alignItems: "center" }}>
            <div>
              <h2 style={{ fontSize: "2.5rem", marginBottom: "1.5rem" }}>More Than Just Death Insurance</h2>
              <p style={{ fontSize: "1.1rem", marginBottom: "1rem", color: "var(--text-muted)" }}>
                Most people think Mortgage Protection only pays out if they die. But what if you survive a severe illness and simply can't work for 6 months?
              </p>
              <p style={{ fontSize: "1.1rem", marginBottom: "1rem", color: "var(--text-main)", fontWeight: 600 }}>
                Our modern Mortgage Protection plans include Living Benefits. 
              </p>
              <ul style={{ listStylePosition: "inside", color: "var(--text-muted)", fontSize: "1.05rem", lineHeight: "1.8", marginTop: "1.5rem" }}>
                <li>✅ <strong>Pay off the house</strong> completely if you pass away.</li>
                <li>✅ <strong>Access cash while alive</strong> if diagnosed with Cancer, a Heart Attack, or a Stroke.</li>
                <li>✅ <strong>Customizable</strong> to fit your exact loan amount and monthly budget.</li>
              </ul>
            </div>
            <div style={{ background: "var(--bg-card)", padding: "3rem", borderRadius: "16px", border: "1px solid var(--border-light)", boxShadow: "var(--shadow-md)" }}>
              <h3 style={{ color: "var(--gold)", marginBottom: "1rem", fontSize: "1.5rem" }}>The 30-Day Reality</h3>
              <p style={{ fontSize: "1.05rem", color: "var(--text-muted)", marginBottom: "1rem" }}>If your household lost its primary income, how many months could you continue paying your mortgage before the bank issues a foreclosure notice?</p>
              <p style={{ fontSize: "1.05rem", color: "var(--text-muted)" }}>Protecting your family's biggest asset is more affordable than you think. You can secure a policy in days without a medical exam.</p>
            </div>
          </div>
        </div>
      </section>

      {/* LEAD CAPTURE FORM */}
      <section id="quote" className="fade-in" style={{ background: "var(--bg-dark)", padding: "7rem 0" }}>
        <GlobalLeadForm 
          title="See How Affordable Protection Is" 
          subtitle="Fill out the form below. We will run a customized mortgage protection quote based on your loan amount."
          lang="en"
          sourcePage="Mortgage Protection (English)"
          dropdownOptions={[
            "Mortgage Protection Quote",
            "Living Benefits Life Insurance",
            "Review My Current Policy"
          ]}
        />
      </section>
    </>
  );
}