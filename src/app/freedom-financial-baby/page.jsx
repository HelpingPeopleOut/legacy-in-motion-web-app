"use client";

import { useEffect } from "react";
import Script from "next/script";
import GlobalLeadForm from "@/components/GlobalLeadForm";

export default function FreedomFinancialBaby() {
  // Re-implementing your smooth fade-in scroll animation
  useEffect(() => {
    // Force the page to load at the very top
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

  // --- INVISIBLE PRODUCT SCHEMA FOR GOOGLE ---
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "FinancialProduct",
    "name": "Freedom Financial Baby",
    "brand": {
      "@type": "FinancialService",
      "name": "Legacy in Motion"
    },
    "description": "Children's investment accounts leveraging compound interest and tax-free wealth transfer strategies for families in Los Angeles and the San Gabriel Valley.",
    "category": "Life Insurance / Wealth Building",
    "audience": {
      "@type": "Audience",
      "audienceType": "Parents and Grandparents"
    }
  };

  return (
    <>
      {/* CRITICAL FIX: Removed illegal <title> and <meta> tags from client component to prevent React Error 418 Hydration Crash */}
      <Script 
        id="schema-freedom-baby"
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} 
      />

      <header className="hero fade-in" style={{ padding: "14rem 0 8rem 0" }}>
        <div className="container">
          <span
            style={{
              textTransform: "uppercase",
              letterSpacing: "2px",
              fontWeight: 600,
              color: "var(--gold)",
              marginBottom: "1rem",
              display: "inline-block"
            }}
          >
            Freedom Financial Baby
          </span>
          <h1 style={{ fontSize: "3.8rem", maxWidth: "900px", margin: "0 auto 1.5rem" }}>
            Give the gift of a future today.
          </h1>
          <p style={{ fontSize: "1.2rem", maxWidth: "700px", margin: "0 auto 2.5rem" }}>
            Transform the way you think about inheritance. Discover a practical,
            accessible strategy for everyday families to secure a massive financial
            legacy for their children—without needing a fortune to start.
          </p>
          <div className="hero-buttons">
            <a
              href="#consultation"
              className="btn-gold btn-pulse"
            >
              Start Their Plan Today
            </a>
          </div>
        </div>
      </header>

      <section className="text-section fade-in" style={{ background: "var(--bg-page)" }}>
        <div className="container">
          <h2 className="text-center" style={{ fontSize: "2.8rem" }}>
            Only 22% of children will receive an inheritance.
          </h2>
          <p
            className="text-center text-muted"
            style={{ maxWidth: "700px", margin: "1rem auto 0", fontSize: "1.1rem" }}
          >
            Three harsh realities make leaving a traditional million-dollar
            inheritance unlikely for most hardworking parents:
          </p>

          <div className="realities-grid card-grid">
            <div className="reality-card card">
              <h3 className="text-gold" style={{ fontSize: "1.4rem", marginBottom: "1rem" }}>01. Longevity</h3>
              <p style={{ fontSize: "1.05rem", color: "var(--text-muted)", lineHeight: "1.6" }}>
                Living longer is a blessing, but it means parents will need to
                stretch their personal savings to fund a much lengthier retirement,
                leaving less behind.
              </p>
            </div>
            <div className="reality-card card">
              <h3 className="text-gold" style={{ fontSize: "1.4rem", marginBottom: "1rem" }}>02. Medical Bills</h3>
              <p style={{ fontSize: "1.05rem", color: "var(--text-muted)", lineHeight: "1.6" }}>
                Healthcare costs consistently outpace inflation. The average
                retiree spends over $150,000 on medical care from age 65 to the
                end of their life.
              </p>
            </div>
            <div className="reality-card card">
              <h3 className="text-gold" style={{ fontSize: "1.4rem", marginBottom: "1rem" }}>03. Long-Term Care</h3>
              <p style={{ fontSize: "1.05rem", color: "var(--text-muted)", lineHeight: "1.6" }}>
                70% of people over 65 will need some type of long-term care
                support, which can easily cost hundreds of thousands of dollars in
                the final years of life.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="comparison-section fade-in">
        <div className="container">
          <h2 className="text-center" style={{ fontSize: "2.8rem" }}>
            Which legacy plan is more realistic?
          </h2>
          <p
            className="text-center"
            style={{ color: "#aaaaaa", maxWidth: "600px", margin: "1rem auto 0", fontSize: "1.1rem" }}
          >
            Either option creates a strong foundation, but one is far more
            attainable for the modern family.
          </p>

          <div className="comp-grid">
            <div className="comp-card">
              <h4 style={{ fontFamily: "var(--font-body)", textTransform: "uppercase", fontSize: "0.9rem", letterSpacing: "2px", color: "#aaaaaa", marginBottom: "1rem" }}>
                Option 1: The Traditional Struggle
              </h4>
              <p style={{ fontSize: "1.2rem", lineHeight: "1.6" }}>
                Attempt to save enough to fund your own retirement, cover your
                end-of-life care, and <em>still</em> leave each of your children a
                massive lump-sum inheritance from your remaining personal savings.
              </p>
            </div>
            <div className="comp-card gold-focus">
              <h4 style={{ fontFamily: "var(--font-body)", textTransform: "uppercase", fontSize: "0.9rem", letterSpacing: "2px", color: "var(--gold)", marginBottom: "1rem" }}>
                Option 2: The Enduring Wealth Approach
              </h4>
              <p style={{ fontSize: "1.2rem", lineHeight: "1.6" }}>
                Remove the burden of a lump-sum inheritance. Grow a powerful
                retirement foundation for each child by starting with a small
                fraction of that amount when they are young, transforming their
                early years into earning years.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        className="text-section fade-in text-center"
        style={{ borderBottom: "1px solid var(--border-light)", background: "var(--bg-page)" }}
      >
        <div className="container content-wrapper">
          <h2 style={{ fontSize: "2.8rem", marginBottom: "1rem" }}>
            Common Sense Worth Millions
          </h2>
          <p
            style={{
              fontSize: "1.15rem",
              color: "var(--text-muted)",
              marginBottom: "2rem",
            }}
          >
            Since it is so difficult to leave an inheritance later in life, why
            not use the greatest financial asset a child has to build the
            foundation for their future right now?
          </p>
          <h3
            className="text-gold"
            style={{
              fontSize: "2rem",
              textTransform: "uppercase",
              letterSpacing: "2px",
            }}
          >
            That asset is TIME.
          </h3>
          <p
            style={{
              fontSize: "1.15rem",
              color: "var(--text-muted)",
              marginTop: "2rem",
            }}
          >
            The Freedom Financial Baby strategy leverages three simple concepts:{" "}
            <strong style={{ color: "var(--text-main)" }}>Compound Interest</strong> (money growing on money),{" "}
            <strong style={{ color: "var(--text-main)" }}>The Time Value of Money</strong> (money saved today is worth
            more tomorrow), and <strong style={{ color: "var(--text-main)" }}>Wealth Protection</strong> (safeguarding
            those assets through strategic insurance products and trusts).
          </p>
        </div>
      </section>

      <section className="math-section fade-in text-section" style={{ background: "var(--bg-card)" }}>
        <div className="container">
          <h2 className="text-center" style={{ fontSize: "2.8rem" }}>
            The Cost of Waiting
          </h2>
          <p
            className="text-center text-muted"
            style={{ maxWidth: "650px", margin: "1rem auto 2rem", fontSize: "1.1rem" }}
          >
            What happens if you leverage a child&apos;s full life for compound
            growth versus waiting until they are 18? Consider this hypothetical
            illustration:
          </p>

          <div className="math-box">
            <div className="math-row">
              <div className="math-label">
                <h4 style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>Timeframe 1: Starting at Birth</h4>
                <p style={{ fontSize: "0.95rem", color: "var(--text-muted)" }}>A one-time $13,000 lump sum contribution grows for 67 years.</p>
              </div>
              <div className="math-data">
                <div className="math-number">
                  <span>Initial Contribution</span>
                  <strong style={{ fontSize: "2.2rem" }}>$13,000</strong>
                </div>
                <div className="math-number highlight">
                  <span>Value at Age 67</span>
                  <strong>$1,000,442</strong>
                </div>
              </div>
            </div>

            <div className="math-row">
              <div className="math-label">
                <h4 style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>Timeframe 2: Starting at Age 18</h4>
                <p style={{ fontSize: "0.95rem", color: "var(--text-muted)" }}>
                  The exact same $13,000 lump sum contribution, but it only
                  grows for 49 years.
                </p>
              </div>
              <div className="math-data">
                <div className="math-number">
                  <span>Initial Contribution</span>
                  <strong style={{ fontSize: "2.2rem" }}>$13,000</strong>
                </div>
                <div className="math-number">
                  <span>Value at Age 67</span>
                  <strong>$311,486</strong>
                </div>
              </div>
            </div>
          </div>

          <p
            style={{
              fontSize: "0.85rem",
              color: "#888",
              maxWidth: "900px",
              margin: "2rem auto 0",
              textAlign: "justify",
            }}
          >
            *Disclaimer: This is a hypothetical scenario for illustration purposes
            only. Assumes a 6.5% average annual interest rate, compounded monthly.
            It does not represent an actual investment in any specific product and
            does not account for fees, expenses, or taxes, which would lower
            results. Investing entails risk. Consult with Legacy in Motion to
            design a customized plan for your family&apos;s specific goals.
          </p>
        </div>
      </section>

      {/* --- ENTERPRISE GLOBAL FORM INJECTION --- */}
      <GlobalLeadForm 
        title="Plant the Tree Today" 
        subtitle="&quot;The true meaning of life is to plant trees, under whose shade you do not expect to sit.&quot; Let's build a plan for your children that they will thank you for decades from now."
        sourcePage="Freedom Financial Baby Page"
        dropdownOptions={[
          "Expecting / Newborns",
          "1 to 5 years old",
          "6 to 12 years old",
          "13 to 17 years old",
          "18+ / Looking at other legacy options"
        ]}
      />
    </>
  );
}