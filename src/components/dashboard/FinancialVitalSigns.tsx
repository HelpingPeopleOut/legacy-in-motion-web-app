"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Activity,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Heart,
  PiggyBank,
  Shield,
  Wallet,
} from "lucide-react";

const STORAGE_KEY = "legacyInMotionVitalSigns_v2";

type VitalCheckup = {
  monthlyIncome: number;
  monthlyExpenses: number;
  cashSavings: number;
  monthlyDebtPayments: number;
  lifeInsurance: number;
};

const EMPTY: VitalCheckup = {
  monthlyIncome: 0,
  monthlyExpenses: 0,
  cashSavings: 0,
  monthlyDebtPayments: 0,
  lifeInsurance: 0,
};

type SignalStatus = "good" | "watch" | "urgent" | "unknown";

type VitalSignal = {
  id: string;
  title: string;
  status: SignalStatus;
  headline: string;
  detail: string;
  action: { label: string; href: string };
  icon: React.ComponentType<{ className?: string }>;
};

function load(): VitalCheckup {
  if (typeof window === "undefined") return EMPTY;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...EMPTY, ...JSON.parse(raw) };
    // Migrate rough totals from v1 if present
    const legacy = localStorage.getItem("legacyInMotionVitalSigns_v1");
    if (legacy) {
      const old = JSON.parse(legacy) as Record<string, number>;
      return {
        monthlyIncome: old.monthlyIncome || 0,
        monthlyExpenses: old.monthlyExpenses || 0,
        cashSavings: (old.cash || 0) + (old.investments || 0),
        monthlyDebtPayments:
          (old.mortgage || 0) * 0.005 +
          (old.creditDebt || 0) * 0.02 +
          (old.otherDebt || 0) * 0.015,
        lifeInsurance: old.lifeInsurance || 0,
      };
    }
    return EMPTY;
  } catch {
    return EMPTY;
  }
}

