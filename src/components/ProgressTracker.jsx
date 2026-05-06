"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ProgressTracker() {
  const pathname = usePathname() || "";
  const isEs = pathname.startsWith("/es");

  const [completedSteps, setCompletedSteps] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const t = {
    title: isEs ? "Lista de Progreso" : "Progress Checklist",
    desc: isEs ? "Asegure su fortaleza financiera paso a paso." : "Check off the steps as you secure your financial fortress.",
  };

  const steps = isEs ? [
    { id: "step1", title: "Flujo de Caja y Deudas", desc: "Presupuesto establecido y bola de nieve de deudas iniciada." },
    { id: "step2", title: "Fondo de Emergencia", desc: "3-6 meses de reservas líquidas aseguradas." },
    { id: "step3", title: "Beneficios en Vida", desc: "Seguro de vida con cobertura de enfermedades críticas activo." },
    { id: "step4", title: "Optimización de Jubilación", desc: "Transferencia de 401(k) o anualidad establecida." },
    { id: "step5", title: "Riqueza sin Impuestos", desc: "Cuenta de crecimiento con ventajas fiscales (IUL) financiada." },
    { id: "step6", title: "Seguridad Empresarial", desc: "Seguro de persona clave o bono ejecutivo vigente." },
    { id: "step7", title: "Planificación de Legado", desc: "Fideicomisos y testamentos finalizados. Sucesión evitada." }
  ] : [
    { id: "step1", title: "Cash Flow & Debt", desc: "Budget established and debt snowball started." },
    { id: "step2", title: "Emergency Fund", desc: "3-6 months of liquid reserves secured." },
    { id: "step3", title: "Living Benefits", desc: "Life insurance with critical illness coverage active." },
    { id: "step4", title: "Retirement Optimization", desc: "401(k) rolled over or annuity established." },
    { id: "step5", title: "Tax-Free Wealth", desc: "IUL or tax-advantaged growth account funded." },
    { id: "step6", title: "Business Safety", desc: "Key person insurance or executive bonus in place." },
    { id: "step7", title: "Estate & Legacy", desc: "Trusts and Wills finalized. Probate avoided." }
  ];

  useEffect(() => {
    const saved = localStorage.getItem("legacyProgress");
    if (saved) setCompletedSteps(JSON.parse(saved));
    setIsLoaded(true);
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

  if (!isLoaded) return null;

  const progressPercent = Math.round((completedSteps.length / steps.length) * 100);

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <div style={styles.iconBox}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
        </div>
        <div>
          <h3 style={styles.title}>{t.title}</h3>
          <p style={styles.desc}>{t.desc}</p>
        </div>
      </div>

      <div style={styles.progressBarWrapper}>
        <div style={{...styles.progressBarFill, width: `${progressPercent}%`}}></div>
      </div>
      <div style={styles.progressText}>{progressPercent}% {isEs ? "Completado" : "Completed"}</div>

      <div style={styles.body}>
        {steps.map((step, index) => {
          const isDone = completedSteps.includes(step.id);
          return (
            <div key={step.id} onClick={() => toggleStep(step.id)} style={{...styles.stepRow, background: isDone ? "rgba(212, 175, 55, 0.05)" : "transparent", border: isDone ? "1px solid var(--gold)" : "1px solid var(--border-light)"}}>
              <div style={{...styles.checkbox, background: isDone ? "var(--gold)" : "transparent", border: isDone ? "none" : "2px solid #ccc"}}>
                {isDone && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>}
              </div>
              <div>
                <h4 style={{...styles.stepTitle, color: isDone ? "var(--gold)" : "var(--text-main)", textDecoration: isDone ? "line-through" : "none" }}>{index + 1}. {step.title}</h4>
                <p style={styles.stepDesc}>{step.desc}</p>
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
  header: { display: "flex", alignItems: "center", gap: "1rem", padding: "1.5rem", background: "var(--bg-card)", flexWrap: "wrap" },
  iconBox: { width: "48px", height: "48px", borderRadius: "12px", background: "rgba(212, 175, 55, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(212, 175, 55, 0.3)", flexShrink: 0 },
  title: { fontSize: "1.4rem", color: "var(--text-main)", margin: 0 },
  desc: { fontSize: "0.85rem", color: "var(--text-muted)", margin: 0 },
  progressBarWrapper: { height: "4px", background: "var(--border-light)", width: "100%" },
  progressBarFill: { height: "100%", background: "var(--gold)", transition: "width 0.5s ease" },
  progressText: { textAlign: "right", fontSize: "0.8rem", color: "var(--gold)", fontWeight: "bold", padding: "0.5rem 1.5rem 0" },
  body: { padding: "1rem 1.5rem 1.5rem", display: "flex", flexDirection: "column", gap: "0.8rem", flexGrow: 1 },
  stepRow: { display: "flex", alignItems: "flex-start", gap: "1rem", padding: "1rem", borderRadius: "12px", cursor: "pointer", transition: "all 0.2s", touchAction: "manipulation" },
  checkbox: { width: "24px", height: "24px", borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" },
  stepTitle: { fontSize: "1rem", marginBottom: "0.2rem", fontWeight: "600" },
  stepDesc: { fontSize: "0.85rem", color: "var(--text-muted)", margin: 0, lineHeight: "1.4" }
};