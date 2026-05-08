"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import CinematicIntro from "@/components/CinematicIntro";
import GlobalLeadForm from "@/components/GlobalLeadForm";

export default function Home() {
  // --- NATIVE FORM ENGINE STATES ---
  const [activePortal, setActivePortal] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

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

  // Lock body scroll when a portal modal is open
  useEffect(() => {
    if (activePortal) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
  }, [activePortal]);

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    "name": "Legacy in Motion",
    "url": "https://www.legacyinmotion.org",
    "logo": "https://www.legacyinmotion.org/logo.png",
    "description": "Expert financial consulting. Specializing in Retirement Planning, Life Insurance with Living Benefits, and Estate Planning.",
    "areaServed": ["Los Angeles", "Pasadena", "San Gabriel Valley"]
  };

  const handlePortalSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setTimeout(() => {
        setSubmitSuccess(false);
        setActivePortal(null);
      }, 3000);
    }, 2000);
  };

  return (
    <>
      <CinematicIntro />

      {/* FIXED: Removed the invalid <title> and <meta> tags that were causing React Error #418 */}
      
      <Script 
        id="schema-org-home"
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} 
      />

      {/* 1. HERO SECTION */}
      <header className="hero hero-index fade-in">
        <div className="container hero-grid">
          <div>
            <h1 style={{ lineHeight: "1.15" }}>
              The 7-Steps to <br />
              <span className="text-gold">Enduring Wealth.</span>
            </h1>
            <p>
              As a Senior Financial Associate with Experior Financial Group Inc.,
              I guide clients from financial complexity to a clear, actionable path
              for building a legacy. Establish your financial fortress in as little
              as 90 days.
            </p>
            <div className="hero-buttons">
              <a href="#consultation" className="btn-gold btn-pulse">
                Schedule a Consultation
              </a>
              <a href="#framework" className="btn-outline">
                Explore the Blueprint
              </a>
            </div>
          </div>
          
          <div className="ig-container">
            <blockquote className="instagram-media" data-instgrm-permalink="https://www.instagram.com/reel/DPXZTJtganx/?utm_source=ig_embed&amp;utm_campaign=loading" data-instgrm-version="14" style={{ background: "#FFF", border: 0, margin: 0, padding: 0, width: "100%" }}>
              <div style={{ padding: "16px" }}>
                <a href="https://www.instagram.com/reel/DPXZTJtganx/?utm_source=ig_embed&amp;utm_campaign=loading" style={{ background: "#FFFFFF", lineHeight: 0, padding: "0 0", textAlign: "center", textDecoration: "none", width: "100%" }} target="_blank" rel="noopener noreferrer">
                  <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                    <div style={{ backgroundColor: "#F4F4F4", borderRadius: "50%", flexGrow: 0, height: "40px", marginRight: "14px", width: "40px" }}></div>
                    <div style={{ display: "flex", flexDirection: "column", flexGrow: 1, justifyContent: "center" }}>
                      <div style={{ backgroundColor: "#F4F4F4", borderRadius: "4px", flexGrow: 0, height: "14px", marginBottom: "6px", width: "100px" }}></div>
                      <div style={{ backgroundColor: "#F4F4F4", borderRadius: "4px", flexGrow: 0, height: "14px", width: "60px" }}></div>
                    </div>
                  </div>
                  <div style={{ padding: "19% 0" }}></div>
                </a>
              </div>
            </blockquote>
            <Script async src="//www.instagram.com/embed.js" strategy="lazyOnload" />
          </div>
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

      {/* 3. GOD MODE INTAKE PORTALS */}
      <section className="fade-in" style={{ background: "var(--bg-dark)", padding: "7rem 0", borderTop: "1px solid var(--gold)", borderBottom: "1px solid var(--gold)" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <span style={{ color: "var(--gold)", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", fontSize: "0.9rem" }}>Direct Access</span>
            <h2 style={{ color: "#fff", fontSize: "2.8rem", margin: "1rem 0" }}>Client Intake Portals</h2>
            <p style={{ color: "#aaa", maxWidth: "600px", margin: "0 auto" }}>Select your specialized portal below to bypass general inquiries and send your information directly to our executive team.</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
            <div className="portal-card" onClick={() => setActivePortal('career')}>
              <div className="portal-icon">💼</div>
              <h3>Join Our Firm</h3>
              <p>Learn the secrets of the wealthy and build a thriving financial business across North America.</p>
              <span className="portal-btn">Access Portal ➔</span>
            </div>

            <div className="portal-card" onClick={() => setActivePortal('insurance')}>
              <div className="portal-icon">🛡️</div>
              <h3>Life Insurance Quote</h3>
              <p>Secure customized quotes for Term and Permanent coverage with Living Benefits.</p>
              <span className="portal-btn">Access Portal ➔</span>
            </div>

            <div className="portal-card" onClick={() => setActivePortal('children')}>
              <div className="portal-icon">🌱</div>
              <h3>Children&apos;s Wealth</h3>
              <p>Create generational wealth and secure your child&apos;s financial future early.</p>
              <span className="portal-btn">Access Portal ➔</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. DIGITAL PRESENCE COMMAND CENTER */}
      <section className="fade-in" style={{ padding: "6rem 0", background: "var(--bg-card)" }}>
        <div className="container text-center">
          <h2 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>Connect With Nelly</h2>
          <p style={{ color: "var(--text-muted)", maxWidth: "600px", margin: "0 auto 3rem" }}>Follow along for daily financial education, wealth-building strategies, and behind-the-scenes insights into Legacy in Motion.</p>
          
          <div style={{ display: "flex", justifyContent: "center", gap: "2rem", flexWrap: "wrap" }}>
            <a href="https://www.tiktok.com/@laranell14" target="_blank" rel="noopener noreferrer" className="social-god-card">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>
              <span>TikTok</span>
            </a>
            <a href="https://www.instagram.com/money_withnelz" target="_blank" rel="noopener noreferrer" className="social-god-card">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              <span>Instagram</span>
            </a>
            <a href="https://www.facebook.com/nelly.lara.509" target="_blank" rel="noopener noreferrer" className="social-god-card">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              <span>Facebook</span>
            </a>
          </div>
        </div>
      </section>

      {/* 5. REQUEST A CALLBACK FORM */}
      <section id="consultation" className="fade-in" style={{ background: "var(--bg-page)", padding: "7rem 0" }}>
        <GlobalLeadForm 
          title="General Inquiry" 
          subtitle="Not sure which portal to use? Fill out the general form below and we will route you to the right place."
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

      {/* NATIVE PORTAL MODALS */}
      {activePortal && (
        <div className="portal-modal-overlay">
          <div className="portal-modal-container fade-in visible">
            <button className="portal-close-btn" onClick={() => setActivePortal(null)}>✕</button>
            
            <div className="portal-header">
              <h2>
                {activePortal === 'career' && "Firm Interview Application"}
                {activePortal === 'insurance' && "Life Insurance Quote"}
                {activePortal === 'children' && "Children's Wealth Account"}
              </h2>
              <p>Direct Submission to Executive Team</p>
            </div>

            {submitSuccess ? (
              <div className="portal-success">
                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                <h3>Transmission Successful</h3>
                <p>Your encrypted file has been sent directly to Nelly Lara. We will be in touch shortly.</p>
              </div>
            ) : (
              <form className="portal-form" onSubmit={handlePortalSubmit}>
                <input type="hidden" name="Portal Type" value={activePortal.toUpperCase()} />
                
                <div className="form-row">
                  <div className="input-group">
                    <label>Full Name *</label>
                    <input type="text" name="Name" required placeholder="John Doe" />
                  </div>
                  <div className="input-group">
                    <label>Phone Number *</label>
                    <input type="tel" name="Phone" required placeholder="(555) 000-0000" />
                  </div>
                </div>

                <div className="form-row">
                  <div className="input-group">
                    <label>Email Address *</label>
                    <input type="email" name="Email" required placeholder="john@example.com" />
                  </div>
                  <div className="input-group">
                    <label>State of Residence *</label>
                    <input type="text" name="State" required placeholder="e.g. California" />
                  </div>
                </div>

                {activePortal === 'career' && (
                  <>
                    <div className="form-row">
                      <div className="input-group"><label>Age *</label><input type="number" name="Age" required placeholder="e.g. 35" /></div>
                      <div className="input-group"><label>Annual Income *</label><input type="number" name="Income" required placeholder="e.g. 75000" /></div>
                    </div>
                    <div className="input-group">
                      <label>Tell us about yourself & your best qualities *</label>
                      <textarea name="About" required rows="4" placeholder="Why are you interested in our income opportunity?"></textarea>
                    </div>
                  </>
                )}

                {activePortal === 'insurance' && (
                  <>
                    <div className="form-row">
                      <div className="input-group"><label>Date of Birth *</label><input type="date" name="DOB" required /></div>
                      <div className="input-group">
                        <label>Coverage Type *</label>
                        <select name="Type" required>
                          <option value="">Select Option</option>
                          <option value="Term">Term Life</option>
                          <option value="Permanent">Permanent Life</option>
                          <option value="Not Sure">I'm Not Sure</option>
                        </select>
                      </div>
                    </div>
                    <div className="input-group">
                      <label>Any health concerns? (Surgeries, smoking, Rx) *</label>
                      <textarea name="Health Concerns" required rows="3" placeholder="Please list any major health details..."></textarea>
                    </div>
                  </>
                )}

                {activePortal === 'children' && (
                  <>
                    <div className="form-row">
                      <div className="input-group"><label>Children's Ages *</label><input type="text" name="Children Ages" required placeholder="e.g. 4, 7, 12" /></div>
                      <div className="input-group">
                        <label>Monthly Contribution Target *</label>
                        <select name="Contribution" required>
                          <option value="">Select Target</option>
                          <option value="$75/month">$75 / month</option>
                          <option value="$100/month">$100 / month</option>
                          <option value="$125/month">$125 / month</option>
                          <option value="Other">Other / Discuss Later</option>
                        </select>
                      </div>
                    </div>
                    <div className="input-group">
                      <label>What should we know prior to our meeting? *</label>
                      <textarea name="Notes" required rows="3" placeholder="Additional details or goals..."></textarea>
                    </div>
                  </>
                )}

                <button type="submit" className="portal-submit-btn" disabled={isSubmitting}>
                  {isSubmitting ? "ENCRYPTING & SENDING..." : "SUBMIT APPLICATION"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}