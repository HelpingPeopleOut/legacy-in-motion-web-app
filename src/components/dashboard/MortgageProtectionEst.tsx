"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Home } from "lucide-react";
import { readHlvPrefill, readVitalSignsPrefill } from "@/lib/portal-prefill";

function parseMoney(value: string) {
  const n = Number(value.replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) ? n : 0;
}

function formatMoney(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

export default function MortgageProtectionEst() {
  const [mortgage, setMortgage] = useState("");
  const [income, setIncome] = useState("");
  const [years, setYears] = useState("10");

  useEffect(() => {
    const hlv = readHlvPrefill();
    const vital = readVitalSignsPrefill();
    if (hlv.mortgage) setMortgage(String(hlv.mortgage));
    if (hlv.income) setIncome(String(hlv.income));
    else if (vital.monthlyIncome) setIncome(String(Math.round(vital.monthlyIncome * 12)));
  }, []);

  const result = useMemo(() => {
    const balance = parseMoney(mortgage);
    const annualIncome = parseMoney(income);
    const replaceYears = Math.min(30, Math.max(1, Number(years) || 10));

    const incomeReplacement = annualIncome * replaceYears;
    const minimum = Math.max(balance, annualIncome * 3);
    const recommended = Math.max(balance + annualIncome * replaceYears * 0.5, minimum);
    const upper = balance + incomeReplacement;

    return { balance, annualIncome, replaceYears, minimum, recommended, upper };
  }, [mortgage, income, years]);

  return (
    <div className="space-y-5">
      <div className="portal-card p-5 md:p-6">
        <p className="portal-hub-eyebrow mb-1">
          <Home className="h-3.5 w-3.5" aria-hidden />
          Quick estimate
        </p>
        <h2 className="text-lg font-semibold text-[var(--color-portal-text)]">
          Mortgage & income protection band
        </h2>
        <p className="mt-1 text-sm text-[var(--color-portal-muted)]">
          A starting point — not a quote. Prefills from your HLV or Vital Signs when available.
        </p>
      </div>

      <div className="portal-card grid gap-4 p-5 sm:grid-cols-3">
        <label className="legacy-vault-field">
          <span>Mortgage balance</span>
          <input
            value={mortgage}
            onChange={(e) => setMortgage(e.target.value)}
            className="legacy-vault-input"
            inputMode="decimal"
          />
        </label>
        <label className="legacy-vault-field">
          <span>Household income / year</span>
          <input
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            className="legacy-vault-input"
            inputMode="decimal"
          />
        </label>
        <label className="legacy-vault-field">
          <span>Years of income to replace</span>
          <input
            type="number"
            min={1}
            max={30}
            value={years}
            onChange={(e) => setYears(e.target.value)}
            className="legacy-vault-input"
          />
        </label>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <div className="portal-card p-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-portal-muted)]">Minimum</p>
          <p className="mt-1 text-xl font-bold text-[var(--color-portal-text)]">{formatMoney(result.minimum)}</p>
          <p className="mt-1 text-xs text-[var(--color-portal-muted)]">Mortgage or 3× income</p>
        </div>
        <div className="portal-card border-[var(--color-portal-gold)] bg-[var(--color-portal-gold-light)] p-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-portal-gold)]">Suggested</p>
          <p className="mt-1 text-2xl font-bold text-[var(--color-portal-text)]">{formatMoney(result.recommended)}</p>
          <p className="mt-1 text-xs text-[var(--color-portal-muted)]">Mortgage + partial income</p>
        </div>
        <div className="portal-card p-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-portal-muted)]">Comprehensive</p>
          <p className="mt-1 text-xl font-bold text-[var(--color-portal-text)]">{formatMoney(result.upper)}</p>
          <p className="mt-1 text-xs text-[var(--color-portal-muted)]">Mortgage + full income window</p>
        </div>
      </div>

      <p className="text-xs text-[var(--color-portal-muted)]">
        For a precise number, use the{" "}
        <a href="/dashboard/tools/human-life-value" className="font-semibold text-[var(--color-portal-gold)] underline">
          Human Life Value Analyzer
        </a>{" "}
        with your advisor.
      </p>
    </div>
  );
}
