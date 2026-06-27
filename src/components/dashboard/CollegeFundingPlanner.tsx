"use client";

import { useMemo, useState } from "react";
import { GraduationCap } from "lucide-react";

const ANNUAL_COST = 28000;
const INFLATION = 0.05;
const RETURN_RATE = 0.06;

function parseNum(value: string) {
  const n = Number(value.replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) ? n : 0;
}

function formatMoney(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

/** Future value of monthly contributions */
function monthlyPayment(futureCost: number, years: number, existing: number) {
  const months = years * 12;
  const r = RETURN_RATE / 12;
  const fvExisting = existing * (1 + RETURN_RATE) ** years;
  const need = Math.max(0, futureCost - fvExisting);
  if (months <= 0 || need === 0) return 0;
  if (r === 0) return need / months;
  return (need * r) / ((1 + r) ** months - 1);
}

export default function CollegeFundingPlanner() {
  const [children, setChildren] = useState("1");
  const [yearsUntil, setYearsUntil] = useState("10");
  const [yearsInSchool, setYearsInSchool] = useState("4");
  const [saved, setSaved] = useState("0");

  const result = useMemo(() => {
    const count = Math.max(1, Math.min(6, Number(children) || 1));
    const until = Math.max(1, Math.min(18, Number(yearsUntil) || 1));
    const inSchool = Math.max(1, Math.min(6, Number(yearsInSchool) || 4));
    const existing = parseNum(saved);

    const costPerYearFuture = ANNUAL_COST * (1 + INFLATION) ** until;
    const totalPerChild = costPerYearFuture * inSchool;
    const totalAll = totalPerChild * count;
    const monthly = monthlyPayment(totalAll, until, existing);

    return { count, until, inSchool, costPerYearFuture, totalPerChild, totalAll, monthly, existing };
  }, [children, yearsUntil, yearsInSchool, saved]);

  return (
    <div className="space-y-5">
      <div className="portal-card p-5 md:p-6">
        <p className="portal-hub-eyebrow mb-1">
          <GraduationCap className="h-3.5 w-3.5" aria-hidden />
          Family planning
        </p>
        <h2 className="text-lg font-semibold text-[var(--color-portal-text)]">College funding planner</h2>
        <p className="mt-1 text-sm text-[var(--color-portal-muted)]">
          Rough estimate using ~{formatMoney(ANNUAL_COST)}/yr today, 5% education inflation, and 6% growth
          on savings. Perfect for workshops and HLV conversations.
        </p>
      </div>

      <div className="portal-card grid gap-4 p-5 sm:grid-cols-2 lg:grid-cols-4">
        <label className="legacy-vault-field">
          <span>Children to fund</span>
          <input
            type="number"
            min={1}
            max={6}
            value={children}
            onChange={(e) => setChildren(e.target.value)}
            className="legacy-vault-input"
          />
        </label>
        <label className="legacy-vault-field">
          <span>Years until college</span>
          <input
            type="number"
            min={1}
            max={18}
            value={yearsUntil}
            onChange={(e) => setYearsUntil(e.target.value)}
            className="legacy-vault-input"
          />
        </label>
        <label className="legacy-vault-field">
          <span>Years in school each</span>
          <input
            type="number"
            min={1}
            max={6}
            value={yearsInSchool}
            onChange={(e) => setYearsInSchool(e.target.value)}
            className="legacy-vault-input"
          />
        </label>
        <label className="legacy-vault-field">
          <span>Already saved</span>
          <input
            value={saved}
            onChange={(e) => setSaved(e.target.value)}
            className="legacy-vault-input"
            inputMode="decimal"
          />
        </label>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <div className="portal-card p-4">
          <p className="text-xs font-semibold uppercase text-[var(--color-portal-muted)]">Per child (future $)</p>
          <p className="mt-1 text-xl font-bold">{formatMoney(result.totalPerChild)}</p>
        </div>
        <div className="portal-card border-[var(--color-portal-gold)] bg-[var(--color-portal-gold-light)] p-4">
          <p className="text-xs font-semibold uppercase text-[var(--color-portal-gold)]">Total goal</p>
          <p className="mt-1 text-2xl font-bold">{formatMoney(result.totalAll)}</p>
        </div>
        <div className="portal-card p-4">
          <p className="text-xs font-semibold uppercase text-[var(--color-portal-muted)]">Save monthly</p>
          <p className="mt-1 text-xl font-bold text-[var(--color-portal-accent)]">{formatMoney(result.monthly)}</p>
        </div>
      </div>
    </div>
  );
}
