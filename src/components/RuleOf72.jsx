"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";

export default function RuleOf72() {
  const pathname = usePathname() || "";
  const isEs = pathname.startsWith("/es");

  const [interestRate, setInterestRate] = useState(8);
  const yearsToDouble = interestRate > 0 ? (72 / interestRate).toFixed(1) : 0;

  const t = {
    title: isEs ? "La Regla del 72" : "The Rule of 72",
    desc: isEs ? "Descubra qué tan rápido se duplica su dinero." : "Discover exactly how fast your money doubles.",
    rate: isEs ? "Tasa de Rendimiento Esperada (%)" : "Expected Rate of Return (%)",
    doubles: isEs ? "Su Dinero se Duplica Cada" : "Your Money Doubles Every",
    years: isEs ? "Años" : "Years",
    info: isEs 
      ? "Los bancos a menudo dan menos del 1%, lo que significa que su dinero tarda más de 72 años en duplicarse. Ajuste el control deslizante para ver la diferencia."
      : "Banks often give you less than 1%, meaning your money takes over 72 years to double. Slide the dial to see the difference."
  };

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <div style={styles.iconBox}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
        </div>
        <div>
          <h3 style={styles.title}>{t.title}</h3>
          <p style={styles.desc}>{t.desc}</p>
        </div>
      </div>

      <div style={styles.body}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>{t.rate}</label>
          <div style={{ display: "flex", gap: "1rem", alignItems: "center", marginTop: "1rem" }}>
            <input type="range" min="1" max="15" step="0.5" value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))} style={styles.slider} />
            <span style={styles.sliderValue}>{interestRate}%</span>
          </div>
        </div>

        <div style={styles.resultBox}>
          <p style={styles.resultLabel}>{t.doubles}</p>
          <div style={styles.mainValue}>
            {yearsToDouble} <span style={styles.unit}>{t.years}</span>
          </div>
        </div>
        
        <p style={styles.infoText}>{t.info}</p>
      </div>
    </div>
  );
}

const styles = {
  card: { background: "var(--bg-page)", borderRadius: "24px", border: "1px solid var(--border-light)", boxShadow: "0 10px 40px rgba(0,0,0,0.04)", overflow: "hidden", display: "flex", flexDirection: "column", height: "100%" },
  header: { display: "flex", alignItems: "center", gap: "1rem", padding: "1.5rem", borderBottom: "1px solid var(--border-light)", background: "var(--bg-card)", flexWrap: "wrap" },
  iconBox: { width: "48px", height: "48px", borderRadius: "12px", background: "rgba(212, 175, 55, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(212, 175, 55, 0.3)", flexShrink: 0 },
  title: { fontSize: "1.4rem", color: "var(--text-main)", margin: 0 },
  desc: { fontSize: "0.85rem", color: "var(--text-muted)", margin: 0 },
  body: { padding: "1.5rem", display: "flex", flexDirection: "column", flexGrow: 1, justifyContent: "space-between", gap: "1.5rem" },
  inputGroup: { width: "100%" },
  label: { display: "block", color: "var(--text-muted)", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "1px", fontWeight: "600" },
  slider: { flexGrow: 1, accentColor: "var(--gold)", cursor: "pointer", height: "8px", borderRadius: "4px", touchAction: "manipulation" },
  sliderValue: { fontSize: "1.5rem", fontWeight: "bold", color: "var(--text-main)", minWidth: "70px", textAlign: "right" },
  resultBox: { background: "linear-gradient(145deg, #1a1a1a 0%, #000000 100%)", padding: "2.5rem 1.5rem", borderRadius: "16px", textAlign: "center", border: "1px solid rgba(212, 175, 55, 0.2)", boxShadow: "0 10px 30px rgba(0,0,0,0.1)" },
  resultLabel: { color: "#a0a0a0", textTransform: "uppercase", letterSpacing: "1.5px", fontSize: "0.85rem", marginBottom: "0.5rem", fontWeight: "600" },
  mainValue: { fontSize: "clamp(3.5rem, 8vw, 4.5rem)", color: "var(--gold)", fontWeight: "800", lineHeight: "1", textShadow: "0 0 30px rgba(212, 175, 55, 0.4)" },
  unit: { fontSize: "1.5rem", color: "#ffffff", verticalAlign: "middle" },
  infoText: { fontSize: "0.9rem", color: "var(--text-muted)", marginTop: "1rem", textAlign: "center", fontStyle: "italic" }
};