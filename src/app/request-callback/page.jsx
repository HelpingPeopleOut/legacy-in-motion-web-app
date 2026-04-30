"use client";

import { useEffect } from "react";
import GlobalLeadForm from "@/components/GlobalLeadForm";

export default function RequestCallbackPage() {
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
      <title>Request a Callback & Install App | Legacy in Motion</title>
      <meta name="description" content="Request a free financial strategy consultation and learn how to install the Legacy in Motion app directly to your phone." />

      {/* HERO SECTION */}
      <section className="hero fade-in" style={{ padding: "12rem 0 6rem 0", background: "var(--bg-card)" }}>
        <div className="container text-center">
          <h1 style={{ fontSize: "3.5rem", marginBottom: "1rem" }}>
            Let's Build Your <span className="text-gold">Legacy.</span>
          </h1>
          <p style={{ fontSize: "1.2rem", maxWidth: "600px", margin: "0 auto", color: "var(--text-muted)" }}>
            Request a callback below to speak directly with an expert, or install our app to keep our financial tools in your pocket.
          </p>
        </div>
      </section>

      {/* THE APP SCRIPT CRM FORM */}
      <div className="fade-in" style={{ marginTop: "-4rem" }}>
        <GlobalLeadForm 
          title="Schedule Your Free Strategy Session"
          subtitle="Our team will review your request and call you back within 24 hours to begin your financial blueprint."
          sourcePage="Request Callback Portal"
          dropdownOptions={[
            "General Consultation",
            "Retirement & 401(k) Rollovers",
            "Life Insurance & Living Benefits",
            "Estate Planning & Trusts",
            "Debt Elimination Strategy"
          ]}
        />
      </div>

      {/* APP INSTALLATION INSTRUCTIONS */}
      <section className="fade-in" style={{ background: "var(--bg-page)", padding: "6rem 0" }}>
        <div className="container text-center">
          <h2 style={{ fontSize: "2.5rem", marginBottom: "3rem" }}>How to Install Our App</h2>
          
          <div className="comp-grid">
            {/* Apple / iOS Instructions */}
            <div className="comp-card" style={{ background: "var(--bg-card)", border: "1px solid var(--border-light)" }}>
              <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>🍎</div>
              <h3 style={{ color: "var(--text-main)", marginBottom: "1rem" }}>iPhone & iPad (Safari)</h3>
              <p style={{ color: "var(--text-muted)", fontSize: "1.05rem", lineHeight: "1.6" }}>
                1. Open this website in the <strong>Safari</strong> browser.<br />
                2. Tap the <strong>Share</strong> icon (the square with an arrow pointing up) at the bottom of the screen.<br />
                3. Scroll down the menu and tap <strong>"Add to Home Screen"</strong>.<br />
                4. Tap <strong>Add</strong> in the top right corner.
              </p>
            </div>

            {/* Android Instructions */}
            <div className="comp-card" style={{ background: "var(--bg-card)", border: "1px solid var(--border-light)" }}>
              <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>🤖</div>
              <h3 style={{ color: "var(--text-main)", marginBottom: "1rem" }}>Android (Chrome)</h3>
              <p style={{ color: "var(--text-muted)", fontSize: "1.05rem", lineHeight: "1.6" }}>
                1. Open this website in the <strong>Chrome</strong> browser.<br />
                2. Tap the <strong>Menu</strong> icon (three dots) in the top right corner of the screen.<br />
                3. Tap <strong>"Install app"</strong> or <strong>"Add to Home screen"</strong>.<br />
                4. Follow the prompt to add the icon to your phone.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}