"use client";

import { useState } from "react";

export default function TaxFreeComparison() {
  const [savings, setSavings] = useState(250000);
  const [taxRate, setTaxRate] = useState(30);

  const formatCurrency = (num) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(num);

  const taxLoss = savings * (taxRate / 100);
  const keepAmount = savings - taxLoss;

  const inputStyle = { width: "100%", padding: "0.8rem", borderRadius: "8px", border: "1px solid var(--border-light)", background: "var(--bg-page)", fontSize: "1rem", color: "var(--text-main)", outline: "none" };

  return (
    <div style={{ background: "var(--bg-card)", padding: "2rem", borderRadius: "16px", border: "1px solid var(--border-light)", boxShadow: "var(--shadow-md)", height: "100%" }}>
      
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "2rem" }}>
        <div style={{ gridColumn: "1 / -1" }}>
          <label style={{ display: "block", color: "var(--text-muted)", fontSize: "0.85rem", textTransform: "uppercase", marginBottom: "0.4rem" }}>401(k) / IRA Balance at Retirement</label>
          <input type="number" value={savings} onChange={(e) => setSavings(Number(e.target.value))} style={inputStyle} />
        </div>
        <div style={{ gridColumn: "1 / -1" }}>
          <label style={{ display: "block", color: "var(--text-muted)", fontSize: "0.85rem", textTransform: "uppercase", marginBottom: "0.4rem" }}>Expected Retirement Tax Rate (%)</label>
          <input type="range" min="10" max="50" step="1" value={taxRate} onChange={(e) => setTaxRate(Number(e.target.value))} style={{ width: "100%", accentColor: "var(--gold)", marginTop: "0.5rem" }} />
          <div style={{ textAlign: "right", fontWeight: "bold", color: "var(--text-main)", marginTop: "0.5rem" }}>{taxRate}%</div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
        <div style={{ background: "rgba(255, 77, 77, 0.1)", border: "1px solid rgba(255, 77, 77, 0.3)", padding: "1rem", borderRadius: "12px", textAlign: "center" }}>
          <p style={{ color: "var(--text-muted)", fontSize: "0.75rem", textTransform: "uppercase", fontWeight: "bold" }}>You Lose to the IRS</p>
          <div style={{ fontSize: "1.5rem", color: "#ff4d4d", fontWeight: "bold", marginTop: "0.5rem" }}>
            -{formatCurrency(taxLoss)}
          </div>
        </div>
        
        <div style={{ background: "var(--bg-dark)", border: "1px solid var(--gold)", padding: "1rem", borderRadius: "12px", textAlign: "center" }}>
          <p style={{ color: "#a0a0a0", fontSize: "0.75rem", textTransform: "uppercase", fontWeight: "bold" }}>What You Actually Keep</p>
          <div style={{ fontSize: "1.5rem", color: "var(--gold)", fontWeight: "bold", marginTop: "0.5rem" }}>
            {formatCurrency(keepAmount)}
          </div>
        </div>
      </div>

      <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", marginTop: "1.5rem", textAlign: "center", lineHeight: "1.6" }}>
        If this money was in a properly structured <strong>Indexed Universal Life (IUL)</strong> policy, you would keep 100% of it, completely tax-free.
      </p>

    </div>
  );
}