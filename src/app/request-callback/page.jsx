"use client";

import { useEffect } from "react";
import Link from "next/link";
import GlobalLeadForm from "@/components/GlobalLeadForm";
import { BUSINESS } from "@/lib/business";

export default function RequestCallbackPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <section className="hero" style={{ padding: "10rem 0 3rem 0", background: "var(--bg-card)" }}>
        <div className="container text-center">
          <p className="hero-eyebrow">Legacy in Motion · Free Strategy Session</p>
          <h1 style={{ fontSize: "clamp(2.2rem, 5vw, 3.4rem)", marginBottom: "1rem" }}>
            Request a Free Financial Strategy Consultation
          </h1>
          <p style={{ fontSize: "1.15rem", maxWidth: "640px", margin: "0 auto 1.5rem", color: "var(--text-muted)" }}>
            Talk with Nelly Lara about retirement, living benefits, estate planning, debt, or business strategies —
            bilingual English &amp; Spanish. Pasadena HQ with nationwide virtual sessions.
          </p>
          <p style={{ marginBottom: "0.5rem" }}>
            <a href={`tel:${BUSINESS.phone.replace(/\D/g, "")}`} className="btn-outline">
              Call {BUSINESS.phoneDisplay}
            </a>
          </p>
        </div>
      </section>

      <section style={{ background: "var(--bg-page)", paddingTop: "2rem", paddingBottom: "2rem" }}>
        <GlobalLeadForm
          title="Book your free callback"
          subtitle="Share a few details and our team will reach out within one business day — no product pressure."
          sourcePage="Request Callback / Contact"
          dropdownOptions={[
            "General Consultation",
            "Retirement & 401(k) Rollovers",
            "Life Insurance & Living Benefits",
            "Estate Planning & Trusts",
            "Debt Elimination Strategy",
            "Business Owner Strategies",
          ]}
        />
      </section>

      <section className="fade-in" style={{ background: "var(--bg-card)", padding: "4rem 0 6rem" }}>
        <div className="container text-center">
          <h2 style={{ fontSize: "1.75rem", marginBottom: "1rem" }}>Prefer the toolbox on your phone?</h2>
          <p style={{ color: "var(--text-muted)", maxWidth: "560px", margin: "0 auto 1.5rem" }}>
            Install Legacy in Motion as an app for calculators and client tools — optional, and separate from your consultation.
          </p>
          <div className="comp-grid" style={{ marginTop: "0" }}>
            <div className="comp-card" style={{ background: "var(--bg-page)", border: "1px solid var(--border-light)", boxShadow: "var(--shadow-sm)" }}>
              <h3 style={{ color: "var(--text-main)", marginBottom: "1rem" }}>iPhone &amp; iPad (Safari)</h3>
              <p style={{ color: "var(--text-muted)", fontSize: "1.05rem", lineHeight: "1.6", textAlign: "left", display: "inline-block" }}>
                1. Open this site in <strong>Safari</strong>.<br />
                2. Tap <strong>Share</strong>, then <strong>Add to Home Screen</strong>.<br />
                3. Tap <strong>Add</strong>.
              </p>
            </div>
            <div className="comp-card" style={{ background: "var(--bg-page)", border: "1px solid var(--border-light)", boxShadow: "var(--shadow-sm)" }}>
              <h3 style={{ color: "var(--text-main)", marginBottom: "1rem" }}>Android (Chrome)</h3>
              <p style={{ color: "var(--text-muted)", fontSize: "1.05rem", lineHeight: "1.6", textAlign: "left", display: "inline-block" }}>
                1. Open this site in <strong>Chrome</strong>.<br />
                2. Tap <strong>Menu</strong> → <strong>Install app</strong> or <strong>Add to Home screen</strong>.<br />
                3. Confirm the install.
              </p>
            </div>
          </div>
          <p style={{ marginTop: "2rem" }}>
            <Link href="/toolbox" className="btn-outline">Open toolbox →</Link>
          </p>
        </div>
      </section>
    </>
  );
}
