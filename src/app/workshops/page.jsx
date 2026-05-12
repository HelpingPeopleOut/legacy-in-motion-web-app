"use client";

import { useEffect } from "react";
import Script from "next/script";
import GlobalLeadForm from "@/components/GlobalLeadForm";

export default function Workshops() {
  // Re-implementing your smooth fade-in scroll animation
  useEffect(() => {
    window.scrollTo(0, 0);

    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.15,
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

  // --- INVISIBLE SERVICE SCHEMA FOR GOOGLE ---
  const workshopSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Corporate Financial Wellness Workshops",
    "provider": {
      "@type": "FinancialService",
      "name": "Legacy in Motion"
    },
    "description": "Professional employee financial education workshops in Los Angeles and the San Gabriel Valley.",
    "areaServed": ["Los Angeles", "Pasadena", "San Gabriel Valley", "California"],
    "serviceType": "Financial Education"
  };

  return (
    <>
      {/* CRITICAL FIX: Removed illegal <title> and <meta> tags from this client component to prevent React Error #418 (Hydration Mismatch) */}
      <Script 
        id="schema-workshops"
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(workshopSchema) }} 
      />

      <header
        className="hero fade-in"
        style={{
          padding: "14rem 0 8rem 0",
          background: "linear-gradient(to bottom, #fcfcfc, #f1f1f1)",
          borderBottom: "1px solid var(--border-light)",
        }}
      >
        <div className="container">
          <span
            style={{
              color: "var(--gold)",
              fontWeight: 600,
              letterSpacing: "3px",
              textTransform: "uppercase",
              fontSize: "0.9rem",
              marginBottom: "1rem",
              display: "inline-block",
            }}
          >
            Education for Your Organization
          </span>
          <h1
            style={{
              fontSize: "3.8rem",
              lineHeight: 1.1,
              marginBottom: "1.5rem",
              maxWidth: "900px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Financial intelligence is the ultimate benefit.
          </h1>
          <p
            style={{
              fontSize: "1.25rem",
              color: "var(--text-muted)",
              margin: "0 auto 3rem",
              maxWidth: "750px",
              fontWeight: 300,
            }}
          >
            We partner with business owners and community leaders to host
            professional workshops designed to eliminate employee financial stress
            and build a roadmap to true wealth.
          </p>
          <a href="#consultation" className="btn-gold btn-pulse">
            Request Booking Information
          </a>
        </div>
      </header>

      <section
        className="topics-section fade-in"
        style={{ padding: "8rem 0", background: "var(--bg-page)" }}
      >
        <div className="container">
          <h2 className="text-center" style={{ fontSize: "3rem" }}>
            Masterclass Topics
          </h2>
          <p
            className="text-center text-muted"
            style={{ maxWidth: "700px", margin: "1.5rem auto 0", fontSize: "1.2rem" }}
          >
            Customizable sessions built on the Enduring Wealth Framework.
          </p>

          <div className="card-grid">
            <div className="card" style={{ display: "flex", flexDirection: "column" }}>
              <span className="topic-icon-label">Essential</span>
              <h3 style={{ fontSize: "1.6rem", marginBottom: "1.2rem", lineHeight: 1.3 }}>
                Debt Management & Student Loans
              </h3>
              <p style={{ fontSize: "1.05rem", color: "var(--text-muted)", flexGrow: 1 }}>
                Go beyond basic budgeting. We teach aggressive reduction
                strategies that help your team reclaim their cash flow while
                building a secure future.
              </p>
            </div>
            
            <div className="card" style={{ display: "flex", flexDirection: "column" }}>
              <span className="topic-icon-label">Credit</span>
              <h3 style={{ fontSize: "1.6rem", marginBottom: "1.2rem", lineHeight: 1.3 }}>
                Managing & Building Credit Scores
              </h3>
              <p style={{ fontSize: "1.05rem", color: "var(--text-muted)", flexGrow: 1 }}>
                Demystifying the credit algorithm. Learn actionable steps to
                optimize scores for lower interest rates and better lending power.
              </p>
            </div>
            
            <div className="card" style={{ display: "flex", flexDirection: "column" }}>
              <span className="topic-icon-label">Foundation</span>
              <h3 style={{ fontSize: "1.6rem", marginBottom: "1.2rem", lineHeight: 1.3 }}>
                Budgeting & Cash Flow Logic
              </h3>
              <p style={{ fontSize: "1.05rem", color: "var(--text-muted)", flexGrow: 1 }}>
                The core of the framework: managing the gap between income and
                expenses to maximize what stays in your pocket.
              </p>
            </div>
            
            <div className="card" style={{ display: "flex", flexDirection: "column" }}>
              <span className="topic-icon-label">Wealth</span>
              <h3 style={{ fontSize: "1.6rem", marginBottom: "1.2rem", lineHeight: 1.3 }}>
                How Money Grows: Growth Strategies
              </h3>
              <p style={{ fontSize: "1.05rem", color: "var(--text-muted)", flexGrow: 1 }}>
                An educational deep-dive into compound interest, market
                volatility protection, and the power of tax-advantaged vehicles.
              </p>
            </div>
            
            <div className="card" style={{ display: "flex", flexDirection: "column" }}>
              <span className="topic-icon-label">Protection</span>
              <h3 style={{ fontSize: "1.6rem", marginBottom: "1.2rem", lineHeight: 1.3 }}>
                Risk Management & Asset Security
              </h3>
              <p style={{ fontSize: "1.05rem", color: "var(--text-muted)", flexGrow: 1 }}>
                Strategies to protect what you’ve built. Covering living benefits,
                income protection, and safeguarding families against the unexpected.
              </p>
            </div>
            
            <div className="card" style={{ display: "flex", flexDirection: "column" }}>
              <span className="topic-icon-label">Optimization</span>
              <h3 style={{ fontSize: "1.6rem", marginBottom: "1.2rem", lineHeight: 1.3 }}>
                The Impact of Taxes on Your Money
              </h3>
              <p style={{ fontSize: "1.05rem", color: "var(--text-muted)", flexGrow: 1 }}>
                Financial literacy isn&apos;t just about what you make—it&apos;s about what
                you keep. Learn how tax planning changes the legacy of your wealth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- ENTERPRISE GLOBAL FORM INJECTION --- */}
      <GlobalLeadForm 
        title="Host a Session" 
        subtitle="Fill out the inquiry form below. Please include your Organization Name and expected audience size in the notes."
        sourcePage="Corporate Workshops Page"
        dropdownOptions={[
          "Debt Management & Credit Building",
          "Growth Strategies & Risk Management",
          "The Impact of Taxes on Wealth",
          "Comprehensive Financial Wellness Series"
        ]}
      />
    </>
  );
}