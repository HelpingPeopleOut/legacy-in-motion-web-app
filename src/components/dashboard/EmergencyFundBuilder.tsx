"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, PiggyBank, Trophy } from "lucide-react";
import { readVitalSignsPrefill } from "@/lib/portal-prefill";

const STORAGE_KEY = "legacyInMotionEmergencyFund_v1";

type FundData = {
  monthlyExpenses: number;
  currentSavings: number;
  monthlyContribution: number;
  targetMonths: number;
};

const EMPTY: FundData = {
  monthlyExpenses: 0,
  currentSavings: 0,
  monthlyContribution: 200,
  targetMonths: 6,
};

function load(): FundData {
  if (typeof window === "undefined") return EMPTY;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...EMPTY, ...JSON.parse(raw) };
    const v = readVitalSignsPrefill();
    return {
      ...EMPTY,
      monthlyExpenses: v.monthlyExpenses,
      currentSavings: v.cashSavings,
    };
  } catch {
    return EMPTY;
  }
}

function fmt(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

const MILESTONES = [
  { key: "starter", label: "$500 starter", amount: 500 },
  { key: "1mo", label: "1 month of bills", months: 1 },
  { key: "3mo", label: "3 months", months: 3 },
  { key: "6mo", label: "6 months (goal)", months: 6 },
];

export default function EmergencyFundBuilder() {
  const [data, setData] = useState<FundData>(EMPTY);

  useEffect(() => {
    setData(load());
  }, []);

  const patch = useCallback((p: Partial<FundData>) => {
    setData((prev) => {
      const next = { ...prev, ...p };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const goal = data.monthlyExpenses * data.targetMonths;
  const progress = goal > 0 ? Math.min(100, (data.currentSavings / goal) * 100) : 0;
  const remaining = Math.max(0, goal - data.currentSavings);
  const monthsToGoal =
    data.monthlyContribution > 0 && remaining > 0
      ? Math.ceil(remaining / data.monthlyContribution)
      : remaining <= 0
        ? 0
        : null;

  const milestones = useMemo(() => {
    if (data.monthlyExpenses <= 0) return [];
    return MILESTONES.map((m) => {
      const target =
        "amount" in m && m.amount
          ? m.amount
          : data.monthlyExpenses * (m.months ?? 0);
      const done = data.currentSavings >= target;
      return { ...m, target, done };
    });
  }, [data.currentSavings, data.monthlyExpenses]);

  return (
    <div className="space-y-5">
      <div className="portal-card p-5 md:p-6">
        <p className="portal-hub-eyebrow mb-1">
          <PiggyBank className="h-3.5 w-3.5" aria-hidden />
          Safety net
        </p>
        <h2 className="text-lg font-semibold text-[var(--color-portal-text)]">
          Build your emergency fund — one step at a time
        </h2>
        <p className="mt-1 text-sm text-[var(--color-portal-muted)]">
          Most families aim for 3–6 months of bills in cash. Enter rough numbers — we show progress and
          how long it could take at your savings pace.
        </p>
      </div>

      <div className="portal-card p-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="legacy-vault-field">
            <span>Monthly bills (rough)</span>
            <input
              type="number"
              value={data.monthlyExpenses || ""}
              onChange={(e) => patch({ monthlyExpenses: Number(e.target.value) || 0 })}
              className="legacy-vault-input"
              placeholder="e.g. 4500"
            />
          </label>
          <label className="legacy-vault-field">
            <span>Already saved (cash)</span>
            <input
              type="number"
              value={data.currentSavings || ""}
              onChange={(e) => patch({ currentSavings: Number(e.target.value) || 0 })}
              className="legacy-vault-input"
              placeholder="e.g. 2000"
            />
          </label>
          <label className="legacy-vault-field">
            <span>Save per month toward fund</span>
            <input
              type="number"
              value={data.monthlyContribution || ""}
              onChange={(e) => patch({ monthlyContribution: Number(e.target.value) || 0 })}
              className="legacy-vault-input"
              placeholder="e.g. 200"
            />
          </label>
          <label className="legacy-vault-field">
            <span>Target (months of bills)</span>
            <select
              value={data.targetMonths}
              onChange={(e) => patch({ targetMonths: Number(e.target.value) })}
              className="legacy-vault-input"
            >
              <option value={3}>3 months — minimum cushion</option>
              <option value={4}>4 months</option>
              <option value={5}>5 months</option>
              <option value={6}>6 months — strong cushion</option>
            </select>
          </label>
        </div>
      </div>

      {data.monthlyExpenses > 0 && (
        <>
          <div className="portal-card border-[var(--color-portal-gold)] bg-[var(--color-portal-gold-light)] p-5 text-center">
            <p className="text-xs font-semibold uppercase text-[var(--color-portal-gold)]">Your goal</p>
            <p className="text-3xl font-bold text-[var(--color-portal-text)]">{fmt(goal)}</p>
            <p className="mt-1 text-sm text-[var(--color-portal-muted)]">
              {data.targetMonths} months × {fmt(data.monthlyExpenses)}/mo
            </p>
            <div className="mx-auto mt-4 h-3 max-w-md overflow-hidden rounded-full bg-white/80">
              <div
                className="h-full rounded-full bg-[var(--color-portal-gold)] transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="mt-2 text-sm font-medium">
              {progress >= 100 ? (
                <span className="inline-flex items-center gap-1 text-[var(--color-portal-accent)]">
                  <Trophy className="h-4 w-4" /> Goal reached — maintain this cushion
                </span>
              ) : (
                <>
                  {fmt(data.currentSavings)} saved · {progress.toFixed(0)}% · {fmt(remaining)} to go
                  {monthsToGoal !== null && monthsToGoal > 0 && (
                    <> · ~{monthsToGoal} months at {fmt(data.monthlyContribution)}/mo</>
                  )}
                </>
              )}
            </p>
          </div>

          <ul className="grid gap-2 sm:grid-cols-2">
            {milestones.map((m) => (
              <li
                key={m.key}
                className={`portal-card p-3 text-sm ${m.done ? "border-emerald-200 bg-emerald-50/60" : ""}`}
              >
                <span className={m.done ? "font-semibold text-emerald-800" : "text-[var(--color-portal-text)]"}>
                  {m.done ? "✓ " : ""}
                  {m.label}
                </span>
                <span className="ml-1 text-[var(--color-portal-muted)]">({fmt(m.target)})</span>
              </li>
            ))}
          </ul>
        </>
      )}

      <p className="text-xs text-[var(--color-portal-muted)]">
        Completed your 2-minute checkup?{" "}
        <Link href="/dashboard/tools/financial-vital-signs" className="font-semibold text-[var(--color-portal-gold)] underline">
          Financial Vital Signs
        </Link>{" "}
        tracks cushion alongside protection and debt.
      </p>
    </div>
  );
}
