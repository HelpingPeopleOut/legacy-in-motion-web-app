"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  AlertCircle,
  ArrowRight,
  Bell,
  Calendar,
  CheckCircle2,
  Clock,
  Layers,
  Pencil,
  Plus,
  Shield,
  Trash2,
  X,
} from "lucide-react";

const STORAGE_KEY = "legacyInMotionPolicies_v2";

type PolicyType = "TERM" | "PERMANENT" | "GROUP" | "OTHER";

type Policy = {
  id: string;
  carrier: string;
  label: string;
  type: PolicyType;
  faceAmount: number;
  premium: number;
  premiumDue: string;
  expires: string;
  notes: string;
};

const EMPTY: Omit<Policy, "id"> = {
  carrier: "",
  label: "",
  type: "TERM",
  faceAmount: 0,
  premium: 0,
  premiumDue: "",
  expires: "",
  notes: "",
};

function load(): Policy[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
    const legacy = localStorage.getItem("legacyInMotionPolicies_v1");
    if (legacy) {
      return (JSON.parse(legacy) as Policy[]).map((p) => ({
        ...p,
        label: (p as Policy & { label?: string }).label ?? "",
      }));
    }
    return [];
  } catch {
    return [];
  }
}

function save(policies: Policy[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(policies));
}

function parseLocalDate(dateStr: string) {
  if (!dateStr) return null;
  const [y, m, d] = dateStr.split("-").map(Number);
  if (!y || !m || !d) return null;
  return new Date(y, m - 1, d);
}

