"use client";

import { useEffect } from "react";
import WealthCalculator from "@/components/WealthCalculator";
import ProgressTracker from "@/components/ProgressTracker";
import RuleOf72 from "@/components/RuleOf72";
import DIMECalculator from "@/components/DIMECalculator";
import DebtFreedomVisualizer from "@/components/DebtFreedomVisualizer";
import TaxFreeComparison from "@/components/TaxFreeComparison";
import CostOfWaiting from "@/components/CostOfWaiting";

export default function ToolboxPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <title>Workshop Companion Toolbox | Legacy in Motion</title>
      
      <section className="hero" style={{ padding: "10rem 0 4rem 0", background: "var(--bg-dark)" }}>
        <div className="container text-center">
          <span style={{ color: "var(--gold)", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase" }}>
            Exclusive App Access
          </span>
          <h1 style={{ fontSize: "3.2rem", maxWidth: "800px", margin: "1rem auto 1.5rem", color: "#fff" }}>
            Workshop <span className="text-gold">Companion Toolbox.</span>
          </h1>
          <p style={{ fontSize: "1.1rem", maxWidth: "600px", margin: "0 auto", color: "#ccc" }}>
            Follow along with Nelly during the live workshop. Use these tools to calculate your wealth trajectory and discover your exact financial needs.
          </p>
        </div>
      </section>

      {/* 7-TOOL POWER GRID */}
      <section style={{ padding: "5rem 0", background: "var(--bg-page)" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "3rem", alignItems: "stretch" }}>
            
            <div>
              <h2 style={{ fontSize: "1.8rem", marginBottom: "0.5rem", color: "var(--text-main)" }}>1. Wealth Calculator</h2>
              <p style={{ color: "var(--text-muted)", marginBottom: "1.5rem" }}>Calculate the power of compound interest exactly as shown in the presentation.</p>
              <WealthCalculator />
            </div>

            <div>
              <h2 style={{ fontSize: "1.8rem", marginBottom: "0.5rem", color: "var(--text-main)" }}>2. The Rule of 72</h2>
              <p style={{ color: "var(--text-muted)", marginBottom: "1.5rem" }}>Discover how many years it takes for your money to double based on your interest rate.</p>
              <RuleOf72 />
            </div>

            <div>
              <h2 style={{ fontSize: "1.8rem", marginBottom: "0.5rem", color: "var(--text-main)" }}>3. The Cost of Waiting</h2>
              <p style={{ color: "var(--text-muted)", marginBottom: "1.5rem" }}>See exactly how much wealth you lose by procrastinating for just 5 years.</p>
              <CostOfWaiting />
            </div>

            <div>
              <h2 style={{ fontSize: "1.8rem", marginBottom: "0.5rem", color: "var(--text-main)" }}>4. Debt Freedom Visualizer</h2>
              <p style={{ color: "var(--text-muted)", marginBottom: "1.5rem" }}>See exactly how much interest the banks are stealing from your family's future.</p>
              <DebtFreedomVisualizer />
            </div>

            <div>
              <h2 style={{ fontSize: "1.8rem", marginBottom: "0.5rem", color: "var(--text-main)" }}>5. Tax-Free Retirement</h2>
              <p style={{ color: "var(--text-muted)", marginBottom: "1.5rem" }}>Compare traditional 401(k) taxes against a tax-free IUL wealth strategy.</p>
              <TaxFreeComparison />
            </div>

            <div>
              <h2 style={{ fontSize: "1.8rem", marginBottom: "0.5rem", color: "var(--text-main)" }}>6. D.I.M.E. Method</h2>
              <p style={{ color: "var(--text-muted)", marginBottom: "1.5rem" }}>Calculate exactly how much life insurance your family needs to be completely protected.</p>
              <DIMECalculator />
            </div>

            <div>
              <h2 style={{ fontSize: "1.8rem", marginBottom: "0.5rem", color: "var(--text-main)" }}>7. Progress Checklist</h2>
              <p style={{ color: "var(--text-muted)", marginBottom: "1.5rem" }}>Check off the steps as you secure your financial fortress. Progress saves locally!</p>
              <ProgressTracker />
            </div>

          </div>
        </div>
      </section>
    </>
  );
}