"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ProgressTracker() {
  const pathname = usePathname() || "";
  const isEs = pathname.startsWith("/es");

  const [completedSteps, setCompletedSteps] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("legacyProgress");
    if (saved) setCompletedSteps(JSON.parse(saved));
  }, []);

  const toggleStep = (id) => {
    let updated;
    if (completedSteps.includes(id)) {
      updated = completedSteps.filter(stepId => stepId !== id);
    } else {
      updated = [...completedSteps, id];
    }
    setCompletedSteps(updated);
    localStorage.setItem("legacyProgress", JSON.stringify(updated));
  };

  const stepsEN = [
    { id: "step1", title: "Cash Flow & Debt", desc: "Budget established and debt snowball started." },
    { id: "step2", title: "Emergency Fund", desc: "3-6 months of liquid reserves secured." },
    { id: "step3", title: "Living Benefits", desc: "Life insurance with critical illness active." },
    { id: "step4", title: "Retirement Optimization", desc: "401(k) rolled over or annuity established." },
    { id: "step5", title: "Tax-Free Wealth", desc: "IUL or tax-advantaged growth account funded." },
    { id: "step6", title: "Business Safety", desc: "Key person or executive bonus in place." },
    { id: "step7", title: "Estate Planning", desc: "Trusts and Wills finalized. Probate avoided." }
  ];

  const stepsES = [
    { id: "step1", title: "Flujo de Caja y Deuda", desc: "Presupuesto establecido y plan de deuda iniciado." },
    { id: "step2", title: "Fondo de Emergencia", desc: "3-6 meses de reservas líquidas aseguradas." },
    { id: "step3", title: "Beneficios en Vida", desc: "Seguro de vida con enfermedades críticas activo." },
    { id: "step4", title: "Optimización de Jubilación", desc: "Rollover de 401(k) o anualidad establecida." },
    { id: "step5", title: "Riqueza Libre de Impuestos", desc: "IUL o cuenta con ventajas fiscales financiada." },
    { id: "step6", title: "Seguridad Comercial", desc: "Seguro de persona clave o bono ejecutivo activo." },
    { id: "step7", title: "Planificación Patrimonial", desc: "Fideicomisos y testamentos finalizados." }
  ];

  const currentSteps = isEs ? stepsES : stepsEN;

  const t = {
    title: isEs ? "Lista de Progreso" : "Progress Checklist",
    desc: isEs ? "Marque los pasos. Se guarda en su celular." : "Check off the steps. Progress saves locally."
  };

  const progressPercent = Math.round((completedSteps.length / currentSteps.length) * 100);

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <div style={styles.iconBox}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
        </div>
        <div style={{ flexGrow: 1 }}>
          <h3 style={styles.title}>{t.title}</h3>
          <p style={styles.desc}>{t.desc}</p>
        </div>
        <div style={styles.percentText}>{progressPercent}%</div>
      </div>

      {/* Progress Bar Line */}
      <div style={{ width: "100%", height: "4px", background: "var(--border-light)" }}>
        <div style={{ width: `${progressPercent}%`, height: "100%", background: "var(--gold)", transition: "width 0.5s ease" }}></div>
      </div>

      <div style={styles.body}>
        {currentSteps.map((step) => {
          const isDone = completedSteps.includes(step.id);
          return (
            <div key={step.id} onClick={() => toggleStep(step.id)} style={{...styles.stepRow, background: isDone ? "var(--bg-page)" : "rgba(0,0,0,0.02)", border: isDone ? "1px solid var(--gold)" : "1px solid transparent"}}>
              <div style={{...styles.checkCircle, background: isDone ? "var(--gold)" : "transparent", border: isDone ? "none" : "2px solid #ccc"}}>
                {isDone && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>}
              </div>
              <div>
                <h4 style={{ fontSize: "1rem", color: isDone ? "var(--gold)" : "var(--text-main)", marginBottom: "0.2rem", textDecoration: isDone ? "line-through" : "none" }}>{step.title}</h4>
                <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", margin: 0, textDecoration: isDone ? "line-through" : "none" }}>{step.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const styles = {
  card: { background: "var(--bg-page)", borderRadius: "24px", border: "1px solid var(--border-light)", boxShadow: "0 10px 40px rgba(0,0,0,0.04)", overflow: "hidden", display: "flex", flexDirection: "column", height: "100%" },
  header: { display: "flex", alignItems: "center", gap: "1rem", padding: "2rem 2rem 1.5rem", background: "var(--bg-card)" },
  iconBox: { width: "48px", height: "48px", borderRadius: "12px", background: "rgba(212, 175, 55, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(212, 175, 55, 0.3)", flexShrink: 0 },
  title: { fontSize: "1.5rem", color: "var(--text-main)", margin: 0 },
  desc: { fontSize: "0.9rem", color: "var(--text-muted)", margin: 0 },
  percentText: { fontSize: "1.5rem", fontWeight: "bold", color: "var(--gold)" },
  body: { padding: "1.5rem", display: "flex", flexDirection: "column", gap: "0.8rem", overflowY: "auto" },
  stepRow: { display: "flex", alignItems: "center", gap: "1rem", padding: "1rem", borderRadius: "12px", cursor: "pointer", transition: "all 0.2s" },
  checkCircle: { width: "24px", height: "24px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }
};