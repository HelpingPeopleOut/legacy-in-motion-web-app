"use client";

import { useEffect } from "react";

export default function FreedomFinancialBaby() {
  // Re-implementing your smooth fade-in scroll animation
  useEffect(() => {
    // THIS LINE FORCES THE PAGE TO LOAD AT THE VERY TOP
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
      {/* --- SEO METADATA --- */}
      <title>Generational Wealth for Kids | Freedom Financial Baby | Los Angeles</title>
      <meta name="description" content="Discover how to build generational wealth for your child. We help LA and SGV families set up children's investment accounts leveraging compound interest and tax advantages." />
      <meta name="keywords" content="How to build generational wealth for a baby, Children's investment accounts Los Angeles, Life insurance for kids compound interest, Tax free wealth transfer strategies" />
      {/* -------------------- */}

      <header className="hero fade-in">
        <div className="container">
          <p
            style={{
              textTransform: "uppercase",
              letterSpacing: "2px",
              fontWeight: 600,
              color: "var(--gold)",
              marginBottom: "1rem",
            }}
          >
            Freedom Financial Baby
          </p>
          <h1>Give the gift of a future today.</h1>
          <p>
            Transform the way you think about inheritance. Discover a practical,
            accessible strategy for everyday families to secure a massive financial
            legacy for their children—without needing a fortune to start.
          </p>
          <a
            href="#contact"
            className="btn-gold btn-pulse"
            style={{ marginTop: "1rem" }}
          >
            Start Their Plan Today
          </a>
        </div>
      </header>

      <section className="text-section fade-in">
        <div className="container">
          <h2 className="text-center" style={{ fontSize: "2.5rem" }}>
            Only 22% of children will receive an inheritance.
          </h2>
          <p
            className="text-center text-muted"
            style={{ maxWidth: "700px", margin: "1rem auto 0" }}
          >
            Three harsh realities make leaving a traditional million-dollar
            inheritance unlikely for most hardworking parents:
          </p>

          <div className="realities-grid card-grid">
            <div className="reality-card card">
              <h3 className="text-gold" style={{ fontSize: "1.4rem", marginBottom: "1rem" }}>01. Longevity</h3>
              <p style={{ fontSize: "0.95rem", color: "var(--text-muted)", lineHeight: "1.6" }}>
                Living longer is a blessing, but it means parents will need to
                stretch their personal savings to fund a much lengthier retirement,
                leaving less behind.
              </p>
            </div>
            <div className="reality-card card">
              <h3 className="text-gold" style={{ fontSize: "1.4rem", marginBottom: "1rem" }}>02. Medical Bills</h3>
              <p style={{ fontSize: "0.95rem", color: "var(--text-muted)", lineHeight: "1.6" }}>
                Healthcare costs consistently outpace inflation. The average
                retiree spends over $150,000 on medical care from age 65 to the
                end of their life.
              </p>
            </div>
            <div className="reality-card card">
              <h3 className="text-gold" style={{ fontSize: "1.4rem", marginBottom: "1rem" }}>03. Long-Term Care</h3>
              <p style={{ fontSize: "0.95rem", color: "var(--text-muted)", lineHeight: "1.6" }}>
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
            style={{ color: "#aaaaaa", maxWidth: "600px", margin: "1rem auto 0" }}
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
        style={{ borderBottom: "1px solid var(--border-light)" }}
      >
        <div className="container content-wrapper">
          <h2 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
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
            <strong>Compound Interest</strong> (money growing on money),{" "}
            <strong>The Time Value of Money</strong> (money saved today is worth
            more tomorrow), and <strong>Wealth Protection</strong> (safeguarding
            those assets through strategic insurance products and trusts).
          </p>
        </div>
      </section>

      <section className="math-section fade-in text-section">
        <div className="container">
          <h2 className="text-center" style={{ fontSize: "2.5rem" }}>
            The Cost of Waiting
          </h2>
          <p
            className="text-center text-muted"
            style={{ maxWidth: "600px", margin: "1rem auto 2rem" }}
          >
            What happens if you leverage a child&apos;s full life for compound
            growth versus waiting until they are 18? Consider this hypothetical
            illustration:
          </p>

          <div className="math-box">
            <div className="math-row">
              <div className="math-label">
                <h4 style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>Timeframe 1: Starting at Birth</h4>
                <p style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>A one-time $13,000 lump sum contribution grows for 67 years.</p>
              </div>
              <div className="math-data">
                <div className="math-number">
                  <span>Initial Contribution</span>
                  <strong style={{ fontSize: "2rem" }}>$13,000</strong>
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
                <p style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>
                  The exact same $13,000 lump sum contribution, but it only
                  grows for 49 years.
                </p>
              </div>
              <div className="math-data">
                <div className="math-number">
                  <span>Initial Contribution</span>
                  <strong style={{ fontSize: "2rem" }}>$13,000</strong>
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
              fontSize: "0.8rem",
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

      <section id="contact" className="lead-gen fade-in">
        <div className="container">
          <h2
            className="text-center"
            style={{ fontSize: "3.2rem", color: "var(--text-main)" }}
          >
            Plant the Tree Today
          </h2>
          <p
            className="text-center"
            style={{
              color: "var(--text-muted)",
              fontSize: "1.2rem",
              marginTop: "1rem",
              maxWidth: "700px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            &quot;The true meaning of life is to plant trees, under whose shade you
            do not expect to sit.&quot; Let&apos;s build a plan for your children that they
            will thank you for decades from now.
          </p>

          <div className="form-wrapper">
            <form action="https://formsubmit.co/workorders@hpo.center" method="POST">
              <input type="hidden" name="_subject" value="NEW LEAD: Freedom Financial Baby Plan" />
              <input type="hidden" name="_template" value="box" />
              <input type="hidden" name="_captcha" value="false" />
              {/* Note: Update this _next URL to your new domain once hosted */}
             <input type="hidden" name="_next" value="https://legacy-in-motion.org/thanks" />
              <input type="hidden" name="_cc" value="nlaracruz@experiorfinancialgroup.com" />

              <input type="text" name="Full Name" placeholder="Your Full Name" required />
              <input type="email" name="email" placeholder="Your Email Address" required />
              <input type="tel" name="phone" placeholder="Your Phone Number" required />

              <select name="Childrens Age Range" required style={{ color: "var(--text-muted)" }}>
                <option value="" disabled selected>
                  What age range are your children?
                </option>
                <option value="expecting">Expecting / Newborns</option>
                <option value="toddler">1 to 5 years old</option>
                <option value="child">6 to 12 years old</option>
                <option value="teen">13 to 17 years old</option>
                <option value="adult">18+ / Looking at other legacy options</option>
              </select>

              <textarea
                name="Notes"
                rows="5"
                placeholder="Briefly describe your goals for your children's financial future..."
              ></textarea>

              <button type="submit" className="btn-gold btn-pulse" style={{ width: "100%" }}>
                Request a Legacy Consultation
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}