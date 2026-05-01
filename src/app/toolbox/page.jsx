"use client";

import { useEffect } from "react";
import ProgressTracker from "@/components/ProgressTracker";
import WealthCalculator from "@/components/WealthCalculator";
import Link from "next/link";

export default function ToolboxDashboard() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <title>Client Toolbox | Legacy in Motion</title>
      
      {/* Sleek App-Like Header */}
      <section style={{ paddingTop: "8rem", paddingBottom: "3rem", background: "var(--bg-dark)", color: "#fff", textAlign: "center" }}>
        <div className="container">
          <h1 style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>Client Toolbox</h1>
          <p style={{ color: "#a0a0a0", fontSize: "1.1rem" }}>Your secure portal for strategy tracking and financial projections.</p>
        </div>
      </section>

      {/* Main Dashboard Grid */}
      <section style={{ padding: "4rem 0", background: "var(--bg-page)", minHeight: "60vh" }}>
        <div className="container" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "3rem" }}>
          
          {/* Left Column: Progress Tracker */}
          <div>
            <ProgressTracker />
          </div>

          {/* Right Column: Utilities & Calculator */}
          <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
            
            {/* Quick Actions Panel */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <Link href="/request-callback" style={quickActionStyle}>
                <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>📅</div>
                <div style={{ fontWeight: 600 }}>Schedule Call</div>
              </Link>
              <a href="tel:626-203-7652" style={quickActionStyle}>
                <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>📞</div>
                <div style={{ fontWeight: 600 }}>Direct Line</div>
              </a>
            </div>

            {/* The Wealth Calculator we built previously */}
            <div style={{ width: "100%" }}>
              <h3 style={{ fontSize: "1.5rem", marginBottom: "1.5rem" }}>Projections</h3>
              <WealthCalculator />
            </div>

          </div>

        </div>
      </section>
    </>
  );
}

const quickActionStyle = {
  background: "var(--bg-card)",
  border: "1px solid var(--border-light)",
  padding: "1.5rem 1rem",
  borderRadius: "12px",
  textAlign: "center",
  color: "var(--text-main)",
  textDecoration: "none",
  boxShadow: "var(--shadow-sm)",
  transition: "transform 0.2s, box-shadow 0.2s"
};