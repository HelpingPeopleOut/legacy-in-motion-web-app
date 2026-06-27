"use client";

import { useEffect } from "react";
import CinematicIntro from "@/components/CinematicIntro";
import GlobalLeadForm from "@/components/GlobalLeadForm";
import HomePathwayPanel from "@/components/HomePathwayPanel";
import HomeStorySection from "@/components/HomeStorySection";
import TransformationStories from "@/components/TransformationStories";

export default function Home() {
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

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    "name": "Legacy in Motion",
    "url": "https://www.legacyinmotion.org",
    "logo": "https://www.legacyinmotion.org/android-chrome-512x512.png",
    "description": "Expert financial consulting. Specializing in Retirement Planning, Life Insurance with Living Benefits, and Estate Planning.",
    "areaServed": ["Los Angeles", "Pasadena", "San Gabriel Valley"]
  };

  return (
    <>
      <CinematicIntro />

      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} 
      />

      <header className="hero hero-index hero-premium fade-in">
        <div className="container hero-premium-grid">
          <div className="hero-intro-content">
            <p className="hero-eyebrow">Legacy in Motion · Financial Advisory</p>
            <h1>
              Get Your Financial Problems <span className="text-gold">Solved — Not Sold.</span>
            </h1>

            <HomeStorySection />

            <div className="hero-action-buttons">
              <a href="#consultation" className="btn-gold btn-pulse">
                Free Strategy Call
              </a>
              <a href="/dashboard" className="btn-outline">
                Client Tools Portal
              </a>
              <a href="#framework" className="btn-outline btn-ghost">
                7-Step Blueprint
              </a>
            </div>
          </div>

          <HomePathwayPanel />
        </div>
      </header>

      {/* 2. THE BLUEPRINT */}
      <section id="framework" className="fwf-elegant-section fade-in">
        <div className="container">
          <h2>Your 7-Step Wealth Blueprint</h2>
          <p style={{ marginBottom: "4rem", color: "var(--text-muted)", maxWidth: "700px", margin: "0 auto 4rem", fontSize: "1.1rem" }}>
            A comprehensive strategy combining personal asset protection, tax-advantaged growth, and robust business structuring to ensure your legacy endures.
          </p>
          <div className="fwf-elegant-grid">
            <article className="fwf-elegant-item"><span className="step-number">Step 01</span><h3>Cash Flow & Debt Elimination</h3><p>Budgeting and cash flow analysis to build healthier money habits and eliminate debt efficiently.</p></article>
            <article className="fwf-elegant-item"><span className="step-number">Step 02</span><h3>Emergency Fund Planning</h3><p>Establish 3-6 months of liquid reserves in High-Yield Savings Accounts to outpace inflation.</p></article>
            <article className="fwf-elegant-item"><span className="step-number">Step 03</span><h3>Living Benefits Protection</h3><p>Secure Term or Permanent Life Insurance covering critical, chronic, and terminal illnesses.</p></article>
            <article className="fwf-elegant-item"><span className="step-number">Step 04</span><h3>Retirement Optimization</h3><p>Execute 401(k) Rollovers and utilize Fixed Indexed Annuities for Guaranteed Retirement Income.</p></article>
            <article className="fwf-elegant-item"><span className="step-number">Step 05</span><h3>Tax-Free Wealth Building</h3><p>Leverage Cash Value Life Insurance (IULs) for tax-advantaged savings and Children&apos;s Investment Accounts.</p></article>
            <article className="fwf-elegant-item"><span className="step-number">Step 06</span><h3>Business Financial Safety</h3><p>Implement Key Person Insurance and Executive Bonus Plans to protect and reward top talent.</p></article>
            <article className="fwf-elegant-item"><span className="step-number">Step 07</span><h3>Estate & Legacy Planning</h3><p>Avoid probate through proper Trusts and Wills guidance, ensuring seamless Wealth Transfer Strategies.</p></article>
          </div>
        </div>
      </section>

      {/* 3. PROVEN TRANSFORMATIONS + INSTAGRAM */}
      <TransformationStories locale="en" />

      {/* 4. REQUEST A CALLBACK FORM */}
      <section id="consultation" className="fade-in" style={{ background: "var(--bg-page)", padding: "7rem 0" }}>
        <GlobalLeadForm 
          title="Ready to Start? Request a Consultation" 
          subtitle="Fill out the form below. Our team will review your request and call you back within 24 hours."
          sourcePage="English Main Homepage"
          dropdownOptions={[
            "Retirement Planning & 401(k) Rollovers",
            "Life Insurance & Living Benefits",
            "Estate Planning, Trusts & Wills",
            "Debt Elimination & Cash Flow Analysis",
            "Business Exit & Executive Bonus Plans",
            "Children's Investment & Savings Accounts"
          ]}
        />
      </section>

      {/* 5. SERVICES DIRECTORY */}
      <section id="services" className="services fade-in text-section" style={{ background: "var(--bg-card)" }}>
        <div className="container">
          <h2 className="text-center" style={{ fontSize: "2.8rem" }}>Comprehensive Financial Expertise</h2>
          <p className="text-center text-muted" style={{ maxWidth: "700px", margin: "1rem auto 4rem", fontSize: "1.1rem" }}>We architect customized strategies across every pillar of wealth generation, ensuring no gaps in your financial fortress.</p>
          <div className="services-wrapper">
            <div className="service-category"><h3>Retirement & Savings</h3><ul><li>Retirement Planning</li><li>Pension Management</li><li>401(k) Rollovers</li><li>Fixed Indexed Annuities</li></ul></div>
            <div className="service-category"><h3>Insurance & Protection</h3><ul><li>Life Insurance Policies</li><li>Living Benefits & Critical Illness</li><li>Permanent Life Insurance</li><li>Mortgage Protection Insurance</li></ul></div>
            <div className="service-category"><h3>Legacy & Family</h3><ul><li>Estate Planning & Trusts</li><li>Legacy Planning</li><li>Children&apos;s Investment Accounts</li><li>Wealth Transfer Strategies</li></ul></div>
            <div className="service-category"><h3>Business & Cash Flow</h3><ul><li>Business Financial Safety Nets</li><li>Key Person Insurance</li><li>Executive Bonus Plans</li><li>Debt Elimination Strategies</li></ul></div>
          </div>
        </div>
      </section>

      {/* 6. BIBLE VERSE CAPSTONE */}
      <section style={{ paddingBottom: "4rem", background: "var(--bg-page)" }}>
        <div className="container fade-in">
          <p className="text-center" style={{ fontFamily: "var(--font-heading)", fontStyle: "italic", fontSize: "1.6rem", color: "var(--text-main)", maxWidth: "800px", margin: "0 auto", lineHeight: "1.4" }}>
            &quot;I have told you these things, so that in me you may have peace. In this world you will have trouble. But take heart! I have overcome the world.&quot; <br />
            <span style={{ fontSize: "0.9rem", color: "var(--gold)", display: "block", marginTop: "1rem", fontFamily: "var(--font-body)", fontStyle: "normal", textTransform: "uppercase", letterSpacing: "3px", fontWeight: 600 }}>
              – John 16:33
            </span>
          </p>
        </div>
      </section>
    </>
  );
}