function save(data: VitalCheckup) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function fmt(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

function statusStyles(status: SignalStatus) {
  switch (status) {
    case "good":
      return {
        border: "border-emerald-200",
        bg: "bg-emerald-50/80",
        dot: "bg-emerald-500",
        label: "In good shape",
      };
    case "watch":
      return {
        border: "border-amber-200",
        bg: "bg-amber-50/80",
        dot: "bg-amber-500",
        label: "Worth a look",
      };
    case "urgent":
      return {
        border: "border-red-200",
        bg: "bg-red-50/80",
        dot: "bg-red-500",
        label: "Priority",
      };
    default:
      return {
        border: "border-[var(--color-portal-border)]",
        bg: "bg-white",
        dot: "bg-[var(--color-portal-muted)]",
        label: "Add your numbers",
      };
  }
}

function buildSignals(d: VitalCheckup): VitalSignal[] {
  const hasBasics = d.monthlyIncome > 0 && d.monthlyExpenses > 0;

  const cushionMonths =
    d.monthlyExpenses > 0 ? d.cashSavings / d.monthlyExpenses : null;
  let cushionStatus: SignalStatus = "unknown";
  let cushionHeadline = "Enter savings & monthly bills";
  let cushionDetail = "We’ll estimate how many months you could cover if income stopped.";
  if (cushionMonths !== null) {
    if (cushionMonths >= 3) {
      cushionStatus = cushionMonths >= 6 ? "good" : "watch";
      cushionHeadline =
        cushionMonths >= 6
          ? `${cushionMonths.toFixed(1)} months saved — solid cushion`
          : `${cushionMonths.toFixed(1)} months saved — building well`;
      cushionDetail =
        cushionMonths >= 6
          ? "You have a strong emergency buffer. Keep it in an easy-to-reach account."
          : "You’re on track. Many families aim for 3–6 months of bills in cash.";
    } else {
      cushionStatus = "urgent";
      cushionHeadline = `${cushionMonths.toFixed(1)} months saved — thin buffer`;
      cushionDetail =
        "One surprise bill or job gap could strain the budget. Even $50/week toward savings helps.";
    }
  }

  const debtShare =
    d.monthlyIncome > 0 ? (d.monthlyDebtPayments / d.monthlyIncome) * 100 : null;
  let debtStatus: SignalStatus = "unknown";
  let debtHeadline = "Optional: add debt payments";
  let debtDetail =
    "Credit cards, car loans, student loans — not your full mortgage, just what you pay monthly.";
  if (debtShare !== null && d.monthlyDebtPayments > 0) {
    if (debtShare <= 20) {
      debtStatus = "good";
      debtHeadline = `${debtShare.toFixed(0)}% of income to debt — manageable`;
      debtDetail = "Your debt payments aren’t crowding out the rest of your plan.";
    } else if (debtShare <= 35) {
      debtStatus = "watch";
      debtHeadline = `${debtShare.toFixed(0)}% of income to debt — getting tight`;
      debtDetail = "Consider a payoff plan before adding new obligations.";
    } else {
      debtStatus = "urgent";
      debtHeadline = `${debtShare.toFixed(0)}% of income to debt — high pressure`;
      debtDetail = "Debt may be blocking protection and retirement. A payoff strategy comes first.";
    }
  } else if (d.monthlyDebtPayments === 0 && hasBasics) {
    debtStatus = "good";
    debtHeadline = "No extra debt payments listed";
    debtDetail = "If you carry balances, add monthly payments for a clearer picture.";
  }

  const incomeAnnual = d.monthlyIncome * 12;
  const coverageMultiple =
    incomeAnnual > 0 && d.lifeInsurance > 0 ? d.lifeInsurance / incomeAnnual : null;
  let protectStatus: SignalStatus = "unknown";
  let protectHeadline = "Add life insurance total (0 if none)";
  let protectDetail =
    "Best guess from your policies — or enter 0 and we’ll flag protection as a priority.";
  if (d.lifeInsurance === 0 && d.monthlyIncome > 0) {
    protectStatus = "urgent";
    protectHeadline = "No coverage listed";
    protectDetail =
      "If someone relies on your income, protection is usually the first gap to fix.";
  } else if (coverageMultiple !== null) {
    if (coverageMultiple >= 8) {
      protectStatus = "good";
      protectHeadline = `~${coverageMultiple.toFixed(0)}× income — strong baseline`;
      protectDetail = "Run a full needs analysis to confirm — mortgage and kids change the number.";
    } else if (coverageMultiple >= 4) {
      protectStatus = "watch";
      protectHeadline = `~${coverageMultiple.toFixed(0)}× income — may be light`;
      protectDetail = "Many families need more once debt, mortgage, and education are included.";
    } else {
      protectStatus = "urgent";
      protectHeadline = `~${coverageMultiple.toFixed(1)}× income — likely underprotected`;
      protectDetail = "A 5-minute D.I.M.E. analysis gives a clearer target than a rule of thumb.";
    }
  }

  const breathingRoom = d.monthlyIncome - d.monthlyExpenses - d.monthlyDebtPayments;
  let cashStatus: SignalStatus = "unknown";
  let cashHeadline = "Enter income & monthly bills";
  let cashDetail = "Rough numbers are fine — this shows what’s left each month.";
  if (hasBasics) {
    if (breathingRoom >= 500) {
      cashStatus = breathingRoom >= 1500 ? "good" : "watch";
      cashHeadline = `${fmt(breathingRoom)}/mo left after bills`;
      cashDetail =
        breathingRoom >= 1500
          ? "You have room to save, protect, and invest — allocate on purpose."
          : "Some margin each month. Small, steady moves beat waiting for perfect.";
    } else if (breathingRoom >= 0) {
      cashStatus = "watch";
      cashHeadline = `${fmt(breathingRoom)}/mo left — tight margin`;
      cashDetail = "Little room for surprises. Emergency savings and debt review matter here.";
    } else {
      cashStatus = "urgent";
      cashHeadline = `${fmt(Math.abs(breathingRoom))}/mo short`;
      cashDetail = "Spending plus debt payments exceed income on paper — time to adjust or get help.";
    }
  }

  return [
    {
      id: "cushion",
      title: "Emergency cushion",
      status: cushionStatus,
      headline: cushionHeadline,
      detail: cushionDetail,
      action: {
        label: "Build your safety net",
        href: "/dashboard/tools/emergency-fund",
      },
      icon: PiggyBank,
    },
    {
      id: "debt",
      title: "Debt pressure",
      status: debtStatus,
      headline: debtHeadline,
      detail: debtDetail,
      action: {
        label: "See your payoff path",
        href: "/dashboard/tools/debt-freedom",
      },
      icon: Wallet,
    },
    {
      id: "protection",
      title: "Family protection",
      status: protectStatus,
      headline: protectHeadline,
      detail: protectDetail,
      action: {
        label: "Calculate real need",
        href: "/dashboard/tools/human-life-value",
      },
      icon: Shield,
    },
    {
      id: "breathing",
      title: "Monthly breathing room",
      status: cashStatus,
      headline: cashHeadline,
      detail: cashDetail,
      action: {
        label: "Book a strategy call",
        href: "/#consultation",
      },
      icon: Heart,
    },
  ];
}

export default function FinancialVitalSigns() {
  const [data, setData] = useState<VitalCheckup>(EMPTY);
  const [showOptional, setShowOptional] = useState(false);

  useEffect(() => {
    setData(load());
  }, []);

  const patch = useCallback((p: Partial<VitalCheckup>) => {
    setData((prev) => {
      const next = { ...prev, ...p };
      save(next);
      return next;
    });
  }, []);

  const signals = useMemo(() => buildSignals(data), [data]);
  const filledCount = [
    data.monthlyIncome,
    data.monthlyExpenses,
    data.cashSavings,
  ].filter((n) => n > 0).length;
  const priority = signals.find((s) => s.status === "urgent") ?? signals.find((s) => s.status === "watch");
  const goodCount = signals.filter((s) => s.status === "good").length;

  return (
    <div className="space-y-5">
      <div className="portal-card p-5 md:p-6">
        <p className="portal-hub-eyebrow mb-1">
          <Activity className="h-3.5 w-3.5" aria-hidden />
          2-minute checkup
        </p>
        <h2 className="text-lg font-semibold text-[var(--color-portal-text)]">
          How healthy are your finances right now?
        </h2>
        <p className="mt-1 max-w-xl text-sm text-[var(--color-portal-muted)]">
          Rough estimates are fine — no bank login, no spreadsheet. We check four things families
          actually care about, then point you to the right tool.
        </p>
        {filledCount >= 3 && (
          <p className="mt-3 text-sm font-medium text-[var(--color-portal-text)]">
            {goodCount} of 4 areas look solid
            {priority ? (
              <>
                {" "}
                · <span className="text-[var(--color-portal-gold)]">Start with: {priority.title}</span>
              </>
            ) : null}
          </p>
        )}
      </div>

      <div className="portal-card p-5 md:p-6">
        <h3 className="mb-1 font-semibold text-[var(--color-portal-text)]">Your numbers</h3>
        <p className="mb-4 text-sm text-[var(--color-portal-muted)]">
          Ballpark is enough. Saved on this device only.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="legacy-vault-field">
            <span>Monthly take-home (household)</span>
            <input
              type="number"
              inputMode="decimal"
              value={data.monthlyIncome || ""}
              onChange={(e) => patch({ monthlyIncome: Number(e.target.value) || 0 })}
              className="legacy-vault-input"
              placeholder="e.g. 6500"
            />
          </label>
          <label className="legacy-vault-field">
            <span>Monthly bills (housing, food, utilities…)</span>
            <input
              type="number"
              inputMode="decimal"
              value={data.monthlyExpenses || ""}
              onChange={(e) => patch({ monthlyExpenses: Number(e.target.value) || 0 })}
              className="legacy-vault-input"
              placeholder="e.g. 4800"
            />
          </label>
          <label className="legacy-vault-field">
            <span>Cash in checking + savings</span>
            <input
              type="number"
              inputMode="decimal"
              value={data.cashSavings || ""}
              onChange={(e) => patch({ cashSavings: Number(e.target.value) || 0 })}
              className="legacy-vault-input"
              placeholder="e.g. 12000"
            />
          </label>
          <label className="legacy-vault-field">
            <span>Life insurance in force (0 if none)</span>
            <input
              type="number"
              inputMode="decimal"
              value={data.lifeInsurance || ""}
              onChange={(e) => patch({ lifeInsurance: Number(e.target.value) || 0 })}
              className="legacy-vault-input"
              placeholder="e.g. 500000"
            />
          </label>
        </div>

        <button
          type="button"
          className="mt-4 flex items-center gap-1 text-sm font-semibold text-[var(--color-portal-gold)]"
          onClick={() => setShowOptional(!showOptional)}
        >
          {showOptional ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          {showOptional ? "Hide" : "Add"} optional debt payments
        </button>
        {showOptional && (
          <label className="legacy-vault-field mt-3">
            <span>Monthly debt payments (cards, car, student — not full mortgage)</span>
            <input
              type="number"
              inputMode="decimal"
              value={data.monthlyDebtPayments || ""}
              onChange={(e) => patch({ monthlyDebtPayments: Number(e.target.value) || 0 })}
              className="legacy-vault-input"
              placeholder="e.g. 650"
            />
          </label>
        )}
      </div>

      <div>
        <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-[var(--color-portal-muted)]">
          Your four vital signs
        </h3>
        <ul className="space-y-3">
          {signals.map((signal) => {
            const styles = statusStyles(signal.status);
            const Icon = signal.icon;
            return (
              <li
                key={signal.id}
                className={`portal-card border p-4 md:p-5 ${styles.border} ${styles.bg}`}
              >
                <div className="flex gap-3">
                  <div className="portal-tool-icon !h-10 !w-10 shrink-0">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-semibold text-[var(--color-portal-text)]">{signal.title}</span>
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-[var(--color-portal-muted)]">
                        <span className={`h-2 w-2 rounded-full ${styles.dot}`} />
                        {styles.label}
                      </span>
                    </div>
                    <p className="mt-1 font-medium text-[var(--color-portal-text)]">{signal.headline}</p>
                    <p className="mt-1 text-sm text-[var(--color-portal-muted)]">{signal.detail}</p>
                    {signal.status !== "unknown" && (
                      <Link
                        href={signal.action.href}
                        className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-portal-gold)] hover:underline"
                      >
                        {signal.action.label}
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {priority && filledCount >= 3 && (
        <div className="rounded-xl border border-[var(--color-portal-gold)] bg-[var(--color-portal-gold-light)] p-5">
          <p className="text-sm font-semibold text-[var(--color-portal-text)]">Suggested next step</p>
          <p className="mt-1 text-sm text-[var(--color-portal-muted)]">
            Based on your checkup, focus on <strong>{priority.title.toLowerCase()}</strong> first — small
            steps beat doing nothing.
          </p>
          <Link href={priority.action.href} className="portal-btn-primary mt-3 inline-flex text-sm">
            {priority.action.label}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      )}

      <p className="text-xs leading-relaxed text-[var(--color-portal-muted)]">
        This is a simple snapshot, not tax or legal advice. Revisit when life changes — new job, home,
        baby, or debt payoff. Your advisor can refine any number in a free strategy session.
      </p>
    </div>
  );
}
