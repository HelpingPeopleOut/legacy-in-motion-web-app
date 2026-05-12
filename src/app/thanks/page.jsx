"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Thanks() {
  // Re-implementing your smooth fade-in animation
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
      {/* CRITICAL FIX: Removed illegal <title> and <meta> tags from client component to prevent React Error 418 Hydration Crash */}
      
      <section 
        className="thanks-section fade-in" 
        style={{ 
          padding: "12rem 0 8rem 0", 
          minHeight: "85vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "radial-gradient(circle at 50% 50%, rgba(212,175,55,0.06) 0%, var(--bg-page) 60%)"
        }}
      >
        <div className="container content-wrapper text-center">
          <div className="icon-sparkle" style={{ fontSize: "5rem", marginBottom: "1.5rem", animation: "float 4s ease-in-out infinite" }}>✨</div>
          
          <h1 style={{ fontSize: "3.8rem", marginBottom: "1.5rem", color: "var(--text-main)", letterSpacing: "-1px" }}>
            Inquiry Successfully Received
          </h1>
          
          <p style={{ fontSize: "1.25rem", color: "var(--text-muted)", marginBottom: "4rem", maxWidth: "650px", margin: "0 auto 4rem", lineHeight: "1.8" }}>
            Our team at <span style={{color: "var(--gold)", fontWeight: 600}}>Legacy in Motion</span> has securely received your request. We will be in touch shortly to help you build your financial fortress. In the meantime, join our community for daily financial insights.
          </p>

          <div className="card-grid" style={{ marginBottom: "5rem", maxWidth: "800px", margin: "0 auto 5rem" }}>
            <a
              href="https://www.instagram.com/nellylara_financial/"
              target="_blank"
              rel="noopener noreferrer"
              className="card"
              style={{ 
                display: "flex", 
                flexDirection: "column", 
                justifyContent: "center", 
                alignItems: "center", 
                padding: "3rem 2rem", 
                borderTop: "4px solid var(--gold)" 
              }}
            >
              <h3 style={{ fontSize: "1.8rem", marginBottom: "0.5rem", color: "var(--text-main)" }}>
                Instagram
              </h3>
              <span style={{ fontSize: "1.1rem", color: "var(--gold)", fontWeight: 600 }}>
                @nellylara_financial
              </span>
            </a>
            
            <a
              href="https://www.linkedin.com/in/nellylara/"
              target="_blank"
              rel="noopener noreferrer"
              className="card"
              style={{ 
                display: "flex", 
                flexDirection: "column", 
                justifyContent: "center", 
                alignItems: "center", 
                padding: "3rem 2rem", 
                borderTop: "4px solid var(--gold)" 
              }}
            >
              <h3 style={{ fontSize: "1.8rem", marginBottom: "0.5rem", color: "var(--text-main)" }}>
                LinkedIn
              </h3>
              <span style={{ fontSize: "1.1rem", color: "var(--gold)", fontWeight: 600 }}>
                Connect with Nelly
              </span>
            </a>
          </div>

          <Link href="/" className="btn-outline" style={{ padding: "1rem 3rem" }}>
            Return to Homepage
          </Link>
        </div>
      </section>
    </>
  );
}