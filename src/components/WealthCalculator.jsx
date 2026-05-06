"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";

export default function WealthCalculator() {
  const pathname = usePathname() || "";
  const isEs = pathname.startsWith("/es");

  const [initialAmount, setInitialAmount] = useState(5000);
  const [monthlyContribution, setMonthlyContribution] = useState(500);
  const [years, setYears] = useState(20);
  const [interestRate, setInterestRate] = useState(8);

  const calculateWealth = () => {
    let total = initialAmount;
    let totalInvested = initialAmount;
    const monthlyRate = interestRate / 100 / 12;
    const totalMonths = years * 12;

    for (let i = 0; i < totalMonths; i++) {
      total = total * (1 + monthlyRate) + monthlyContribution;
      totalInvested += monthlyContribution;
    }

    return {
      futureValue: total,
      totalInvested: totalInvested,
      totalInterest: total - totalInvested,
    };
  };

  const results = calculateWealth();
  const formatCurrency = (num) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(num);

  const t = {
    title: isEs ? "Proyección de Riqueza" : "Wealth Projector",
    desc: isEs ? "Calcule el poder del interés compuesto a lo largo del tiempo." : "See how your money grows over time with the right strategy.",
    initial: isEs ? "Inversión Inicial ($)" : "Initial Investment ($)",
    monthly: isEs ? "Contribución Mensual ($)" : "Monthly Contribution ($)",
    years: isEs ? "Años de Crecimiento" : "Years to Grow",
    rate: isEs ? "Rendimiento Anual Estimado (%)" : "Estimated Annual Return (%)",
    future: isEs ? "Valor Futuro Estimado" : "Estimated Future Value",
    invested: isEs ? "Total Invertido" : "Total Invested",
    earned: isEs ? "Interés Ganado" : "Interest Earned",
    yrLabel: isEs ? "Años" : "Years",
    cta: isEs ? "Construir Esta Estrategia con Nelly" : "Build This Strategy With Nelly",
    contactRoute: isEs ? "/es/solicitar-llamada" : "/request-callback"
  };

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <div style={styles.iconBox}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline><polyline points="16 7 22 7 22 13"></polyline></svg>
        </div>
        <div>
          <h3 style={styles.title}>{t.title}</h3>
          <p style={styles.desc}>{t.desc}</p>
        </div>
      </div>

      <div style={styles.grid}>
        <div style={styles.inputCol}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>{t.initial}</label>
            <input type="number" value={initialAmount} onChange={(e) => setInitialAmount(Number(e.target.value))} style={styles.input} />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>{t.monthly}</label>
            <input type="number" value={monthlyContribution} onChange={(e) => setMonthlyContribution(Number(e.target.value))} style={styles.input} />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>{t.years}</label>
            <input type="range" min="1" max="50" value={years} onChange={(e) => setYears(Number(e.target.value))} style={styles.slider} />
            <div style={styles.sliderValue}>{years} {t.yrLabel}</div>
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>{t.rate}</label>
            <input type="range" min="1" max="15" step="0.5" value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))} style={styles.slider} />
            <div style={styles.sliderValue}>{interestRate}%</div>
          </div>
        </div>

        <div style={styles.resultCol}>
          <div style={styles.mainResultBox}>
            <p style={styles.resultLabel}>{t.future}</p>
            <div style={styles.mainValue}>{formatCurrency(results.futureValue)}</div>
          </div>
          <div style={styles.subResultGrid}>
            <div style={styles.subBox}>
              <p style={styles.subLabel}>{t.invested}</p>
              <p style={styles.subValue}>{formatCurrency(results.totalInvested)}</p>
            </div>
            <div style={styles.subBox}>
              <p style={styles.subLabel}>{t.earned}</p>
              <p style={{...styles.subValue, color: "var(--gold)"}}>{formatCurrency(results.totalInterest)}</p>
            </div>
          </div>
          <button style={styles.actionButton} onClick={() => window.location.href = t.contactRoute}>
            {t.cta}
          </button>
        </div>
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
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", flexGrow: 1 },
  inputCol: { padding: "2rem" },
  inputGroup: { marginBottom: "1.5rem" },
  label: { display: "block", color: "var(--text-muted)", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "1px", fontWeight: "600", marginBottom: "0.5rem" },
  input: { width: "100%", padding: "1rem", borderRadius: "12px", border: "none", background: "rgba(0,0,0,0.03)", boxShadow: "inset 0 2px 4px rgba(0,0,0,0.02)", fontSize: "1.1rem", color: "var(--text-main)", outline: "none", transition: "all 0.3s ease" },
  slider: { width: "100%", accentColor: "var(--gold)", cursor: "pointer", height: "6px", borderRadius: "4px" },
  sliderValue: { textAlign: "right", fontSize: "1.1rem", fontWeight: "bold", color: "var(--gold)", marginTop: "0.5rem" },
  resultCol: { background: "linear-gradient(145deg, #1a1a1a 0%, #000000 100%)", padding: "2.5rem 2rem", display: "flex", flexDirection: "column", justifyContent: "center", borderLeft: "1px solid var(--border-light)" },
  mainResultBox: { textAlign: "center", marginBottom: "2rem" },
  resultLabel: { color: "#a0a0a0", textTransform: "uppercase", letterSpacing: "2px", fontSize: "0.85rem", marginBottom: "0.5rem", fontWeight: "600" },
  mainValue: { fontSize: "3.2rem", color: "#ffffff", fontWeight: "800", lineHeight: "1", textShadow: "0 0 30px rgba(212, 175, 55, 0.4)" },
  subResultGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "2rem" },
  subBox: { background: "rgba(255,255,255,0.05)", padding: "1.5rem", borderRadius: "16px", textAlign: "center", border: "1px solid rgba(255,255,255,0.1)" },
  subLabel: { fontSize: "0.75rem", color: "#888", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "0.5rem" },
  subValue: { fontSize: "1.3rem", fontWeight: "bold", color: "#fff" },
  actionButton: { width: "100%", padding: "1rem", background: "var(--gold)", color: "#000", border: "none", borderRadius: "12px", fontSize: "1rem", fontWeight: "bold", cursor: "pointer", textTransform: "uppercase", letterSpacing: "1px", transition: "transform 0.2s" }
};