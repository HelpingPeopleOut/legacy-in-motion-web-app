"use client";

import { useState } from "react";

export default function CostOfWaiting() {
  const [monthly, setMonthly] = useState(500);
  const [rate, setRate] = useState(8);
  const [years, setYears] = useState(25);

  const calculateFutureValue = (pmt, r, y) => {
    if (y <= 0) return 0;
    const monthlyRate = r / 100 / 12;
    const months = y * 12;
    let total = 0;
    for (let i = 0; i < months; i++) {
      total = (total + pmt) * (1 + monthlyRate);
    }
    return total;
  };

  const formatCurrency = (num) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(num);

  const startNow = calculateFutureValue(monthly, rate, years);
  const wait5Years = calculateFutureValue(monthly, rate, years - 5);
  const costOfWaiting = startNow - wait5Years;

  const inputStyle = { width: "100%", padding: "0.8rem", borderRadius: "8px", border: "1px solid var(--border-light)", background: "var(--bg-page)", fontSize: "1rem", color: "var(--text-main)", outline: "none" };

  return (
    <div style={{ background: "var(--bg-card)", padding: "2rem", borderRadius: "16px", border: "1px solid var(--border-light)", boxShadow: "var(--shadow-md)", height: "100%" }}>
      
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "2rem" }}>
        <div style={{ gridColumn: "1 / -1" }}>
          <label style={{ display: "block", color: "var(--text-muted)", fontSize: "0.85rem", textTransform: "uppercase", marginBottom: "0.4rem" }}>Monthly Investment</label>
          <input type="number" value={monthly} onChange={(e) => setMonthly(Number(e.target.value))} style={inputStyle} />
        </div>
        <div>
          <label style={{ display: "block", color: "var(--text-muted)", fontSize: "0.85rem", textTransform: "uppercase", marginBottom: "0.4rem" }}>Interest Rate (%)</label>
          <input type="number" value={rate} onChange={(e) => setRate(Number(e.target.value))} style={inputStyle} />
        </div>
        <div>
          <label style={{ display: "block", color: "var(--text-muted)", fontSize: "0.85rem", textTransform: "uppercase", marginBottom: "0.4rem" }}>Years to Retire</label>
          <input type="number" value={years} onChange={(e) => setYears(Number(e.target.value))} style={inputStyle} />
        </div>
      </div>

      <div style={{ background: "var(--bg-dark)", border: "1px solid var(--gold)", padding: "1.5rem", borderRadius: "12px", textAlign: "center", marginBottom: "1rem" }}>
        <p style={{ color: "#a0a0a0", fontSize: "0.75rem", textTransform: "uppercase", fontWeight: "bold" }}>If You Start Today</p>
        <div style={{ fontSize: "2rem", color: "var(--gold)", fontWeight: "bold", marginTop: "0.2rem" }}>
          {formatCurrency(startNow)}
        </div>
      </div>

      <div style={{ background: "rgba(255, 77, 77, 0.1)", border: "1px solid rgba(255, 77, 77, 0.3)", padding: "1.5rem", borderRadius: "12px", textAlign: "center" }}>
        <p style={{ color: "var(--text-muted)", fontSize: "0.75rem", textTransform: "uppercase", fontWeight: "bold" }}>The Cost of Waiting 5 Years</p>
        <div style={{ fontSize: "1.8rem", color: "#ff4d4d", fontWeight: "bold", marginTop: "0.2rem" }}>
          -{formatCurrency(costOfWaiting)}
        </div>
        <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginTop: "0.5rem" }}>You lose this much compound interest just by procrastinating.</p>
      </div>

    </div>
  );
}