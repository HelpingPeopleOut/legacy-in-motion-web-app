"use client";

import { useState, useEffect } from "react";

const STEPS = [
  { id: "step1", title: "Cash Flow & Debt Elimination", desc: "Budget established and debt snowball started." },
  { id: "step2", title: "Emergency Fund", desc: "3-6 months of liquid reserves secured." },
  { id: "step3", title: "Living Benefits Protection", desc: "Life insurance with critical illness coverage active." },
  { id: "step4", title: "Retirement Optimization", desc: "401(k) rolled over or annuity established." },
  { id: "step5", title: "Tax-Free Wealth", desc: "IUL or tax-advantaged growth account funded." },
  { id: "step6", title: "Business Financial Safety", desc: "Key person insurance or executive bonus in place." },
  { id: "step7", title: "Estate & Legacy Planning", desc: "Trusts and Wills finalized. Probate avoided." }
];

export default function ProgressTracker() {
  const [completedSteps, setCompletedSteps] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Load saved progress from their phone's local storage
    const saved = localStorage.getItem("legacyProgress");
    if (saved) {
      setCompletedSteps(JSON.parse(saved));
    }
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

  if (!isLoaded) return null; // Prevent hydration flash

  const progressPercentage = Math.round((completedSteps.length / STEPS.length) * 100);

  return (
    <div style={{ background: "var(--bg-card)", padding: "2rem", borderRadius: "16px", border: "1px solid var(--border-light)", boxShadow: "var(--shadow-sm)" }}>
      <h3 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>Your Fortress Blueprint</h3>
      <p style={{ color: "var(--text-muted)", marginBottom: "1.5rem", fontSize: "0.95rem" }}>Check off the steps as we complete them together. Your progress is saved securely on your device.</p>
      
      {/* Progress Bar */}
      <div style={{ width: "100%", height: "8px", background: "var(--border-light)", borderRadius: "4px", marginBottom: "2rem", overflow: "hidden" }}>
        <div style={{ width: `${progressPercentage}%`, height: "100%", background: "var(--gold)", transition: "width 0.5s ease" }}></div>
      </div>
      <p style={{ textAlign: "right", marginTop: "-1.5rem", marginBottom: "2rem", fontSize: "0.85rem", fontWeight: "bold", color: "var(--gold)" }}>{progressPercentage}% Complete</p>

      {/* Checklist */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {STEPS.map((step, index) => {
          const isDone = completedSteps.includes(step.id);
          return (
            <div 
              key={step.id} 
              onClick={() => toggleStep(step.id)}
              style={{
                display: "flex", alignItems: "flex-start", gap: "1rem", padding: "1rem", 
                background: isDone ? "var(--bg-page)" : "transparent",
                border: isDone ? "1px solid var(--gold)" : "1px solid var(--border-light)",
                borderRadius: "8px", cursor: "pointer", transition: "all 0.2s"
              }}
            >
              <div style={{ 
                width: "24px", height: "24px", borderRadius: "50%", border: isDone ? "none" : "2px solid #ccc", 
                background: isDone ? "var(--gold)" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", color: "#000", fontWeight: "bold", flexShrink: 0
              }}>
                {isDone && "✓"}
              </div>
              <div>
                <h4 style={{ fontSize: "1.05rem", color: isDone ? "var(--gold)" : "var(--text-main)", marginBottom: "0.2rem", textDecoration: isDone ? "line-through" : "none" }}>
                  {index + 1}. {step.title}
                </h4>
                <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>{step.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}