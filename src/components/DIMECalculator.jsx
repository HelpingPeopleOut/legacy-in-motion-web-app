"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {
  calculateHlv,
  formatUsd,
  loadHlvInputs,
  saveHlvInputs,
} from "@/lib/hlv";

export default function DIMECalculator() {
  const pathname = usePathname() || "";
  const isEs = pathname.startsWith("/es");
  const isPortal = pathname.startsWith("/dashboard");

  const [inputs, setInputs] = useState(() => loadHlvInputs());

  useEffect(() => {
    setInputs(loadHlvInputs());
  }, []);

  const update = (patch) => {
    setInputs((prev) => {
      const next = { ...prev, ...patch };
      saveHlvInputs(next);
      return next;
    });
  };

  const breakdown = calculateHlv(inputs);

  const t = {
    title: isEs ? "Método D.I.M.E." : "D.I.M.E. Method",
    desc: isEs ? "Calcule exactamente cuánta cobertura necesita su familia." : "Calculate exactly how much life insurance your family needs.",
    debt: isEs ? "Deuda (Tarjetas, Préstamos)" : "Debt (Credit Cards, Loans)",
    income: isEs ? "Ingreso (Anual)" : "Income (Annual)",
    years: isEs ? "Años a Reemplazar" : "Years to Replace",
    mortgage: isEs ? "Saldo de Hipoteca" : "Mortgage Balance",
    edu: isEs ? "Educación (Fondos)" : "Education (College Funds)",
    rec: isEs ? "Cobertura Recomendada" : "Recommended Coverage",
    syncNote: isEs
      ? "Los valores se sincronizan con su informe PDF en el portal."
      : "Values sync to your Family Security Report PDF in the portal.",
  };

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <div style={styles.iconBox}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
        </div>
        <div>
          <h3 style={styles.title}>{t.title}</h3>
          <p style={styles.desc}>{t.desc}</p>
          {isPortal && (
            <p style={{ ...styles.desc, marginTop: "0.35rem", fontSize: "0.8rem", color: "var(--color-portal-gold, var(--gold))" }}>
              {t.syncNote}
            </p>
          )}
        </div>
      </div>

      <div style={styles.body}>
        <div style={styles.inputGrid}>
          <div style={{ gridColumn: "1 / -1" }}>
            <label style={styles.label}><strong>D</strong> - {t.debt}</label>
            <input type="number" value={inputs.debt} onChange={(e) => update({ debt: Number(e.target.value) })} style={styles.input} />
          </div>
          <div>
            <label style={styles.label}><strong>I</strong> - {t.income}</label>
            <input type="number" value={inputs.income} onChange={(e) => update({ income: Number(e.target.value) })} style={styles.input} />
          </div>
          <div>
            <label style={styles.label}>{t.years}</label>
            <input type="number" value={inputs.years} onChange={(e) => update({ years: Number(e.target.value) })} style={styles.input} />
          </div>
          <div style={{ gridColumn: "1 / -1" }}>
            <label style={styles.label}><strong>M</strong> - {t.mortgage}</label>
            <input type="number" value={inputs.mortgage} onChange={(e) => update({ mortgage: Number(e.target.value) })} style={styles.input} />
          </div>
          <div style={{ gridColumn: "1 / -1" }}>
            <label style={styles.label}><strong>E</strong> - {t.edu}</label>
            <input type="number" value={inputs.education} onChange={(e) => update({ education: Number(e.target.value) })} style={styles.input} />
          </div>
        </div>

        <div style={isPortal ? styles.resultBoxPortal : styles.resultBox}>
          <p style={isPortal ? styles.resultLabelPortal : styles.resultLabel}>{t.rec}</p>
          <div style={styles.mainValue}>{formatUsd(breakdown.total)}</div>
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
  body: { padding: "2rem", display: "flex", flexDirection: "column", flexGrow: 1, justifyContent: "space-between", gap: "2rem" },
  inputGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 140px), 1fr))", gap: "1rem" },
  label: { display: "block", color: "var(--text-muted)", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "1px", fontWeight: "600", marginBottom: "0.5rem" },
  input: { width: "100%", padding: "1rem", borderRadius: "12px", border: "none", background: "rgba(0,0,0,0.03)", boxShadow: "inset 0 2px 4px rgba(0,0,0,0.02)", fontSize: "1.1rem", color: "var(--text-main)", outline: "none", transition: "all 0.3s ease" },
  resultBox: { background: "linear-gradient(145deg, #1a1a1a 0%, #000000 100%)", padding: "2.5rem 1.5rem", borderRadius: "16px", textAlign: "center", border: "1px solid rgba(212, 175, 55, 0.2)", boxShadow: "0 10px 30px rgba(0,0,0,0.1)" },
  resultBoxPortal: { background: "linear-gradient(145deg, #faf8f3 0%, #f5f0e6 100%)", padding: "2.5rem 1.5rem", borderRadius: "16px", textAlign: "center", border: "1px solid rgba(184, 148, 31, 0.25)", boxShadow: "0 4px 20px rgba(184, 148, 31, 0.08)" },
  resultLabel: { color: "#a0a0a0", textTransform: "uppercase", letterSpacing: "2px", fontSize: "0.85rem", marginBottom: "0.5rem", fontWeight: "600" },
  resultLabelPortal: { color: "#6b6560", textTransform: "uppercase", letterSpacing: "2px", fontSize: "0.85rem", marginBottom: "0.5rem", fontWeight: "600" },
  mainValue: { fontSize: "clamp(2rem, 8vw, 2.8rem)", color: "var(--gold)", fontWeight: "800", lineHeight: "1", textShadow: "0 0 20px rgba(212, 175, 55, 0.3)", wordBreak: "break-word" }
};
