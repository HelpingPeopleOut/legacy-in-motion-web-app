"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";

export default function CostOfWaiting() {
  const pathname = usePathname() || "";
  const isEs = pathname.startsWith("/es");

  const [monthly, setMonthly] = useState(500);
  const [rate, setRate] = useState(8);
  const [years, setYears] = useState(25);

  const calculateFutureValue = (pmt, r, y) => {
    if (y <= 0) return 0;
    const monthlyRate = r / 100 / 12;
    const months = y * 12;
    let total = 0;
    for (let i = 0; i < months; i++) { total = (total + pmt) * (1 + monthlyRate); }
    return total;
  };

  const formatCurrency = (num) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(num);

  const startNow = calculateFutureValue(monthly, rate, years);
  const wait5Years = calculateFutureValue(monthly, rate, years - 5);
  const costOfWaiting = startNow - wait5Years;

  const t = {
    title: isEs ? "El Costo de Esperar" : "The Cost of Waiting",
    desc: isEs ? "Vea cuánta riqueza pierde al posponerlo." : "See how much wealth you lose by procrastinating.",
    monthly: isEs ? "Inversión Mensual ($)" : "Monthly Investment ($)",
    rate: isEs ? "Tasa Anual (%)" : "Annual Rate (%)",
    years: isEs ? "Años para Jubilarse" : "Years to Retire",
    startToday: isEs ? "Si Comienza Hoy" : "If You Start Today",
    costTitle: isEs ? "El Costo de Esperar 5 Años" : "The Cost of Waiting 5 Years",
    lossText: isEs ? "Pérdida por no empezar ahora." : "Wealth lost by not starting now."
  };

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <div style={styles.iconBox}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"></path><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
        </div>
        <div>
          <h3 style={styles.title}>{t.title}</h3>
          <p style={styles.desc}>{t.desc}</p>
        </div>
      </div>

      <div style={styles.body}>
        <div style={styles.inputGrid}>
          <div>
            <label style={styles.label}>{t.monthly}</label>
            <input type="number" value={monthly} onChange={(e) => setMonthly(Number(e.target.value))} style={styles.input} />
          </div>
          <div>
            <label style={styles.label}>{t.rate}</label>
            <input type="number" value={rate} onChange={(e) => setRate(Number(e.target.value))} style={styles.input} />
          </div>
          <div style={{ gridColumn: "1 / -1" }}>
            <label style={styles.label}>{t.years}</label>
            <input type="number" value={years} onChange={(e) => setYears(Number(e.target.value))} style={styles.input} />
          </div>
        </div>

        <div style={styles.resultsWrapper}>
          <div style={styles.goldBox}>
            <p style={styles.boxLabel}>{t.startToday}</p>
            <div style={styles.goldValue}>{formatCurrency(startNow)}</div>
          </div>

          <div style={styles.redBox}>
            <p style={{...styles.boxLabel, color: "#ff8080"}}>{t.costTitle}</p>
            <div style={styles.redValue}>-{formatCurrency(costOfWaiting)}</div>
            <p style={styles.subText}>{t.lossText}</p>
          </div>
        </div>
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
  body: { padding: "1.5rem", display: "flex", flexDirection: "column", flexGrow: 1, gap: "1.5rem" },
  inputGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 120px), 1fr))", gap: "1rem" },
  label: { display: "block", color: "var(--text-muted)", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "1px", fontWeight: "600", marginBottom: "0.5rem" },
  input: { width: "100%", padding: "1rem", borderRadius: "12px", border: "none", background: "rgba(0,0,0,0.03)", boxShadow: "inset 0 2px 4px rgba(0,0,0,0.02)", fontSize: "1.1rem", color: "var(--text-main)", outline: "none", transition: "all 0.3s ease", touchAction: "manipulation" },
  resultsWrapper: { display: "flex", flexDirection: "column", gap: "1rem", flexGrow: 1, justifyContent: "flex-end" },
  goldBox: { background: "linear-gradient(145deg, #1a1a1a 0%, #000000 100%)", border: "1px solid rgba(212, 175, 55, 0.3)", padding: "1.5rem", borderRadius: "16px", textAlign: "center", boxShadow: "0 10px 20px rgba(0,0,0,0.1)" },
  redBox: { background: "linear-gradient(145deg, #2a0a0a 0%, #1a0000 100%)", border: "1px solid rgba(255, 77, 77, 0.3)", padding: "1.5rem", borderRadius: "16px", textAlign: "center", boxShadow: "0 10px 20px rgba(255,0,0,0.05)" },
  boxLabel: { color: "#a0a0a0", textTransform: "uppercase", letterSpacing: "1.5px", fontSize: "0.75rem", marginBottom: "0.5rem", fontWeight: "600" },
  goldValue: { fontSize: "clamp(2rem, 5vw, 2.5rem)", color: "var(--gold)", fontWeight: "800", textShadow: "0 0 20px rgba(212, 175, 55, 0.3)" },
  redValue: { fontSize: "clamp(2rem, 5vw, 2.5rem)", color: "#ff4d4d", fontWeight: "800", textShadow: "0 0 20px rgba(255, 77, 77, 0.3)" },
  subText: { fontSize: "0.8rem", color: "#ffb3b3", marginTop: "0.5rem", fontStyle: "italic" }
};