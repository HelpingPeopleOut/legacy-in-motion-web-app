"use client";

import { useEffect } from "react";
import GlobalLeadForm from "@/components/GlobalLeadForm";
import HomePathwayPanel from "@/components/HomePathwayPanel";
import HomeStorySection from "@/components/HomeStorySection";
import TransformationStories from "@/components/TransformationStories";
import AdvisorHeroPhoto from "@/components/AdvisorHeroPhoto";
import MeetAdvisorSection from "@/components/MeetAdvisorSection";
import EnterpriseTrustSignals from "@/components/seo/EnterpriseTrustSignals";
import EnterpriseFaqSection from "@/components/seo/EnterpriseFaqSection";
import AdvisorTeamAside from "@/components/AdvisorTeamAside";
import { GLOBAL_FAQS } from "@/lib/ai-enterprise";
import Link from "next/link";

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

  return (
    <>
      <header className="hero hero-index hero-premium fade-in">
        <div className="container hero-premium-grid">
          <div className="hero-intro-content">
            <p className="hero-eyebrow">Legacy in Motion · Financial Advisory</p>
            <h1>
              Get Your Financial Problems <span className="text-gold">Solved — Not Sold.</span>
            </h1>

            <AdvisorHeroPhoto locale="en" />

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

      <EnterpriseTrustSignals locale="en" />

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

      <MeetAdvisorSection locale="en" />

      {/* 3. PROVEN TRANSFORMATIONS + INSTAGRAM */}
      <TransformationStories locale="en" />

      <EnterpriseFaqSection
        title="Common Questions — Answered Clearly"
        faqs={GLOBAL_FAQS.slice(0, 6)}
        id="home-faq"
        aside={<AdvisorTeamAside locale="en" />}
      />

      <section className="text-section fade-in" style={{ background: "var(--bg-page)", padding: "3rem 0" }}>
        <div className="container text-center">
          <p style={{ color: "var(--text-muted)", maxWidth: "640px", margin: "0 auto 1rem" }}>
            Explore in-depth guides on rollovers, living benefits, debt payoff, and estate basics — written for real search questions.
          </p>
          <Link href="/financial-education" className="btn-outline">
            Financial Education Hub →
          </Link>
        </div>
      </section>

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
    </>
  );
}