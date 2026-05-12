"use client";

import { useState } from "react";

export default function RuleOf72() {
  const [interestRate, setInterestRate] = useState(8);

  // The Rule of 72 Math
  const yearsToDouble = interestRate > 0 ? (72 / interestRate).toFixed(1) : 0;

  return (
    <div style={{ background: "var(--bg-card)", padding: "2rem", borderRadius: "16px", border: "1px solid var(--border-light)", boxShadow: "var(--shadow-md)", height: "100%" }}>
      <div style={{ marginBottom: "2rem" }}>
        <label style={{ display: "block", color: "var(--text-muted)", marginBottom: "0.5rem", fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "1px" }}>
          Expected Rate of Return (%)
        </label>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <input 
            type="range" 
            min="1" 
            max="15" 
            step="0.5" 
            value={interestRate} 
            onChange={(e) => setInterestRate(Number(e.target.value))}
            style={{ flexGrow: 1, accentColor: "var(--gold)" }}
          />
          <span style={{ fontSize: "1.5rem", fontWeight: "bold", color: "var(--text-main)", minWidth: "60px", textAlign: "right" }}>
            {interestRate}%
          </span>
        </div>
      </div>

      <div style={{ background: "var(--bg-dark)", padding: "2rem", borderRadius: "12px", textAlign: "center", color: "#fff" }}>
        <p style={{ color: "#a0a0a0", textTransform: "uppercase", letterSpacing: "2px", fontSize: "0.85rem", marginBottom: "0.5rem" }}>
          Your Money Doubles Every
        </p>
        <div style={{ fontSize: "3.5rem", color: "var(--gold)", fontWeight: "bold", lineHeight: "1", textShadow: "0 0 20px rgba(212, 175, 55, 0.3)" }}>
          {yearsToDouble} <span style={{ fontSize: "1.5rem", color: "#fff" }}>Years</span>
        </div>
      </div>
      
      <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", marginTop: "1.5rem", textAlign: "center", lineHeight: "1.6" }}>
        Banks often give you less than 1%, meaning your money takes over 72 years to double. By restructuring your cash flow, you can accelerate your wealth timeline.
      </p>
    </div>
  );
}