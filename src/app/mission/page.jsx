"use client";

import { useEffect } from "react";
import GlobalLeadForm from "@/components/GlobalLeadForm";

export default function Mission() {
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

  return (
    <>
      {/* --- SEO METADATA --- */}
      <title>Our Mission | Financial Education & Consulting Los Angeles</title>
      <meta name="description" content="Legacy in Motion is dedicated to eliminating financial illiteracy. We empower families and business owners in Los Angeles and the SGV with expert financial education." />
      <meta name="keywords" content="Financial education Los Angeles, Financial literacy SGV, Become a financial advisor Los Angeles, Financial planning underserved communities, Legacy in Motion mission" />
      {/* -------------------- */}

      <header className="hero fade-in" style={{ padding: "14rem 0 8rem 0" }}>
        <div className="container">
          <h1 style={{ fontSize: "3.8rem", maxWidth: "900px", margin: "0 auto 1.5rem" }}>
            Empowering Families and Business Owners Through Financial Education.
          </h1>
          <p style={{ fontSize: "1.2rem", maxWidth: "700px", margin: "0 auto 2.5rem" }}>
            Our mission is to eliminate financial illiteracy by helping American
            families and entrepreneurs gain the knowledge and strategies they need
            to take control of their financial future.
          </p>
          <div className="hero-buttons">
            <a href="#consultation" className="btn-gold btn-pulse">
              Start Your Financial Journey
            </a>
            <a href="#consultation" className="btn-outline">
              Book a Free Consultation
            </a>
          </div>
        </div>
      </header>

      <section className="text-section fade-in" style={{ background: "var(--bg-page)" }}>
        <div className="container content-wrapper">
          <h2 className="text-center" style={{ fontSize: "2.8rem", marginBottom: "2rem" }}>Our Mission</h2>
          <p style={{ fontSize: "1.1rem", marginBottom: "1.5rem", color: "var(--text-main)" }}>
            Financial illiteracy is one of the greatest economic challenges in
            the world, affecting billions of people. Our mission is to empower
            American families and business owners with the financial education and
            tools they need to make confident decisions about their money.
          </p>
          <p style={{ fontSize: "1.1rem", marginBottom: "1.5rem", color: "var(--text-main)" }}>
            We are especially passionate about reaching underserved communities
            and helping people break the cycle of debt, poor financial habits,
            and lack of financial knowledge. We believe every family deserves
            access to financial guidance and opportunity—no family is too big or
            too small for us to serve.
          </p>
          <p style={{ fontSize: "1.1rem", marginBottom: "2rem", color: "var(--text-main)" }}>
            As we grow, we are also committed to developing leaders who share
            this mission and are dedicated to bringing financial education to
            more communities across the country.
          </p>

          <div className="mission-highlight" style={{ background: "var(--bg-card)", borderLeft: "4px solid var(--gold)", padding: "2.5rem", borderRadius: "0 12px 12px 0", marginTop: "3rem", boxShadow: "var(--shadow-sm)" }}>
            <h3 style={{ fontSize: "1.8rem", marginBottom: "1rem", color: "var(--gold)" }}>Why This Matters</h3>
            <p style={{ fontSize: "1.05rem", marginBottom: "1rem", color: "var(--text-muted)" }}>
              Many families and business owners were never taught how money truly
              works. Schools rarely teach financial education, leaving people to
              navigate important financial decisions on their own. As a result,
              many hardworking people face challenges such as overwhelming debt,
              lack of savings, limited financial protection, and uncertainty
              about their financial future.
            </p>
            <p style={{ fontSize: "1.05rem", marginBottom: "1rem", color: "var(--text-muted)" }}>
              We believe financial education should be accessible to everyone.
              When people understand how money works, they are empowered to make
              smarter decisions, build stronger financial foundations, and create
              opportunities for future generations.
            </p>
            <p style={{ fontSize: "1.1rem", marginTop: "1.5rem", color: "var(--text-main)" }}>
              <strong>
                Our goal is to provide the knowledge, guidance, and support
                needed to help families and business owners move from financial
                uncertainty to financial confidence.
              </strong>
            </p>
          </div>
        </div>
      </section>

      <section className="fade-in" style={{ padding: "4rem 0 6rem 0", background: "var(--bg-page)" }}>
        <div className="container">
          <div className="card-grid">
            <div className="card info-box">
              <h3 style={{ fontSize: "1.8rem", color: "var(--gold)", marginBottom: "1.5rem", borderBottom: "1px solid var(--border-light)", paddingBottom: "0.5rem" }}>
                Who We Help
              </h3>
              <ul style={{ paddingLeft: "1.5rem", color: "var(--text-muted)", fontSize: "1.05rem", lineHeight: "1.8" }}>
                <li style={{ marginBottom: "0.5rem", listStyleType: "disc" }}>Families looking to build a stronger financial future</li>
                <li style={{ marginBottom: "0.5rem", listStyleType: "disc" }}>Entrepreneurs and business owners seeking smarter financial strategies</li>
                <li style={{ marginBottom: "0.5rem", listStyleType: "disc" }}>Individuals who want to improve their financial knowledge</li>
                <li style={{ marginBottom: "0.5rem", listStyleType: "disc" }}>Underserved communities that have been overlooked by traditional financial systems</li>
              </ul>
              <p style={{ marginTop: "1.5rem", fontStyle: "italic", color: "var(--text-main)", fontSize: "0.95rem", fontWeight: 500 }}>
                Our goal is to make financial education and tools accessible to everyone.
              </p>
            </div>

            <div className="card info-box">
              <h3 style={{ fontSize: "1.8rem", color: "var(--gold)", marginBottom: "1.5rem", borderBottom: "1px solid var(--border-light)", paddingBottom: "0.5rem" }}>
                How We Help
              </h3>
              <ul style={{ paddingLeft: "1.5rem", color: "var(--text-muted)", fontSize: "1.05rem", lineHeight: "1.8" }}>
                <li style={{ marginBottom: "0.5rem", listStyleType: "disc" }}>Understand how money really works</li>
                <li style={{ marginBottom: "0.5rem", listStyleType: "disc" }}>Build better financial habits</li>
                <li style={{ marginBottom: "0.5rem", listStyleType: "disc" }}>Reduce and eliminate debt</li>
                <li style={{ marginBottom: "0.5rem", listStyleType: "disc" }}>Protect their income and assets</li>
                <li style={{ marginBottom: "0.5rem", listStyleType: "disc" }}>Create long-term financial strategies</li>
              </ul>
              <p style={{ marginTop: "1.5rem", fontStyle: "italic", color: "var(--text-main)", fontSize: "0.95rem", fontWeight: 500 }}>
                Our approach focuses on education first—because informed decisions create stronger financial futures.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="text-section fade-in" style={{ background: "var(--bg-card)", borderTop: "1px solid var(--border-light)" }}>
        <div className="container content-wrapper text-center">
          <h2 style={{ fontSize: "2.8rem", marginBottom: "1.5rem" }}>Leadership & Impact</h2>
          <p style={{ fontSize: "1.1rem", color: "var(--text-muted)" }}>
            Our mission goes beyond education. We are building a community of
            leaders who are passionate about sharing financial knowledge and
            empowering others. By developing leaders who believe in this
            mission, we can expand our reach and impact more families,
            businesses, and communities across the country.
          </p>

          <h2 style={{ fontSize: "2.8rem", marginTop: "4rem", marginBottom: "1.5rem" }}>Join the Mission</h2>
          <p style={{ fontSize: "1.1rem", color: "var(--text-muted)", marginBottom: "1rem" }}>
            We believe real change happens when people come together with a
            shared purpose. We are always looking for passionate individuals who
            want to make a difference by helping families and communities gain
            access to financial education.
          </p>
          <p style={{ fontSize: "1.1rem", color: "var(--text-muted)" }}>
            Whether you want to grow as a leader, serve your community, or help
            others build a better financial future, there is a place for you in
            this mission. Together, we can expand financial education and empower
            more families across the nation.
          </p>
          <div style={{ marginTop: "3rem" }}>
            <a href="#consultation" className="btn-outline">
              Learn More About Joining Our Team
            </a>
          </div>
        </div>
      </section>

      {/* --- ENTERPRISE GLOBAL FORM INJECTION --- */}
      <GlobalLeadForm 
        title="Your Financial Future Starts Today" 
        subtitle="Whether you're a family looking for guidance, a business owner seeking better strategies, or a leader wanting to join our team, we are here to help."
        sourcePage="Mission & Recruitment Page"
        dropdownOptions={[
          "Book a Free Consultation",
          "Learn More About Joining the Team",
          "Financial Education / Workshops",
          "Other Inquiry"
        ]}
      />
    </>
  );
}