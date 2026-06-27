"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Baby, GitBranch, Home, Palmtree } from "lucide-react";
import { readVitalSignsPrefill } from "@/lib/portal-prefill";

const STORAGE_KEY = "legacyInMotionWhatIf_v2";
const BASE_KEY = "legacyInMotionWhatIf_base_v2";

type BasePlan = {
  monthlyIncome: number;
  monthlyExpenses: number;
  coverageInForce: number;
};

type Scenarios = {
  newHome: boolean;
  newHomePayment: number;
  newChild: boolean;
  newChildCost: number;
  earlyRetire: boolean;
  earlyRetireYears: number;
};

const EMPTY_BASE: BasePlan = { monthlyIncome: 0, monthlyExpenses: 0, coverageInForce: 0 };
const EMPTY_SCENARIOS: Scenarios = {
  newHome: false,
  newHomePayment: 1500,
  newChild: false,
  newChildCost: 800,
  earlyRetire: false,
  earlyRetireYears: 5,
};

function loadBase(): BasePlan {
  if (typeof window === "undefined") return EMPTY_BASE;
  try {
    const raw = localStorage.getItem(BASE_KEY);
    if (raw) return { ...EMPTY_BASE, ...JSON.parse(raw) };
    const v = readVitalSignsPrefill();
    return {
      monthlyIncome: v.monthlyIncome,
      monthlyExpenses: v.monthlyExpenses,
      coverageInForce: v.lifeInsurance,
    };
  } catch {
    return EMPTY_BASE;
  }
}

