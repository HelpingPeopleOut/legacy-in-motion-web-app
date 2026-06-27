"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";

export default function TaxFreeComparison() {
  const pathname = usePathname() || "";
  const isEs = pathname.startsWith("/es");
  const isPortal = pathname.startsWith("/dashboard");

  const [savings, setSavings] = useState(250000);
  const [taxRate, setTaxRate] = useState(30);

  const formatCurrency = (num) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(num);

  const taxLoss = savings * (taxRate / 100);
  const keepAmount = savings - taxLoss;

  const t = {
    title: isEs ? "Jubilación Libre de Impuestos" : "Tax-Free Retirement",
    desc: isEs ? "Compare un 401(k) contra una estrategia IUL." : "Compare traditional 401(k) taxes against an IUL.",
    balance: isEs ? "Saldo en la Jubilación ($)" : "Retirement Balance ($)",
    tax: isEs ? "Tasa de Impuestos Esperada (%)" : "Expected Tax Rate (%)",
    lose: isEs ? "Pierde ante el IRS" : "You Lose to the IRS",
    keep: isEs ? "Lo Que Conserva" : "What You Keep",
    info: isEs ? "Si esto estuviera en un IUL, conservaría el 100% libre de impuestos." : "If this was in an IUL policy, you would keep 100% tax-free."
  };

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <div style={styles.iconBox}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
        </div>
        <div>
          <h3 style={styles.title}>{t.title}</h3>
          <p style={styles.desc}>{t.desc}</p>
        </div>
      </div>

      <div style={styles.body}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>{t.balance}</label>
          <input type="number" value={savings} onChange={(e) => setSavings(Number(e.target.value))} style={styles.input} />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>{t.tax}</label>
          <div style={{ display: "flex", gap: "1rem", alignItems: "center", marginTop: "1rem" }}>
            <input type="range" min="10" max="50" step="1" value={taxRate} onChange={(e) => setTaxRate(Number(e.target.value))} style={styles.slider} />
            <span style={styles.sliderValue}>{taxRate}%</span>
          </div>
        </div>

        <div style={styles.resultGrid}>
          <div style={styles.redBox}>
            <p style={styles.redLabel}>{t.lose}</p>
            <div style={styles.redValue}>-{formatCurrency(taxLoss)}</div>
          </div>
          
          <div style={isPortal ? styles.goldBoxPortal : styles.goldBox}>
            <p style={isPortal ? styles.goldLabelPortal : styles.goldLabel}>{t.keep}</p>
            <div style={styles.goldValue}>{formatCurrency(keepAmount)}</div>
          </div>
        </div>

        <p style={styles.infoText}>{t.info}</p>
      </div>
    </div>
  );
}

const styles = {
  card: { background: "var(--bg-page)", borderRadius: "24px", border: "1px solid var(--border-light)", boxShadow: "0 10px 40px rgba(0,0,0,0.04)", overflow: "hidden", display: "flex", flexDirection: "column", height: "100%" },
  header: { display: "flex", alignItems: "center", gap: "1rem", padding: "2rem 2rem 1.5rem", borderBottom: "1px solid var(--border-light)", background: "var(--bg-card)" },
  iconBox: { width: "48px", height: "48px", borderRadius: "12px", background: "rgba(212, 175, 55, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(212, 175, 55, 0.3)", flexShrink: 0 },
  title: { fontSize: "1.5rem", color: "var(--text-main)", margin: 0 },
  desc: { fontSize: "0.9rem", color: "var(--text-muted)", margin: 0 },
  body: { padding: "2rem", display: "flex", flexDirection: "column", flexGrow: 1, justifyContent: "space-between" },
  inputGroup: { marginBottom: "1.5rem" },
  label: { display: "block", color: "var(--text-muted)", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "1px", fontWeight: "600", marginBottom: "0.5rem" },
  input: { width: "100%", padding: "1rem", borderRadius: "12px", border: "none", background: "rgba(0,0,0,0.03)", boxShadow: "inset 0 2px 4px rgba(0,0,0,0.02)", fontSize: "1.1rem", color: "var(--text-main)", outline: "none", transition: "all 0.3s ease" },
  slider: { flexGrow: 1, accentColor: "var(--gold)", cursor: "pointer", height: "8px", borderRadius: "4px" },
  sliderValue: { fontSize: "1.5rem", fontWeight: "bold", color: "var(--text-main)", minWidth: "60px", textAlign: "right" },
  /* FIXED RESPONSIVENESS */
  resultGrid: { display: "flex", flexWrap: "wrap", gap: "1rem", marginTop: "1rem" },
  redBox: { flex: "1 1 140px", background: "linear-gradient(145deg, #2a0a0a 0%, #1a0000 100%)", border: "1px solid rgba(255, 77, 77, 0.3)", padding: "1.5rem 1rem", borderRadius: "16px", textAlign: "center" },
  goldBox: { flex: "1 1 140px", background: "linear-gradient(145deg, #1a1a1a 0%, #000000 100%)", border: "1px solid var(--gold)", padding: "1.5rem 1rem", borderRadius: "16px", textAlign: "center" },
  goldBoxPortal: { flex: "1 1 140px", background: "linear-gradient(145deg, #faf8f3 0%, #f5f0e6 100%)", border: "1px solid rgba(184, 148, 31, 0.35)", padding: "1.5rem 1rem", borderRadius: "16px", textAlign: "center" },
  redLabel: { color: "#ff8080", textTransform: "uppercase", letterSpacing: "1px", fontSize: "0.75rem", marginBottom: "0.5rem", fontWeight: "600" },
  goldLabel: { color: "#a0a0a0", textTransform: "uppercase", letterSpacing: "1px", fontSize: "0.75rem", marginBottom: "0.5rem", fontWeight: "600" },
  goldLabelPortal: { color: "#6b6560", textTransform: "uppercase", letterSpacing: "1px", fontSize: "0.75rem", marginBottom: "0.5rem", fontWeight: "600" },
  redValue: { fontSize: "clamp(1.4rem, 5vw, 1.8rem)", color: "#ff4d4d", fontWeight: "800", wordBreak: "break-word" },
  goldValue: { fontSize: "clamp(1.4rem, 5vw, 1.8rem)", color: "var(--gold)", fontWeight: "800", wordBreak: "break-word" },
  infoText: { fontSize: "0.95rem", color: "var(--text-muted)", marginTop: "2rem", textAlign: "center", fontStyle: "italic" }
};