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
      <title>Install App & Request Callback | Legacy in Motion</title>
      <meta name="description" content="Install the Legacy in Motion web app for exclusive tools, or request a callback from our experts." />

      {/* HERO SECTION - FOCUSED ON APP */}
      <section className="hero fade-in" style={{ padding: "10rem 0 4rem 0", background: "var(--bg-card)" }}>
        <div className="container text-center">
          <h1 style={{ fontSize: "3.5rem", marginBottom: "1rem" }}>
            Your Financial Fortress, <br/><span className="text-gold">In Your Pocket.</span>
          </h1>
          <p style={{ fontSize: "1.2rem", maxWidth: "600px", margin: "0 auto", color: "var(--text-muted)" }}>
            Install the Legacy in Motion app to access our financial tools instantly, or request a callback from our team below.
          </p>
        </div>
      </section>

      {/* APP INSTALLATION INSTRUCTIONS - MOVED TO TOP */}
      <section className="fade-in" style={{ background: "var(--bg-card)", paddingBottom: "6rem" }}>
        <div className="container text-center">
          <div className="comp-grid" style={{ marginTop: "0" }}>
            {/* Apple / iOS Instructions */}
            <div className="comp-card" style={{ background: "var(--bg-page)", border: "1px solid var(--border-light)", boxShadow: "var(--shadow-sm)" }}>
              <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>🍎</div>
              <h3 style={{ color: "var(--text-main)", marginBottom: "1rem" }}>iPhone & iPad (Safari)</h3>
              <p style={{ color: "var(--text-muted)", fontSize: "1.05rem", lineHeight: "1.6", textAlign: "left", display: "inline-block" }}>
                1. Open this page in the <strong>Safari</strong> browser.<br />
                2. Tap the <strong>Share</strong> icon (square with an arrow) at the bottom.<br />
                3. Scroll down and tap <strong>"Add to Home Screen"</strong>.<br />
                4. Tap <strong>Add</strong> in the top right corner.
              </p>
            </div>

            {/* Android Instructions */}
            <div className="comp-card" style={{ background: "var(--bg-page)", border: "1px solid var(--border-light)", boxShadow: "var(--shadow-sm)" }}>
              <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>🤖</div>
              <h3 style={{ color: "var(--text-main)", marginBottom: "1rem" }}>Android (Chrome)</h3>
              <p style={{ color: "var(--text-muted)", fontSize: "1.05rem", lineHeight: "1.6", textAlign: "left", display: "inline-block" }}>
                1. Open this page in the <strong>Chrome</strong> browser.<br />
                2. Tap the <strong>Menu</strong> icon (three dots) top right.<br />
                3. Tap <strong>"Install app"</strong> or <strong>"Add to Home screen"</strong>.<br />
                4. Follow the prompt to add the icon to your phone.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* THE APP SCRIPT CRM FORM - SECONDARY OPTION */}
      <section className="fade-in" style={{ background: "var(--bg-page)", paddingTop: "4rem", paddingBottom: "2rem" }}>
        <GlobalLeadForm 
          title="Prefer to speak right away?"
          subtitle="Request a callback below and our team will reach out within 24 hours."
          sourcePage="App Install / Callback Portal"
          dropdownOptions={[
            "General Consultation",
            "Retirement & 401(k) Rollovers",
            "Life Insurance & Living Benefits",
            "Estate Planning & Trusts",
            "Debt Elimination Strategy"
          ]}
        />
      </section>
    </>
  );
}