function fmt(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

export default function WhatIfScenarios() {
  const [base, setBase] = useState<BasePlan>(EMPTY_BASE);
  const [scenarios, setScenarios] = useState<Scenarios>(EMPTY_SCENARIOS);

  useEffect(() => {
    setBase(loadBase());
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setScenarios({ ...EMPTY_SCENARIOS, ...JSON.parse(raw) });
    } catch {
      /* ignore */
    }
  }, []);

  const saveBase = useCallback((p: Partial<BasePlan>) => {
    setBase((prev) => {
      const next = { ...prev, ...p };
      localStorage.setItem(BASE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const saveScenarios = useCallback((p: Partial<Scenarios>) => {
    setScenarios((prev) => {
      const next = { ...prev, ...p };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const result = useMemo(() => {
    let expenses = base.monthlyExpenses;
    let income = base.monthlyIncome;
    const active: string[] = [];

    if (scenarios.newHome) {
      expenses += scenarios.newHomePayment;
      active.push("new home");
    }
    if (scenarios.newChild) {
      expenses += scenarios.newChildCost;
      active.push("new child");
    }
    if (scenarios.earlyRetire) {
      income *= Math.max(0.2, 1 - scenarios.earlyRetireYears * 0.07);
      active.push("early retirement");
    }

    const surplus = income - expenses;
    const annualIncome = income * 12;
    let suggestedCoverage = annualIncome * 10;
    if (scenarios.newHome) suggestedCoverage += 300000;
    if (scenarios.newChild) suggestedCoverage += 150000;
    const coverageGap = Math.max(0, suggestedCoverage - base.coverageInForce);

    let priority: { label: string; href: string } | null = null;
    if (surplus < 0) priority = { label: "Review cash flow with advisor", href: "/#consultation" };
    else if (coverageGap > 50000)
      priority = { label: "Run full needs analysis (HLV)", href: "/dashboard/tools/human-life-value" };
    else if (scenarios.newHome)
      priority = { label: "Mortgage protection estimate", href: "/dashboard/tools/mortgage-protection" };

    return { surplus, suggestedCoverage, coverageGap, active, priority };
  }, [base, scenarios]);

  const toggles = [
    { key: "newHome" as const, icon: Home, title: "Buy a home", desc: "Adds housing payment to monthly bills" },
    { key: "newChild" as const, icon: Baby, title: "Have a child", desc: "Adds childcare & family costs" },
    { key: "earlyRetire" as const, icon: Palmtree, title: "Retire early", desc: "Less earned income for a period" },
  ];

  return (
    <div className="space-y-5">
      <div className="portal-card p-5 md:p-6">
        <p className="portal-hub-eyebrow mb-1">
          <GitBranch className="h-3.5 w-3.5" aria-hidden />
          Planning together
        </p>
        <h2 className="text-lg font-semibold text-[var(--color-portal-text)]">
          What happens if life changes?
        </h2>
        <p className="mt-1 text-sm text-[var(--color-portal-muted)]">
          Toggle one life event at a time during a meeting — see cash-flow impact and whether protection
          might need to increase. Rough numbers are fine.
        </p>
      </div>

      <div className="portal-card p-5">
        <h3 className="mb-1 font-semibold">Today (baseline)</h3>
        <p className="mb-4 text-sm text-[var(--color-portal-muted)]">Prefills from Vital Signs when available.</p>
        <div className="grid gap-4 sm:grid-cols-3">
          <label className="legacy-vault-field">
            <span>Monthly take-home</span>
            <input
              type="number"
              value={base.monthlyIncome || ""}
              onChange={(e) => saveBase({ monthlyIncome: Number(e.target.value) || 0 })}
              className="legacy-vault-input"
              placeholder="e.g. 7000"
            />
          </label>
          <label className="legacy-vault-field">
            <span>Monthly bills</span>
            <input
              type="number"
              value={base.monthlyExpenses || ""}
              onChange={(e) => saveBase({ monthlyExpenses: Number(e.target.value) || 0 })}
              className="legacy-vault-input"
              placeholder="e.g. 5200"
            />
          </label>
          <label className="legacy-vault-field">
            <span>Life insurance now (0 if none)</span>
            <input
              type="number"
              value={base.coverageInForce || ""}
              onChange={(e) => saveBase({ coverageInForce: Number(e.target.value) || 0 })}
              className="legacy-vault-input"
              placeholder="e.g. 500000"
            />
          </label>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        {toggles.map(({ key, icon: Icon, title, desc }) => (
          <div
            key={key}
            className={`portal-card p-4 ${scenarios[key] ? "border-[var(--color-portal-gold)] bg-[var(--color-portal-gold-light)]/50" : ""}`}
          >
            <label className="flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                checked={scenarios[key]}
                onChange={(e) => saveScenarios({ [key]: e.target.checked })}
                className="mt-1 h-4 w-4 accent-[var(--color-portal-gold)]"
              />
              <span>
                <Icon className="mb-1 h-5 w-5 text-[var(--color-portal-gold)]" />
                <span className="block font-semibold">{title}</span>
                <span className="text-sm text-[var(--color-portal-muted)]">{desc}</span>
              </span>
            </label>
            {scenarios.newHome && key === "newHome" && (
              <label className="legacy-vault-field mt-3">
                <span>Extra housing / month</span>
                <input
                  type="number"
                  value={scenarios.newHomePayment || ""}
                  onChange={(e) => saveScenarios({ newHomePayment: Number(e.target.value) || 0 })}
                  className="legacy-vault-input"
                />
              </label>
            )}
            {scenarios.newChild && key === "newChild" && (
              <label className="legacy-vault-field mt-3">
                <span>Extra family cost / month</span>
                <input
                  type="number"
                  value={scenarios.newChildCost || ""}
                  onChange={(e) => saveScenarios({ newChildCost: Number(e.target.value) || 0 })}
                  className="legacy-vault-input"
                />
              </label>
            )}
            {scenarios.earlyRetire && key === "earlyRetire" && (
              <label className="legacy-vault-field mt-3">
                <span>Years before full retirement income</span>
                <input
                  type="number"
                  min={1}
                  max={15}
                  value={scenarios.earlyRetireYears}
                  onChange={(e) => saveScenarios({ earlyRetireYears: Number(e.target.value) || 5 })}
                  className="legacy-vault-input"
                />
              </label>
            )}
          </div>
        ))}
      </div>

      {base.monthlyIncome > 0 && base.monthlyExpenses > 0 && (
        <>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="portal-card p-4">
              <p className="text-xs font-semibold uppercase text-[var(--color-portal-muted)]">Monthly left over</p>
              <p className={`text-2xl font-bold ${result.surplus >= 0 ? "text-[var(--color-portal-accent)]" : "text-red-600"}`}>
                {fmt(result.surplus)}
              </p>
            </div>
            <div className="portal-card p-4">
              <p className="text-xs font-semibold uppercase text-[var(--color-portal-muted)]">Rough coverage need</p>
              <p className="text-2xl font-bold">{fmt(result.suggestedCoverage)}</p>
            </div>
            <div className="portal-card border-[var(--color-portal-gold)] bg-[var(--color-portal-gold-light)] p-4">
              <p className="text-xs font-semibold uppercase text-[var(--color-portal-gold)]">Possible gap</p>
              <p className="text-2xl font-bold">{fmt(result.coverageGap)}</p>
            </div>
          </div>

          {result.active.length > 0 && (
            <p className="text-sm text-[var(--color-portal-muted)]">
              Modeling: {result.active.join(", ")}. This is a conversation starter — not a quote.
            </p>
          )}

          {result.priority && (
            <div className="rounded-xl border border-[var(--color-portal-gold)] bg-[var(--color-portal-gold-light)] p-5">
              <p className="text-sm font-semibold">Suggested follow-up</p>
              <Link href={result.priority.href} className="portal-btn-primary mt-3 inline-flex text-sm">
                {result.priority.label}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  );
}
