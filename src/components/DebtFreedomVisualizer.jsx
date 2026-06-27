"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const STORAGE_KEY = "legacyInMotionDebt_v1";

function loadSaved() {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveValues(debt, rate, payment) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ debt, rate, payment }));
}

export default function DebtFreedomVisualizer({ onValuesChange }) {
  const pathname = usePathname() || "";
  const isPortal = pathname.startsWith("/dashboard");
  const saved = loadSaved();

  const [debt, setDebt] = useState(saved?.debt ?? (isPortal ? 0 : 10000));
  const [rate, setRate] = useState(saved?.rate ?? 22);
  const [payment, setPayment] = useState(saved?.payment ?? 300);

  useEffect(() => {
    if (isPortal) {
      const s = loadSaved();
      if (s) {
        setDebt(s.debt ?? 0);
        setRate(s.rate ?? 22);
        setPayment(s.payment ?? 300);
      }
    }
  }, [isPortal]);

  useEffect(() => {
    if (isPortal) saveValues(debt, rate, payment);
    onValuesChange?.({ debt, rate, payment });
  }, [debt, rate, payment, isPortal, onValuesChange]);

  const monthlyRate = rate / 100 / 12;

  let months = 0;
  let balance = debt;
  let totalInterest = 0;

  const minPayment = debt * monthlyRate;
  const isImpossible = debt > 0 && payment <= minPayment;

  if (!isImpossible && debt > 0) {
    while (balance > 0 && months < 600) {
      const interestForMonth = balance * monthlyRate;
      totalInterest += interestForMonth;
      balance = balance + interestForMonth - payment;
      months++;
    }
  }

  const formatCurrency = (num) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(num);

  const inputStyle = {
    width: "100%",
    padding: "0.8rem",
    borderRadius: "8px",
    border: "1px solid var(--border-light)",
    background: "var(--bg-page)",
    fontSize: "1rem",
    color: "var(--text-main)",
    outline: "none",
  };

  const update = (setter, key) => (e) => {
    const val = Number(e.target.value) || 0;
    setter(val);
  };

  return (
    <div
      style={{
        background: "var(--bg-card)",
        padding: "2rem",
        borderRadius: "16px",
        border: "1px solid var(--border-light)",
        boxShadow: "var(--shadow-md)",
        height: "100%",
      }}
    >
      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1rem", marginBottom: "2rem" }}>
        <div>
          <label style={{ display: "block", color: "var(--text-muted)", fontSize: "0.85rem", textTransform: "uppercase", marginBottom: "0.4rem" }}>
            Total credit card / consumer debt
          </label>
          <input
            type="number"
            value={debt || ""}
            onChange={update(setDebt)}
            style={inputStyle}
            placeholder={isPortal ? "e.g. 8500" : undefined}
          />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          <div>
            <label style={{ display: "block", color: "var(--text-muted)", fontSize: "0.85rem", textTransform: "uppercase", marginBottom: "0.4rem" }}>
              Interest rate (%)
            </label>
            <input type="number" value={rate} onChange={update(setRate)} style={inputStyle} />
          </div>
          <div>
            <label style={{ display: "block", color: "var(--text-muted)", fontSize: "0.85rem", textTransform: "uppercase", marginBottom: "0.4rem" }}>
              Monthly payment
            </label>
            <input type="number" value={payment} onChange={update(setPayment)} style={inputStyle} />
          </div>
        </div>
      </div>

      <div style={{ background: "var(--bg-dark)", padding: "1.5rem", borderRadius: "12px", textAlign: "center", color: "#fff" }}>
        {debt <= 0 ? (
          <p style={{ color: "#a0a0a0", padding: "1rem 0" }}>Enter your debt balance to see payoff time and interest cost.</p>
        ) : isImpossible ? (
          <div style={{ color: "#ff4d4d", fontWeight: "bold", fontSize: "1.1rem", padding: "1rem 0" }}>
            Payment doesn&apos;t cover interest — increase payment or ask your advisor about payoff strategies.
          </div>
        ) : (
          <>
            <p style={{ color: "#a0a0a0", textTransform: "uppercase", letterSpacing: "1px", fontSize: "0.85rem", marginBottom: "0.5rem" }}>
              Total interest paid (estimate)
            </p>
            <div style={{ fontSize: "2.5rem", color: "#ff4d4d", fontWeight: "bold", lineHeight: "1", marginBottom: "1rem" }}>
              {formatCurrency(totalInterest)}
            </div>
            <div style={{ borderTop: "1px solid #333", paddingTop: "1rem", display: "flex", justifyContent: "space-between", fontSize: "0.9rem" }}>
              <span style={{ color: "#a0a0a0" }}>Debt-free in about</span>
              <span style={{ color: "var(--gold)", fontWeight: "bold" }}>
                {Math.floor(months / 12)} yrs, {months % 12} mos
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
