"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Circle, Copy, Users } from "lucide-react";
import Link from "next/link";

const STORAGE_KEY = "legacyInMotionBeneficiaryChecklist_v1";

const ITEMS = [
  { id: "life", label: "Life insurance policies", hint: "Primary & contingent beneficiaries named" },
  { id: "401k", label: "Employer retirement (401k, 403b)", hint: "Beneficiary form on file with HR" },
  { id: "ira", label: "IRAs & Roth accounts", hint: "Beneficiary designation at custodian" },
  { id: "bank", label: "Bank & credit union accounts", hint: "POD/TOD designations where available" },
  { id: "brokerage", label: "Brokerage & investment accounts", hint: "TOD registration or trust ownership" },
  { id: "home", label: "Home & real estate", hint: "Title, trust, or survivorship deed reviewed" },
  { id: "business", label: "Business interests", hint: "Buy-sell or succession plan documented" },
  { id: "minor", label: "Minor children", hint: "Guardian & trust provisions in place" },
  { id: "exspouse", label: "Outdated designations", hint: "No ex-spouse or deceased person still listed" },
  { id: "percent", label: "Percentages add to 100%", hint: "Split allocations verified on each account" },
];

type Checked = Record<string, boolean>;

function loadChecked(): Checked {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Checked) : {};
  } catch {
    return {};
  }
}

export default function BeneficiaryChecklist() {
  const [checked, setChecked] = useState<Checked>({});

  useEffect(() => {
    setChecked(loadChecked());
  }, []);

  const toggle = (id: string) => {
    const next = { ...checked, [id]: !checked[id] };
    setChecked(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  const done = ITEMS.filter((item) => checked[item.id]).length;
  const pct = Math.round((done / ITEMS.length) * 100);
  const incomplete = ITEMS.filter((item) => !checked[item.id]);

  const copyGaps = async () => {
    const lines = [
      "Beneficiary review — items to verify:",
      ...incomplete.map((i) => `• ${i.label}: ${i.hint}`),
      incomplete.length === 0 ? "All items reviewed ✓" : "",
    ].filter(Boolean);
    try {
      await navigator.clipboard.writeText(lines.join("\n"));
    } catch {
      window.prompt("Copy:", lines.join("\n"));
    }
  };

  return (
    <div className="space-y-5">
      <div className="portal-card p-5 md:p-6">
        <p className="portal-hub-eyebrow mb-1">
          <Users className="h-3.5 w-3.5" aria-hidden />
          Annual review
        </p>
        <h2 className="text-lg font-semibold text-[var(--color-portal-text)]">
          Are your beneficiaries still correct?
        </h2>
        <p className="mt-1 text-sm text-[var(--color-portal-muted)]">
          Life changes — marriage, divorce, new children, or a death in the family — can leave
          outdated designations. Work through this list and flag anything that needs updating with
          your advisor.
        </p>
        <div className="mt-4 flex items-center gap-3">
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-[var(--color-portal-border)]">
            <div
              className="h-full rounded-full bg-[var(--color-portal-accent)] transition-all"
              style={{ width: `${pct}%` }}
            />
          </div>
          <span className="text-sm font-semibold text-[var(--color-portal-text)]">
            {done}/{ITEMS.length}
          </span>
        </div>
      </div>

      <ul className="space-y-2">
        {ITEMS.map((item) => {
          const isDone = !!checked[item.id];
          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => toggle(item.id)}
                className={`portal-card flex w-full items-start gap-3 p-4 text-left transition-colors ${
                  isDone ? "border-[var(--color-portal-accent)] bg-[var(--color-portal-accent-light)]/40" : ""
                }`}
              >
                {isDone ? (
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-portal-accent)]" />
                ) : (
                  <Circle className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-portal-muted)]" />
                )}
                <span>
                  <span className="block font-medium text-[var(--color-portal-text)]">{item.label}</span>
                  <span className="text-sm text-[var(--color-portal-muted)]">{item.hint}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <div className="flex flex-wrap gap-2">
        {incomplete.length > 0 && (
          <button type="button" className="portal-btn-secondary text-sm" onClick={copyGaps}>
            <Copy className="h-4 w-4" />
            Copy items still to review
          </button>
        )}
        <Link href="/dashboard/tools/legacy-vault" className="portal-btn-primary text-sm">
          Log details in Legacy Vault
        </Link>
      </div>
    </div>
  );
}
