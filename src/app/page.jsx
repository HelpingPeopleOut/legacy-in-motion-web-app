"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  // --- Custom form handler for Google Apps Script ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const file = formData.get("attachment");
    
    let fileBase64 = "";
    let fileName = "";
    let fileType = "";

    // Convert file to Base64 text if attached
    if (file && file.size > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      await new Promise((resolve) => (reader.onload = resolve));
      // Extract just the base64 string without the data URL prefix
      fileBase64 = reader.result.split(',')[1];
      fileName = file.name;
      fileType = file.type;
    }

    // Package the data for Google Apps Script
    const payload = {
      name: formData.get("Full Name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      topic: formData.get("Primary Goal"),
      notes: formData.get("Notes"),
      fileBase64: fileBase64,
      fileName: fileName,
      fileType: fileType
    };

    try {
      // Send data securely to your new Google CRM
      await fetch("https://script.google.com/macros/s/AKfycbyitmS-i4AxF7jg9GKgID5zpQAh83JjSDV5cbywccURQ4qqVPplG2kliP-RC59pCweX/exec", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
      });
      
      // Redirect to Thanks page instantly
      router.push("/thanks");
    } catch (error) {
      console.error(error);
      alert("There was an error submitting your request. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* --- SEO METADATA --- */}
      <title>Financial Consultant in Los Angeles & SGV | Legacy in Motion</title>
      <meta name="description" content="Expert retirement planning, pension rollovers, and estate planning services across Los Angeles, Pasadena, and the San Gabriel Valley. Build your financial fortress." />
      <meta name="keywords" content="Retirement planner in Pasadena CA, Pension and 401k rollover specialist near me, Estate planning services San Gabriel Valley, Life insurance living benefits Los Angeles, Financial consultant near me" />
      {/* -------------------- */}

      <header className="hero hero-index container fade-in">
        <div className="hero-grid">
          <div>
            <h1>The 7-Steps to Enduring Wealth.</h1>
            <p>
              As a Senior Financial Associate with Experior Financial Group Inc.,
              I guide clients from financial complexity to a clear, actionable path
              for building a legacy. Establish your financial fortress in as little
              as 90 days.
            </p>
            <div className="hero-buttons">
              <a href="#contact" className="btn-gold btn-pulse">
                Start Your Plan
              </a>
              <a href="#framework" className="btn-outline">
                Explore the Blueprint
              </a>
            </div>
          </div>
          
          <div className="ig-container">
            <blockquote
              className="instagram-media"
              data-instgrm-permalink="https://www.instagram.com/reel/DPXZTJtganx/?utm_source=ig_embed&amp;utm_campaign=loading"
              data-instgrm-version="14"
              style={{
                background: "#FFF",
                border: 0,
                margin: 0,
                padding: 0,
                width: "100%",
              }}
            >
              <div style={{ padding: "16px" }}>
                <a
                  href="https://www.instagram.com/reel/DPXZTJtganx/?utm_source=ig_embed&amp;utm_campaign=loading"
                  style={{
                    background: "#FFFFFF",
                    lineHeight: 0,
                    padding: "0 0",
                    textAlign: "center",
                    textDecoration: "none",
                    width: "100%",
                  }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                    <div style={{ backgroundColor: "#F4F4F4", borderRadius: "50%", flexGrow: 0, height: "40px", marginRight: "14px", width: "40px" }}></div>
                    <div style={{ display: "flex", flexDirection: "column", flexGrow: 1, justifyContent: "center" }}>
                      <div style={{ backgroundColor: "#F4F4F4", borderRadius: "4px", flexGrow: 0, height: "14px", marginBottom: "6px", width: "100px" }}></div>
                      <div style={{ backgroundColor: "#F4F4F4", borderRadius: "4px", flexGrow: 0, height: "14px", width: "60px" }}></div>
                    </div>
                  </div>
                  <div style={{ padding: "19% 0" }}></div>
                  <div style={{ paddingTop: "8px" }}>
                    <div style={{ color: "#3897f0", fontFamily: "Arial,sans-serif", fontSize: "14px", fontStyle: "normal", fontWeight: 550, lineHeight: "18px" }}>
                      View this post on Instagram
                    </div>
                  </div>
                  <div style={{ padding: "12.5% 0" }}></div>
                </a>
              </div>
            </blockquote>
            <Script async src="//www.instagram.com/embed.js" strategy="lazyOnload" />
          </div>
        </div>
      </header>

      <section id="framework" className="fwf-elegant-section fade-in">
        <div className="container">
          <h2>Your 7-Step Wealth Blueprint</h2>
          <p
            style={{
              marginBottom: "4rem",
              color: "var(--text-muted)",
              maxWidth: "700px",
              marginLeft: "auto",
              marginRight: "auto",
              fontSize: "1.1rem",
            }}
          >
            A comprehensive strategy combining personal asset protection,
            tax-advantaged growth, and robust business structuring to ensure your
            legacy endures.
          </p>

          <div className="fwf-elegant-grid">
            <article className="fwf-elegant-item">
              <span className="step-number">Step 01</span>
              <h3>Cash Flow & Debt Elimination</h3>
              <p>
                Budgeting and cash flow analysis to build healthier money habits
                and eliminate debt efficiently.
              </p>
            </article>

            <article className="fwf-elegant-item">
              <span className="step-number">Step 02</span>
              <h3>Emergency Fund Planning</h3>
              <p>
                Establish 3-6 months of liquid reserves in High-Yield Savings
                Accounts to outpace inflation.
              </p>
            </article>

            <article className="fwf-elegant-item">
              <span className="step-number">Step 03</span>
              <h3>Living Benefits Protection</h3>
              <p>
                Secure Term or Permanent Life Insurance covering critical,
                chronic, and terminal illnesses.
              </p>
            </article>

            <article className="fwf-elegant-item">
              <span className="step-number">Step 04</span>
              <h3>Retirement Optimization</h3>
              <p>
                Execute 401(k) Rollovers and utilize Fixed Indexed Annuities for
                Guaranteed Retirement Income.
              </p>
            </article>

            <article className="fwf-elegant-item">
              <span className="step-number">Step 05</span>
              <h3>Tax-Free Wealth Building</h3>
              <p>
                Leverage Cash Value Life Insurance (IULs) for tax-advantaged
                savings and Children&apos;s Investment Accounts.
              </p>
            </article>

            <article className="fwf-elegant-item">
              <span className="step-number">Step 06</span>
              <h3>Business Financial Safety</h3>
              <p>
                Implement Key Person Insurance and Executive Bonus Plans to
                protect and reward top talent.
              </p>
            </article>

            <article className="fwf-elegant-item">
              <span className="step-number">Step 07</span>
              <h3>Estate & Legacy Planning</h3>
              <p>
                Avoid probate through proper Trusts and Wills guidance, ensuring
                seamless Wealth Transfer Strategies.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section id="stories" className="stories container fade-in">
        <h2 className="text-center" style={{ fontSize: "2.8rem", marginBottom: "1rem" }}>
          Proven Financial Transformations
        </h2>
        <p
          className="text-center text-muted"
          style={{ maxWidth: "600px", margin: "0 auto 3rem", fontSize: "1.1rem" }}
        >
          Financial success isn&apos;t theoretical. Here is how we&apos;ve implemented
          these exact strategies to secure families&apos; futures.
        </p>

        <div className="card-grid">
          <article className="card story-card">
            <h4>Overwhelming Debt Eliminated</h4>
            <p className="story" style={{ fontStyle: "italic", color: "var(--text-muted)", marginBottom: "1.5rem", fontSize: "1.05rem", lineHeight: "1.6" }}>
              &quot;I worked with a young couple drowning in $60,000 of credit card
              and personal loan debt. Within 18 months, they had paid off over
              half their debt and were saving for their first home.&quot;
            </p>
            <p className="solution" style={{ fontWeight: 600, fontSize: "0.95rem", color: "var(--text-main)" }}>
              <span className="text-gold">Solution:</span> Customized Debt
              Elimination Strategies & Cash Flow Analysis.
            </p>
          </article>

          <article className="card story-card">
            <h4>Unmanaged Pension Rollovers</h4>
            <p className="story" style={{ fontStyle: "italic", color: "var(--text-muted)", marginBottom: "1.5rem", fontSize: "1.05rem", lineHeight: "1.6" }}>
              &quot;A 34-year-old federal employee rolled a previous TSP into a
              Fixed Indexed Annuity. This simplified his retirement planning and
              increased his projected retirement income by thousands.&quot;
            </p>
            <p className="solution" style={{ fontWeight: 600, fontSize: "0.95rem", color: "var(--text-main)" }}>
              <span className="text-gold">Solution:</span> 401(k) Rollovers &
              Fixed Indexed Annuities for market-linked growth with zero downside
              risk.
            </p>
          </article>

          <article className="card story-card">
            <h4>Protection During Illness</h4>
            <p className="story" style={{ fontStyle: "italic", color: "var(--text-muted)", marginBottom: "1.5rem", fontSize: "1.05rem", lineHeight: "1.6" }}>
              &quot;A father discovered his employer life insurance wasn&apos;t enough.
              We set up a policy with living benefits. A year later, a cancer
              diagnosis triggered payouts that covered treatment costs.&quot;
            </p>
            <p className="solution" style={{ fontWeight: 600, fontSize: "0.95rem", color: "var(--text-main)" }}>
              <span className="text-gold">Solution:</span> Term Life Insurance
              with Critical Illness Coverage.
            </p>
          </article>

          <article className="card story-card">
            <h4>Avoiding Probate & Family Disputes</h4>
            <p className="story" style={{ fontStyle: "italic", color: "var(--text-muted)", marginBottom: "1.5rem", fontSize: "1.05rem", lineHeight: "1.6" }}>
              &quot;A blended family came to me unsure how to divide assets. We
              connected them with an estate attorney to coordinate trusts and
              wils. Now their legacy is protected, and potential disputes have
              been avoided.&quot;
            </p>
            <p className="solution" style={{ fontWeight: 600, fontSize: "0.95rem", color: "var(--text-main)" }}>
              <span className="text-gold">Solution:</span> Estate Planning
              Strategies, Trusts, and Wills Guidance.
            </p>
          </article>

          <article className="card story-card">
            <h4>Business Exit & Retention Strategy</h4>
            <p className="story" style={{ fontStyle: "italic", color: "var(--text-muted)", marginBottom: "1.5rem", fontSize: "1.05rem", lineHeight: "1.6" }}>
              &quot;A small business owner wanted to reward his top employee. I
              helped implement a key person insurance policy and an executive
              bonus plan, which added significant value to the business&apos;s
              financial structure.&quot;
            </p>
            <p className="solution" style={{ fontWeight: 600, fontSize: "0.95rem", color: "var(--text-main)" }}>
              <span className="text-gold">Solution:</span> Key Person Insurance
              & Executive Bonus Plans.
            </p>
          </article>

          <article className="card story-card">
            <h4>Generational Wealth Transfer</h4>
            <p className="story" style={{ fontStyle: "italic", color: "var(--text-muted)", marginBottom: "1.5rem", fontSize: "1.05rem", lineHeight: "1.6" }}>
              &quot;A widow in her 60s wanted to leave a legacy. I helped her set up
              a permanent life insurance policy. Not only is she growing her money
              tax-free, but she knows her grandkids will be financially
              supported.&quot;
            </p>
            <p className="solution" style={{ fontWeight: 600, fontSize: "0.95rem", color: "var(--text-main)" }}>
              <span className="text-gold">Solution:</span> Permanent Life
              Insurance with Cash Value & Legacy Planning.
            </p>
          </article>
        </div>
      </section>

      <section id="services" className="services fade-in text-section" style={{ background: "var(--bg-card)" }}>
        <div className="container">
          <h2 className="text-center" style={{ fontSize: "2.8rem" }}>
            Comprehensive Financial Expertise
          </h2>
          <p
            className="text-center text-muted"
            style={{ maxWidth: "700px", margin: "1rem auto 4rem", fontSize: "1.1rem" }}
          >
            We architect customized strategies across every pillar of wealth
            generation, ensuring no gaps in your financial fortress.
          </p>

          <div className="services-wrapper">
            <div className="service-category">
              <h3>Retirement & Savings</h3>
              <ul>
                <li>Retirement Planning</li>
                <li>Pension Management</li>
                <li>401(k) Rollovers</li>
                <li>Fixed Indexed Annuities</li>
                <li>Guaranteed Retirement Income</li>
                <li>Supplemental Retirement Income Planning</li>
              </ul>
            </div>
            <div className="service-category">
              <h3>Insurance & Protection</h3>
              <ul>
                <li>Life Insurance Policies</li>
                <li>Term Life Insurance</li>
                <li>Permanent Life Insurance</li>
                <li>Critical Illness Coverage</li>
                <li>Chronic & Terminal Illness Coverage</li>
                <li>Mortgage Protection Insurance</li>
              </ul>
            </div>
            <div className="service-category">
              <h3>Legacy & Family</h3>
              <ul>
                <li>Estate Planning</li>
                <li>Legacy Planning</li>
                <li>Trusts and Wills Guidance</li>
                <li>Children&apos;s Investment Accounts</li>
                <li>Children&apos;s Savings Accounts</li>
                <li>Wealth Transfer Strategies</li>
              </ul>
            </div>
            <div className="service-category">
              <h3>Business & Cash Flow</h3>
              <ul>
                <li>Business Financial Safety Nets</li>
                <li>Key Person Insurance</li>
                <li>Executive Bonus Plans</li>
                <li>Debt Elimination Strategies</li>
                <li>Budgeting and Cash Flow Analysis</li>
                <li>Emergency Fund Planning</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="lead-gen fade-in">
        <div className="container">
          <h2 className="text-center" style={{ fontSize: "3.2rem", color: "var(--text-main)" }}>
            Ready to Build Your Fortress?
          </h2>
          <p
            className="text-center"
            style={{
              color: "var(--text-muted)",
              fontSize: "1.2rem",
              marginTop: "1rem",
              maxWidth: "600px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Fill out the form below so we can get started on tailored solutions
            for your family or business.
          </p>

          <div className="form-wrapper">
            <form onSubmit={handleSubmit}>
              <input type="text" name="Full Name" placeholder="Full Name" required disabled={isSubmitting} />
              <input type="email" name="email" placeholder="Email Address" required disabled={isSubmitting} />
              <input type="tel" name="phone" placeholder="Phone Number" required disabled={isSubmitting} />

              <select name="Primary Goal" required style={{ color: "var(--text-muted)" }} disabled={isSubmitting}>
                <option value="" disabled selected>
                  What is your primary financial goal?
                </option>
                <option value="retirement">Retirement Planning & 401(k) Rollovers</option>
                <option value="insurance">Life Insurance & Living Benefits</option>
                <option value="estate">Estate Planning, Trusts & Wills</option>
                <option value="debt">Debt Elimination & Cash Flow Analysis</option>
                <option value="business">Business Exit & Executive Bonus Plans</option>
                <option value="children">Children&apos;s Investment & Savings Accounts</option>
              </select>

              <textarea name="Notes" rows="5" placeholder="Briefly describe your current financial priorities..." disabled={isSubmitting}></textarea>

              <div style={{ marginBottom: "1.5rem", textAlign: "left" }}>
                <label style={{ display: "block", color: "var(--text-muted)", fontSize: "0.95rem", marginBottom: "0.5rem" }}>
                  Attach Work Order or Image (Optional)
                </label>
                <input 
                  type="file" 
                  name="attachment" 
                  accept="image/*, application/pdf"
                  style={{ 
                    color: "var(--text-main)", 
                    background: "transparent", 
                    border: "1px dashed var(--border-light)", 
                    padding: "12px", 
                    width: "100%", 
                    borderRadius: "4px" 
                  }}
                  disabled={isSubmitting}
                />
              </div>

              <button type="submit" className="btn-gold btn-pulse" style={{ width: "100%" }} disabled={isSubmitting}>
                {isSubmitting ? "Submitting securely..." : "Request Complimentary Strategy Session"}
              </button>
            </form>
          </div>

          <p
            className="text-center"
            style={{
              marginTop: "6rem",
              fontFamily: "var(--font-heading)",
              fontStyle: "italic",
              fontSize: "1.6rem",
              color: "var(--text-main)",
              maxWidth: "800px",
              marginLeft: "auto",
              marginRight: "auto",
              lineHeight: "1.4",
            }}
          >
            &quot;But those who hope in the Lord will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint.&quot; <br />
            <span
              style={{
                fontSize: "0.9rem",
                color: "var(--gold)",
                display: "block",
                marginTop: "1rem",
                fontFamily: "var(--font-body)",
                fontStyle: "normal",
                textTransform: "uppercase",
                letterSpacing: "3px",
                fontWeight: 600,
              }}
            >
              – Isaiah 40:31
            </span>
          </p>
        </div>
      </section>
    </>
  );
}