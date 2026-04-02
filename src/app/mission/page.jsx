"use client";

import { useEffect } from "react";

export default function Mission() {
  // Re-implementing your smooth fade-in scroll animation
  useEffect(() => {
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
      <header className="hero fade-in">
        <div className="container">
          <h1>Empowering Families and Business Owners Through Financial Education.</h1>
          <p>
            Our mission is to eliminate financial illiteracy by helping American
            families and entrepreneurs gain the knowledge and strategies they need
            to take control of their financial future.
          </p>
          <div className="hero-buttons">
            <a href="#contact" className="btn-gold btn-pulse">
              Start Your Financial Journey
            </a>
            <a href="#contact" className="btn-outline">
              Book a Free Consultation
            </a>
          </div>
        </div>
      </header>

      <section className="text-section fade-in">
        <div className="container content-wrapper">
          <h2 className="text-center">Our Mission</h2>
          <p>
            Financial illiteracy is one of the greatest economic challenges in
            the world, affecting billions of people. Our mission is to empower
            American families and business owners with the financial education and
            tools they need to make confident decisions about their money.
          </p>
          <p>
            We are especially passionate about reaching underserved communities
            and helping people break the cycle of debt, poor financial habits,
            and lack of financial knowledge. We believe every family deserves
            access to financial guidance and opportunity—no family is too big or
            too small for us to serve.
          </p>
          <p>
            As we grow, we are also committed to developing leaders who share
            this mission and are dedicated to bringing financial education to
            more communities across the country.
          </p>

          <div className="mission-highlight">
            <h3 style={{ fontSize: "1.8rem", marginBottom: "1rem" }}>Why This Matters</h3>
            <p style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>
              Many families and business owners were never taught how money truly
              works. Schools rarely teach financial education, leaving people to
              navigate important financial decisions on their own. As a result,
              many hardworking people face challenges such as overwhelming debt,
              lack of savings, limited financial protection, and uncertainty
              about their financial future.
            </p>
            <p style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>
              We believe financial education should be accessible to everyone.
              When people understand how money works, they are empowered to make
              smarter decisions, build stronger financial foundations, and create
              opportunities for future generations.
            </p>
            <p style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>
              <strong>
                Our goal is to provide the knowledge, guidance, and support
                needed to help families and business owners move from financial
                uncertainty to financial confidence.
              </strong>
            </p>
          </div>
        </div>
      </section>

      <section className="fade-in" style={{ paddingBottom: "6rem" }}>
        <div className="container">
          <div className="card-grid">
            <div className="card info-box">
              <h3
                style={{
                  fontSize: "1.8rem",
                  color: "var(--gold)",
                  marginBottom: "1.5rem",
                  borderBottom: "1px solid var(--border-light)",
                  paddingBottom: "0.5rem",
                }}
              >
                Who We Help
              </h3>
              <ul>
                <li>Families looking to build a stronger financial future</li>
                <li>Entrepreneurs and business owners seeking smarter financial strategies</li>
                <li>Individuals who want to improve their financial knowledge</li>
                <li>Underserved communities that have been overlooked by traditional financial systems</li>
              </ul>
              <p
                style={{
                  marginTop: "1.5rem",
                  fontStyle: "italic",
                  color: "var(--text-muted)",
                  fontSize: "0.95rem",
                }}
              >
                Our goal is to make financial education and tools accessible to everyone.
              </p>
            </div>

            <div className="card info-box">
              <h3
                style={{
                  fontSize: "1.8rem",
                  color: "var(--gold)",
                  marginBottom: "1.5rem",
                  borderBottom: "1px solid var(--border-light)",
                  paddingBottom: "0.5rem",
                }}
              >
                How We Help
              </h3>
              <ul>
                <li>Understand how money really works</li>
                <li>Build better financial habits</li>
                <li>Reduce and eliminate debt</li>
                <li>Protect their income and assets</li>
                <li>Create long-term financial strategies</li>
              </ul>
              <p
                style={{
                  marginTop: "1.5rem",
                  fontStyle: "italic",
                  color: "var(--text-muted)",
                  fontSize: "0.95rem",
                }}
              >
                Our approach focuses on education first—because informed decisions create stronger financial futures.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        className="text-section fade-in"
        style={{
          background: "var(--bg-card)",
          borderTop: "1px solid var(--border-light)",
        }}
      >
        <div className="container content-wrapper text-center">
          <h2>Leadership & Impact</h2>
          <p>
            Our mission goes beyond education. We are building a community of
            leaders who are passionate about sharing financial knowledge and
            empowering others. By developing leaders who believe in this
            mission, we can expand our reach and impact more families,
            businesses, and communities across the country.
          </p>

          <h2 style={{ marginTop: "4rem" }}>Join the Mission</h2>
          <p>
            We believe real change happens when people come together with a
            shared purpose. We are always looking for passionate individuals who
            want to make a difference by helping families and communities gain
            access to financial education.
          </p>
          <p>
            Whether you want to grow as a leader, serve your community, or help
            others build a better financial future, there is a place for you in
            this mission. Together, we can expand financial education and empower
            more families across the nation.
          </p>
          <div style={{ marginTop: "3rem" }}>
            <a href="#contact" className="btn-outline">
              Learn More About Joining Our Team
            </a>
          </div>
        </div>
      </section>

      <section id="contact" className="lead-gen fade-in">
        <div className="container">
          <h2
            className="text-center"
            style={{ fontSize: "3.2rem", color: "var(--text-main)" }}
          >
            Your Financial Future Starts Today
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
            Whether you&apos;re a family looking for guidance or a business owner
            seeking better financial strategies, we are here to help. Start your
            journey toward financial empowerment today.
          </p>

          <div className="form-wrapper">
            <form action="https://formsubmit.co/workorders@hpo.center" method="POST">
              <input type="hidden" name="_subject" value="NEW LEAD: Legacy in Motion Mission Page" />
              <input type="hidden" name="_template" value="box" />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_next" value="https://legacy-in-motion.org/thanks" />
              <input type="hidden" name="_cc" value="nlaracruz@experiorfinancialgroup.com" />

              <input type="text" name="Full Name" placeholder="Full Name" required />
              <input type="email" name="email" placeholder="Email Address" required />
              <input type="tel" name="phone" placeholder="Phone Number" required />

              <select name="Inquiry Type" required style={{ color: "var(--text-muted)" }}>
                <option value="" disabled selected>How can we help you today?</option>
                <option value="consultation">Book a Free Consultation</option>
                <option value="join_team">Learn More About Joining the Team</option>
                <option value="education">Financial Education / Workshops</option>
                <option value="other">Other Inquiry</option>
              </select>

              <textarea
                name="Notes"
                rows="5"
                placeholder="Briefly describe what you are looking to achieve..."
              ></textarea>

              <button type="submit" className="btn-gold btn-pulse" style={{ width: "100%" }}>
                Start Your Financial Journey
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}