function daysUntil(dateStr: string) {
  const d = parseLocalDate(dateStr);
  if (!d) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Math.ceil((d.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

function fmtDate(dateStr: string) {
  const d = parseLocalDate(dateStr);
  if (!d) return dateStr;
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function fmtMoney(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

type PolicyStatus = "ok" | "watch" | "urgent" | "expired" | "incomplete";

function policyStatus(p: Policy): { status: PolicyStatus; label: string; hint: string } {
  const expDays = daysUntil(p.expires);
  const dueDays = p.premiumDue ? daysUntil(p.premiumDue) : null;

  if (p.type === "TERM" && !p.expires) {
    return { status: "incomplete", label: "Add expiration date", hint: "Term policies need an end date for ladder alerts." };
  }
  if (expDays !== null && expDays < 0) {
    return { status: "expired", label: "Expired", hint: "Coverage may have lapsed — confirm with your carrier or advisor." };
  }
  if (expDays !== null && expDays <= 30) {
    return { status: "urgent", label: `Expires in ${expDays} days`, hint: "Renew, convert, or replace before lapse." };
  }
  if (dueDays !== null && dueDays < 0) {
    return { status: "urgent", label: "Premium overdue", hint: "Pay or contact carrier to avoid lapse." };
  }
  if (dueDays !== null && dueDays <= 14) {
    return { status: "watch", label: `Premium in ${dueDays} days`, hint: "Mark paid once processed to clear this alert." };
  }
  if (expDays !== null && expDays <= 90) {
    return { status: "watch", label: `Expires in ${expDays} days`, hint: "Good time to review options with your advisor." };
  }
  return { status: "ok", label: "On track", hint: "No action needed right now." };
}

function statusStyles(status: PolicyStatus) {
  switch (status) {
    case "ok":
      return { dot: "bg-emerald-500", border: "border-emerald-200", bg: "bg-emerald-50/50" };
    case "watch":
      return { dot: "bg-amber-500", border: "border-amber-200", bg: "bg-amber-50/50" };
    case "urgent":
    case "expired":
      return { dot: "bg-red-500", border: "border-red-200", bg: "bg-red-50/50" };
    default:
      return { dot: "bg-[var(--color-portal-muted)]", border: "border-[var(--color-portal-border)]", bg: "bg-white" };
  }
}

export default function PolicyLadderTracker() {
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY);
  const [showAdvanced, setShowAdvanced] = useState(false);

  useEffect(() => {
    setPolicies(load());
  }, []);

  const persist = useCallback((next: Policy[]) => {
    setPolicies(next);
    save(next);
  }, []);

  const sortedLadder = useMemo(() => {
    return [...policies].sort((a, b) => {
      const aExp = daysUntil(a.expires) ?? 99999;
      const bExp = daysUntil(b.expires) ?? 99999;
      return aExp - bExp;
    });
  }, [policies]);

  const totalFace = policies.reduce((s, p) => s + p.faceAmount, 0);
  const urgentCount = policies.filter((p) => {
    const s = policyStatus(p).status;
    return s === "urgent" || s === "expired";
  }).length;

  const nextCritical = useMemo(() => {
    let best: { policy: Policy; days: number; kind: string } | null = null;
    for (const p of policies) {
      for (const [date, kind] of [
        [p.expires, "expiration"],
        [p.premiumDue, "premium"],
      ] as const) {
        const days = daysUntil(date);
        if (days === null) continue;
        if (!best || days < best.days) best = { policy: p, days, kind };
      }
    }
    return best;
  }, [policies]);

  const openAdd = () => {
    setEditingId(null);
    setForm(EMPTY);
    setShowAdvanced(false);
    setShowForm(true);
  };

  const openEdit = (p: Policy) => {
    setEditingId(p.id);
    setForm({
      carrier: p.carrier,
      label: p.label,
      type: p.type,
      faceAmount: p.faceAmount,
      premium: p.premium,
      premiumDue: p.premiumDue,
      expires: p.expires,
      notes: p.notes,
    });
    setShowAdvanced(!!(p.premium || p.premiumDue || p.notes));
    setShowForm(true);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.carrier.trim()) return;
    const payload = {
      ...form,
      carrier: form.carrier.trim(),
      label: form.label.trim(),
      notes: form.notes.trim(),
    };
    if (editingId) {
      persist(policies.map((p) => (p.id === editingId ? { ...p, ...payload } : p)));
    } else {
      persist([{ id: crypto.randomUUID(), ...payload }, ...policies]);
    }
    setShowForm(false);
  };

  const remove = (id: string) => {
    if (!confirm("Remove this policy from your tracker?")) return;
    persist(policies.filter((p) => p.id !== id));
    if (editingId === id) setShowForm(false);
  };

  const markPremiumPaid = (id: string) => {
    const p = policies.find((x) => x.id === id);
    if (!p?.premiumDue) return;
    const d = parseLocalDate(p.premiumDue);
    if (!d) return;
    d.setMonth(d.getMonth() + 1);
    const next = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    persist(policies.map((x) => (x.id === id ? { ...x, premiumDue: next } : x)));
  };

  const buildSummary = () => {
    const lines = [
      "LEGACY IN MOTION — Policy Ladder Summary",
      `Generated: ${new Date().toLocaleString()}`,
      `Total coverage: ${fmtMoney(totalFace)} · ${policies.length} policies`,
      "",
    ];
    for (const p of sortedLadder) {
      const st = policyStatus(p);
      lines.push(`• ${p.carrier}${p.label ? ` (${p.label})` : ""} — ${p.type}`);
      if (p.faceAmount) lines.push(`  Coverage: ${fmtMoney(p.faceAmount)}`);
      if (p.expires) lines.push(`  Expires: ${fmtDate(p.expires)} — ${st.label}`);
      if (p.premiumDue) lines.push(`  Next premium: ${fmtDate(p.premiumDue)}`);
      lines.push("");
    }
    return lines.join("\n");
  };

  const copySummary = async () => {
    try {
      await navigator.clipboard.writeText(buildSummary());
    } catch {
      window.prompt("Copy for your advisor:", buildSummary());
    }
  };

  return (
    <div className="space-y-5">
      <div className="portal-card p-5 md:p-6">
        <p className="portal-hub-eyebrow mb-1">
          <Layers className="h-3.5 w-3.5" aria-hidden />
          Coverage ladder
        </p>
        <h2 className="text-lg font-semibold text-[var(--color-portal-text)]">
          Don&apos;t let a policy lapse by surprise
        </h2>
        <p className="mt-1 max-w-xl text-sm text-[var(--color-portal-muted)]">
          List each policy once — we flag premium due dates and term expirations so you can renew,
          convert, or adjust coverage before a gap. Saved on this device only.
        </p>

        <div className="mt-4 flex flex-wrap gap-6">
          <div>
            <p className="text-2xl font-bold text-[var(--color-portal-gold)]">{policies.length}</p>
            <p className="text-xs text-[var(--color-portal-muted)]">Policies</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-[var(--color-portal-text)]">{fmtMoney(totalFace)}</p>
            <p className="text-xs text-[var(--color-portal-muted)]">Total coverage</p>
          </div>
          {urgentCount > 0 && (
            <div>
              <p className="text-2xl font-bold text-red-600">{urgentCount}</p>
              <p className="text-xs text-[var(--color-portal-muted)]">Need attention</p>
            </div>
          )}
        </div>

        {nextCritical && nextCritical.days <= 90 && (
          <div className="mt-4 flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950">
            <Bell className="mt-0.5 h-4 w-4 shrink-0" />
            <span>
              <strong>Next up:</strong> {nextCritical.policy.carrier} —{" "}
              {nextCritical.kind === "expiration" ? "term ends" : "premium due"}{" "}
              {nextCritical.days < 0
                ? `${Math.abs(nextCritical.days)} days ago`
                : `in ${nextCritical.days} days`}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        <button type="button" className="portal-btn-primary text-sm" onClick={openAdd}>
          <Plus className="h-4 w-4" />
          Add a policy
        </button>
        {policies.length > 0 && (
          <button type="button" className="portal-btn-secondary text-sm" onClick={copySummary}>
            Copy summary for advisor
          </button>
        )}
      </div>

      {showForm && (
        <form className="portal-card space-y-4 p-5 md:p-6" onSubmit={submit}>
          <div className="flex justify-between gap-2">
            <div>
              <h3 className="font-semibold">{editingId ? "Edit policy" : "Add a policy"}</h3>
              <p className="text-sm text-[var(--color-portal-muted)]">Grab details from your declaration page — estimates are OK.</p>
            </div>
            <button type="button" className="portal-btn-ghost !min-h-0 !p-2" onClick={() => setShowForm(false)} aria-label="Close">
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="legacy-vault-field sm:col-span-2">
              <span>Insurance company *</span>
              <input
                required
                value={form.carrier}
                onChange={(e) => setForm({ ...form, carrier: e.target.value })}
                className="legacy-vault-input"
                placeholder="e.g. Northwestern Mutual"
              />
            </label>
            <label className="legacy-vault-field">
              <span>Policy type</span>
              <select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value as PolicyType })}
                className="legacy-vault-input"
              >
                <option value="TERM">Term life</option>
                <option value="PERMANENT">Permanent / whole / IUL</option>
                <option value="GROUP">Work / group policy</option>
                <option value="OTHER">Other</option>
              </select>
            </label>
            <label className="legacy-vault-field">
              <span>Coverage amount</span>
              <input
                type="number"
                value={form.faceAmount || ""}
                onChange={(e) => setForm({ ...form, faceAmount: Number(e.target.value) || 0 })}
                className="legacy-vault-input"
                placeholder="e.g. 500000"
              />
            </label>
            <label className="legacy-vault-field sm:col-span-2">
              <span>Label (optional)</span>
              <input
                value={form.label}
                onChange={(e) => setForm({ ...form, label: e.target.value })}
                className="legacy-vault-input"
                placeholder="e.g. 20-year term · primary earner"
              />
            </label>
            <label className="legacy-vault-field sm:col-span-2">
              <span>{form.type === "TERM" ? "Term ends / expires *" : "Renewal or review date"}</span>
              <input
                type="date"
                required={form.type === "TERM"}
                value={form.expires}
                onChange={(e) => setForm({ ...form, expires: e.target.value })}
                className="legacy-vault-input"
              />
            </label>
          </div>

          <button
            type="button"
            className="text-sm font-semibold text-[var(--color-portal-gold)]"
            onClick={() => setShowAdvanced(!showAdvanced)}
          >
            {showAdvanced ? "− Hide" : "+ Add"} premium & notes (optional)
          </button>

          {showAdvanced && (
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="legacy-vault-field">
                <span>Monthly premium</span>
                <input
                  type="number"
                  value={form.premium || ""}
                  onChange={(e) => setForm({ ...form, premium: Number(e.target.value) || 0 })}
                  className="legacy-vault-input"
                  placeholder="e.g. 85"
                />
              </label>
              <label className="legacy-vault-field">
                <span>Next premium due</span>
                <input
                  type="date"
                  value={form.premiumDue}
                  onChange={(e) => setForm({ ...form, premiumDue: e.target.value })}
                  className="legacy-vault-input"
                />
              </label>
              <label className="legacy-vault-field sm:col-span-2">
                <span>Notes</span>
                <textarea
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  className="legacy-vault-input resize-y"
                  rows={2}
                  placeholder="Policy # last 4, agent name, convertibility…"
                />
              </label>
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            <button type="submit" className="portal-btn-primary text-sm">Save policy</button>
            <button type="button" className="portal-btn-secondary text-sm" onClick={() => setShowForm(false)}>Cancel</button>
          </div>
        </form>
      )}

      {policies.length === 0 ? (
        <div className="portal-empty portal-card">
          <Shield className="mx-auto mb-3 h-10 w-10 opacity-40" />
          <p className="font-medium text-[var(--color-portal-text)]">No policies yet</p>
          <p className="mt-1 max-w-md text-sm text-[var(--color-portal-muted)]">
            Start with your term policies — those are the ones that expire. Permanent and work policies
            are worth adding too.
          </p>
          <button type="button" className="portal-btn-primary mt-4 text-sm" onClick={openAdd}>
            <Plus className="h-4 w-4" />
            Add your first policy
          </button>
        </div>
      ) : (
        <>
          <div>
            <h3 className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-[var(--color-portal-muted)]">
              <Clock className="h-4 w-4" />
              Ladder — soonest expiration first
            </h3>
            <ul className="relative space-y-0 border-l-2 border-[var(--color-portal-gold-muted)] pl-5">
              {sortedLadder.map((p) => {
                const st = policyStatus(p);
                const styles = statusStyles(st.status);
                return (
                  <li key={p.id} className="relative pb-5 last:pb-0">
                    <span
                      className={`absolute -left-[1.35rem] top-1.5 h-3 w-3 rounded-full border-2 border-white ${styles.dot}`}
                    />
                    <div className={`portal-card border p-4 ${styles.border} ${styles.bg}`}>
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-xs font-bold uppercase text-[var(--color-portal-gold)]">
                              {p.type.replace("_", " ")}
                            </span>
                            <span className="text-xs font-semibold text-[var(--color-portal-muted)]">{st.label}</span>
                          </div>
                          <h4 className="font-semibold text-[var(--color-portal-text)]">{p.carrier}</h4>
                          {p.label && <p className="text-sm text-[var(--color-portal-muted)]">{p.label}</p>}
                          <p className="mt-1 text-sm">
                            {p.faceAmount > 0 && <span className="font-medium">{fmtMoney(p.faceAmount)}</span>}
                            {p.premium > 0 && (
                              <span className="text-[var(--color-portal-muted)]"> · {fmtMoney(p.premium)}/mo</span>
                            )}
                          </p>
                          <p className="mt-1 text-xs text-[var(--color-portal-muted)]">{st.hint}</p>
                          <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-[var(--color-portal-muted)]">
                            {p.expires && (
                              <span className="inline-flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                Ends {fmtDate(p.expires)}
                              </span>
                            )}
                            {p.premiumDue && (
                              <span className="inline-flex items-center gap-1">
                                <Bell className="h-3 w-3" />
                                Premium {fmtDate(p.premiumDue)}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex shrink-0 flex-col gap-1 sm:flex-row">
                          {p.premiumDue && daysUntil(p.premiumDue) !== null && daysUntil(p.premiumDue)! <= 30 && (
                            <button
                              type="button"
                              className="portal-btn-secondary !min-h-0 px-2 py-1 text-xs"
                              onClick={() => markPremiumPaid(p.id)}
                            >
                              <CheckCircle2 className="h-3.5 w-3.5" />
                              Mark paid
                            </button>
                          )}
                          <button type="button" className="portal-btn-ghost !min-h-0 !p-2" onClick={() => openEdit(p)} aria-label="Edit">
                            <Pencil className="h-4 w-4" />
                          </button>
                          <button type="button" className="portal-btn-ghost !min-h-0 !p-2 text-red-600" onClick={() => remove(p.id)} aria-label="Delete">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          {policies.some((p) => p.type === "TERM" && daysUntil(p.expires) !== null && daysUntil(p.expires)! <= 90 && daysUntil(p.expires)! >= 0) && (
            <div className="rounded-xl border border-[var(--color-portal-gold)] bg-[var(--color-portal-gold-light)] p-5">
              <p className="flex items-center gap-2 text-sm font-semibold text-[var(--color-portal-text)]">
                <AlertCircle className="h-4 w-4 text-[var(--color-portal-gold)]" />
                Term ending soon — typical options
              </p>
              <ul className="mt-2 space-y-1 text-sm text-[var(--color-portal-muted)]">
                <li>· <strong>Renew</strong> — often higher cost, but keeps coverage</li>
                <li>· <strong>Convert</strong> to permanent if your policy allows</li>
                <li>· <strong>Replace</strong> with a new policy if health & rates allow</li>
                <li>· <strong>Reduce</strong> coverage if the need is lower (kids grown, mortgage paid)</li>
              </ul>
              <Link href="/#consultation" className="portal-btn-primary mt-4 inline-flex text-sm">
                Review options with advisor
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          )}
        </>
      )}

      <p className="text-xs leading-relaxed text-[var(--color-portal-muted)]">
        Store policy numbers in your{" "}
        <Link href="/dashboard/tools/legacy-vault" className="font-semibold text-[var(--color-portal-gold)] underline">
          Digital Legacy Vault
        </Link>
        . This tracker does not connect to carriers — confirm dates on your statements. Email/SMS reminders
        can be added when notifications are enabled.
      </p>
    </div>
  );
}
