"use client";

import { useState } from "react";

export default function DebtFreedomVisualizer() {
  const [debt, setDebt] = useState(10000);
  const [rate, setRate] = useState(22);
  const [payment, setPayment] = useState(300);

  // Simplified calculation for visual shock-value
  const monthlyRate = rate / 100 / 12;
  
  // Calculate months to payoff (rough estimate)
  let months = 0;
  let balance = debt;
  let totalInterest = 0;
  
  // Prevent infinite loops if payment is too low to cover interest
  const minPayment = debt * monthlyRate;
  const isImpossible = payment <= minPayment;

  if (!isImpossible) {
    while (balance > 0 && months < 600) { // cap at 50 years
      const interestForMonth = balance * monthlyRate;
      totalInterest += interestForMonth;
      balance = balance + interestForMonth - payment;
      months++;
    }
  }

  const formatCurrency = (num) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(num);

  const inputStyle = { width: "100%", padding: "0.8rem", borderRadius: "8px", border: "1px solid var(--border-light)", background: "var(--bg-page)", fontSize: "1rem", color: "var(--text-main)", outline: "none" };

  return (
    <div style={{ background: "var(--bg-card)", padding: "2rem", borderRadius: "16px", border: "1px solid var(--border-light)", boxShadow: "var(--shadow-md)", height: "100%" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1rem", marginBottom: "2rem" }}>
        
        <div>
          <label style={{ display: "block", color: "var(--text-muted)", fontSize: "0.85rem", textTransform: "uppercase", marginBottom: "0.4rem" }}>Total Credit Card Debt</label>
          <input type="number" value={debt} onChange={(e) => setDebt(Number(e.target.value))} style={inputStyle} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          <div>
            <label style={{ display: "block", color: "var(--text-muted)", fontSize: "0.85rem", textTransform: "uppercase", marginBottom: "0.4rem" }}>Interest Rate (%)</label>
            <input type="number" value={rate} onChange={(e) => setRate(Number(e.target.value))} style={inputStyle} />
          </div>
          <div>
            <label style={{ display: "block", color: "var(--text-muted)", fontSize: "0.85rem", textTransform: "uppercase", marginBottom: "0.4rem" }}>Monthly Payment</label>
            <input type="number" value={payment} onChange={(e) => setPayment(Number(e.target.value))} style={inputStyle} />
          </div>
        </div>

      </div>

      <div style={{ background: "var(--bg-dark)", padding: "1.5rem", borderRadius: "12px", textAlign: "center", color: "#fff" }}>
        {isImpossible ? (
          <div style={{ color: "#ff4d4d", fontWeight: "bold", fontSize: "1.2rem", padding: "1rem 0" }}>
            Warning: Your payment doesn't even cover the interest. You will be in debt forever.
          </div>
        ) : (
          <>
            <p style={{ color: "#a0a0a0", textTransform: "uppercase", letterSpacing: "1px", fontSize: "0.85rem", marginBottom: "0.5rem" }}>
              Total Interest Stolen By The Bank
            </p>
            <div style={{ fontSize: "2.5rem", color: "#ff4d4d", fontWeight: "bold", lineHeight: "1", marginBottom: "1rem" }}>
              {formatCurrency(totalInterest)}
            </div>
            <div style={{ borderTop: "1px solid #333", paddingTop: "1rem", display: "flex", justifyContent: "space-between", fontSize: "0.9rem" }}>
              <span style={{ color: "#a0a0a0" }}>Time to Debt-Free:</span>
              <span style={{ color: "var(--gold)", fontWeight: "bold" }}>{Math.floor(months / 12)} Yrs, {months % 12} Mos</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}