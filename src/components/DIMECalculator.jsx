"use client";

import { useState } from "react";

export default function DIMECalculator() {
  const [debt, setDebt] = useState(15000);
  const [income, setIncome] = useState(60000);
  const [years, setYears] = useState(10);
  const [mortgage, setMortgage] = useState(350000);
  const [education, setEducation] = useState(50000);

  const totalCoverage = Number(debt) + (Number(income) * Number(years)) + Number(mortgage) + Number(education);

  const formatCurrency = (num) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(num);
  };

  const inputStyle = { width: "100%", padding: "0.8rem", borderRadius: "8px", border: "1px solid var(--border-light)", background: "var(--bg-page)", fontSize: "1rem", color: "var(--text-main)", outline: "none" };

  return (
    <div style={{ background: "var(--bg-card)", padding: "2rem", borderRadius: "16px", border: "1px solid var(--border-light)", boxShadow: "var(--shadow-md)", height: "100%" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "2rem" }}>
        
        <div style={{ gridColumn: "1 / -1" }}>
          <label style={{ display: "block", color: "var(--text-muted)", fontSize: "0.85rem", textTransform: "uppercase", marginBottom: "0.4rem" }}><strong>D</strong>ebt (Credit Cards, Loans)</label>
          <input type="number" value={debt} onChange={(e) => setDebt(e.target.value)} style={inputStyle} />
        </div>

        <div>
          <label style={{ display: "block", color: "var(--text-muted)", fontSize: "0.85rem", textTransform: "uppercase", marginBottom: "0.4rem" }}><strong>I</strong>ncome (Annual)</label>
          <input type="number" value={income} onChange={(e) => setIncome(e.target.value)} style={inputStyle} />
        </div>
        <div>
          <label style={{ display: "block", color: "var(--text-muted)", fontSize: "0.85rem", textTransform: "uppercase", marginBottom: "0.4rem" }}>Years to Replace</label>
          <input type="number" value={years} onChange={(e) => setYears(e.target.value)} style={inputStyle} />
        </div>

        <div style={{ gridColumn: "1 / -1" }}>
          <label style={{ display: "block", color: "var(--text-muted)", fontSize: "0.85rem", textTransform: "uppercase", marginBottom: "0.4rem" }}><strong>M</strong>ortgage Balance</label>
          <input type="number" value={mortgage} onChange={(e) => setMortgage(e.target.value)} style={inputStyle} />
        </div>

        <div style={{ gridColumn: "1 / -1" }}>
          <label style={{ display: "block", color: "var(--text-muted)", fontSize: "0.85rem", textTransform: "uppercase", marginBottom: "0.4rem" }}><strong>E</strong>ducation (College Funds)</label>
          <input type="number" value={education} onChange={(e) => setEducation(e.target.value)} style={inputStyle} />
        </div>

      </div>

      <div style={{ background: "var(--bg-dark)", padding: "2rem", borderRadius: "12px", textAlign: "center", color: "#fff" }}>
        <p style={{ color: "#a0a0a0", textTransform: "uppercase", letterSpacing: "2px", fontSize: "0.85rem", marginBottom: "0.5rem" }}>
          Recommended Coverage
        </p>
        <div style={{ fontSize: "2.8rem", color: "var(--gold)", fontWeight: "bold", lineHeight: "1", textShadow: "0 0 20px rgba(212, 175, 55, 0.3)" }}>
          {formatCurrency(totalCoverage)}
        </div>
      </div>
    </div>
  );
}