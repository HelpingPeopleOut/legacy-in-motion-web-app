"use client";

import { useCallback, useEffect, useMemo, useState, type ComponentType } from "react";
import {
  Building2,
  Copy,
  FileCheck,
  FileText,
  Landmark,
  Pencil,
  Plus,
  Shield,
  Trash2,
  Users,
  X,
} from "lucide-react";

const STORAGE_KEY = "legacyInMotionVault_v1";

type VaultCategory =
  | "LIFE_INSURANCE"
  | "WILL_TRUST"
  | "BANK_ACCOUNT"
  | "RETIREMENT"
  | "REAL_ESTATE"
  | "BENEFICIARY"
  | "OTHER";

type VaultItem = {
  id: string;
  category: VaultCategory;
  title: string;
  institution: string;
  accountRef: string;
  notes: string;
  hasDocument: boolean;
  updatedAt: string;
};

type VaultForm = Omit<VaultItem, "id" | "updatedAt">;

const CATEGORIES: {
  id: VaultCategory;
  label: string;
  hint: string;
  icon: ComponentType<{ className?: string }>;
  essential: boolean;
}[] = [
  { id: "LIFE_INSURANCE", label: "Life insurance", hint: "Policies & policy numbers", icon: Shield, essential: true },
  { id: "WILL_TRUST", label: "Wills & trusts", hint: "Estate documents & locations", icon: FileText, essential: true },
  { id: "BANK_ACCOUNT", label: "Bank accounts", hint: "Where accounts are held", icon: Landmark, essential: true },
  { id: "RETIREMENT", label: "Retirement", hint: "401(k), IRA, annuity, pension", icon: Building2, essential: true },
  { id: "BENEFICIARY", label: "Beneficiaries", hint: "Who to contact & instructions", icon: Users, essential: true },
  { id: "REAL_ESTATE", label: "Real estate", hint: "Property, deeds, mortgages", icon: Building2, essential: false },
  { id: "OTHER", label: "Other", hint: "Anything your family should know", icon: FileCheck, essential: false },
];

const EMPTY_FORM: VaultForm = {
  category: "LIFE_INSURANCE",
  title: "",
  institution: "",
  accountRef: "",
  notes: "",
  hasDocument: false,
};

function loadItems(): VaultItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as VaultItem[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveItems(items: VaultItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

function categoryMeta(id: VaultCategory) {
  return CATEGORIES.find((c) => c.id === id) ?? CATEGORIES[CATEGORIES.length - 1];
}

export default function LegacyVault() {
  const [items, setItems] = useState<VaultItem[]>([]);
  const [filter, setFilter] = useState<VaultCategory | "ALL">("ALL");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<VaultForm>(EMPTY_FORM);
  const [copyStatus, setCopyStatus] = useState<"idle" | "done">("idle");

  useEffect(() => {
    setItems(loadItems());
  }, []);

  const persist = useCallback((next: VaultItem[]) => {
    setItems(next);
    saveItems(next);
  }, []);

  const essentialCategories = CATEGORIES.filter((c) => c.essential);
  const coveredEssentials = essentialCategories.filter((cat) =>
    items.some((item) => item.category === cat.id)
  ).length;
  const completeness = Math.round((coveredEssentials / essentialCategories.length) * 100);

  const filtered = useMemo(() => {
    const list = filter === "ALL" ? items : items.filter((i) => i.category === filter);
    return [...list].sort(
      (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
  }, [items, filter]);

  const openAdd = (category?: VaultCategory) => {
    setEditingId(null);
    setForm({ ...EMPTY_FORM, category: category ?? "LIFE_INSURANCE" });
    setShowForm(true);
  };

  const openEdit = (item: VaultItem) => {
    setEditingId(item.id);
    setForm({
      category: item.category,
      title: item.title,
      institution: item.institution,
      accountRef: item.accountRef,
      notes: item.notes,
      hasDocument: item.hasDocument,
    });
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);
    setForm(EMPTY_FORM);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const title = form.title.trim();
    if (!title) return;

    const payload: VaultForm = {
      ...form,
      title,
      institution: form.institution.trim(),
      accountRef: form.accountRef.trim(),
      notes: form.notes.trim(),
    };

    if (editingId) {
      persist(
        items.map((item) =>
          item.id === editingId
            ? { ...item, ...payload, updatedAt: new Date().toISOString() }
            : item
        )
      );
    } else {
      persist([
        {
          id: crypto.randomUUID(),
          ...payload,
          updatedAt: new Date().toISOString(),
        },
        ...items,
      ]);
    }
    closeForm();
  };

  const handleDelete = (id: string) => {
    if (!window.confirm("Remove this vault entry? This cannot be undone.")) return;
    persist(items.filter((item) => item.id !== id));
    if (editingId === id) closeForm();
  };

  const buildSummary = () => {
    const lines = [
      "LEGACY IN MOTION — Digital Legacy Vault Summary",
      `Generated: ${new Date().toLocaleString()}`,
      "",
      "This inventory helps your family locate policies, accounts, and instructions.",
      "Store the original documents in a secure place; this vault is your roadmap.",
      "",
    ];

    for (const cat of CATEGORIES) {
      const catItems = items.filter((i) => i.category === cat.id);
      if (catItems.length === 0) continue;
      lines.push(`── ${cat.label.toUpperCase()} ──`);
      catItems.forEach((item) => {
        lines.push(`• ${item.title}`);
        if (item.institution) lines.push(`  Institution: ${item.institution}`);
        if (item.accountRef) lines.push(`  Reference: ${item.accountRef}`);
        if (item.hasDocument) lines.push(`  Document on file: Yes`);
        if (item.notes) lines.push(`  Notes: ${item.notes}`);
        lines.push("");
      });
    }

    if (items.length === 0) {
      lines.push("(No entries yet)");
    }

    return lines.join("\n");
  };

  const copySummary = async () => {
    try {
      await navigator.clipboard.writeText(buildSummary());
      setCopyStatus("done");
      setTimeout(() => setCopyStatus("idle"), 2500);
    } catch {
      window.prompt("Copy this summary for your records:", buildSummary());
    }
  };

  return (
    <div className="legacy-vault space-y-5">
      <div className="portal-card p-5 md:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="portal-hub-eyebrow mb-1">
              <Shield className="h-3.5 w-3.5" aria-hidden />
              Family readiness
            </p>
            <h2 className="text-lg font-semibold text-[var(--color-portal-text)]">
              Your digital legacy inventory
            </h2>
            <p className="mt-1 max-w-xl text-sm text-[var(--color-portal-muted)]">
              Record where policies, estate documents, and accounts live — plus who to call.
              Entries save on this device so you can update them anytime before sharing with
              your advisor or family.
            </p>
          </div>
          <div className="flex shrink-0 flex-col items-center rounded-xl border border-[var(--color-portal-border)] bg-[var(--color-portal-gold-light)] px-4 py-3 text-center">
            <span className="text-2xl font-bold text-[var(--color-portal-gold)]">{completeness}%</span>
            <span className="text-[0.65rem] font-semibold uppercase tracking-wide text-[var(--color-portal-muted)]">
              Essentials covered
            </span>
          </div>
        </div>

        <div className="mt-4 h-2 overflow-hidden rounded-full bg-[var(--color-portal-border)]">
          <div
            className="h-full rounded-full bg-[var(--color-portal-gold)] transition-all duration-500"
            style={{ width: `${completeness}%` }}
          />
        </div>
        <p className="mt-2 text-xs text-[var(--color-portal-muted)]">
          {coveredEssentials} of {essentialCategories.length} key areas documented
          {items.length > 0 ? ` · ${items.length} total ${items.length === 1 ? "entry" : "entries"}` : ""}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button type="button" className="portal-btn-primary text-sm" onClick={() => openAdd()}>
          <Plus className="h-4 w-4" />
          Add entry
        </button>
        {items.length > 0 && (
          <button type="button" className="portal-btn-secondary text-sm" onClick={copySummary}>
            <Copy className="h-4 w-4" />
            {copyStatus === "done" ? "Copied!" : "Copy summary"}
          </button>
        )}
      </div>

      <div className="portal-filter-bar">
        <button
          type="button"
          className={`portal-filter-chip${filter === "ALL" ? " active" : ""}`}
          onClick={() => setFilter("ALL")}
        >
          All ({items.length})
        </button>
        {CATEGORIES.map((cat) => {
          const count = items.filter((i) => i.category === cat.id).length;
          return (
            <button
              key={cat.id}
              type="button"
              className={`portal-filter-chip${filter === cat.id ? " active" : ""}`}
              onClick={() => setFilter(cat.id)}
            >
              {cat.label}
              {count > 0 ? ` (${count})` : ""}
            </button>
          );
        })}
      </div>

      {showForm && (
        <form className="portal-card space-y-4 p-5 md:p-6" onSubmit={handleSubmit}>
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-semibold text-[var(--color-portal-text)]">
              {editingId ? "Edit entry" : "New vault entry"}
            </h3>
            <button type="button" className="portal-btn-ghost !min-h-0 !p-2" onClick={closeForm} aria-label="Close">
              <X className="h-4 w-4" />
            </button>
          </div>

          <label className="legacy-vault-field">
            <span>Category</span>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value as VaultCategory })}
              className="legacy-vault-input"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.label} — {cat.hint}
                </option>
              ))}
            </select>
          </label>

          <label className="legacy-vault-field">
            <span>Title *</span>
            <input
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="legacy-vault-input"
              placeholder="e.g. Term life policy — primary earner"
            />
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="legacy-vault-field">
              <span>Institution / company</span>
              <input
                value={form.institution}
                onChange={(e) => setForm({ ...form, institution: e.target.value })}
                className="legacy-vault-input"
                placeholder="e.g. Northwestern Mutual"
              />
            </label>
            <label className="legacy-vault-field">
              <span>Reference (policy #, last 4, location)</span>
              <input
                value={form.accountRef}
                onChange={(e) => setForm({ ...form, accountRef: e.target.value })}
                className="legacy-vault-input"
                placeholder="e.g. Policy ****4821 or Safe deposit box"
              />
            </label>
          </div>

          <label className="legacy-vault-field">
            <span>Notes & instructions</span>
            <textarea
              rows={3}
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              className="legacy-vault-input resize-y"
              placeholder="Beneficiary contacts, attorney name, where originals are stored…"
            />
          </label>

          <label className="flex cursor-pointer items-center gap-2 text-sm text-[var(--color-portal-text)]">
            <input
              type="checkbox"
              checked={form.hasDocument}
              onChange={(e) => setForm({ ...form, hasDocument: e.target.checked })}
              className="h-4 w-4 accent-[var(--color-portal-gold)]"
            />
            I have the original document or policy on file (somewhere secure)
          </label>

          <div className="flex flex-wrap gap-2 pt-1">
            <button type="submit" className="portal-btn-primary text-sm">
              {editingId ? "Save changes" : "Add to vault"}
            </button>
            <button type="button" className="portal-btn-secondary text-sm" onClick={closeForm}>
              Cancel
            </button>
          </div>
        </form>
      )}

      {filtered.length === 0 ? (
        <div className="portal-empty portal-card">
          <FileText className="mx-auto mb-3 opacity-40" />
          <p className="font-medium text-[var(--color-portal-text)]">No entries yet</p>
          <p className="mt-1 max-w-md text-sm">
            Start with life insurance and beneficiary instructions — the two items families
            need most after a loss.
          </p>
          <button type="button" className="portal-btn-primary mt-4 text-sm" onClick={() => openAdd("LIFE_INSURANCE")}>
            <Plus className="h-4 w-4" />
            Add first entry
          </button>
        </div>
      ) : (
        <ul className="space-y-3">
          {filtered.map((item) => {
            const meta = categoryMeta(item.category);
            const Icon = meta.icon;
            return (
              <li key={item.id} className="portal-card p-4 md:p-5">
                <div className="flex gap-3">
                  <div className="portal-tool-icon !h-10 !w-10 shrink-0">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <span className="text-[0.65rem] font-bold uppercase tracking-wider text-[var(--color-portal-gold)]">
                          {meta.label}
                        </span>
                        <h4 className="font-semibold text-[var(--color-portal-text)]">{item.title}</h4>
                      </div>
                      <div className="flex shrink-0 gap-1">
                        <button
                          type="button"
                          className="portal-btn-ghost !min-h-0 !p-2"
                          onClick={() => openEdit(item)}
                          aria-label="Edit"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          className="portal-btn-ghost !min-h-0 !p-2 text-red-600 hover:!text-red-700"
                          onClick={() => handleDelete(item.id)}
                          aria-label="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    {(item.institution || item.accountRef) && (
                      <p className="mt-1 text-sm text-[var(--color-portal-muted)]">
                        {[item.institution, item.accountRef].filter(Boolean).join(" · ")}
                      </p>
                    )}
                    {item.notes && (
                      <p className="mt-2 text-sm leading-relaxed text-[var(--color-portal-text)]">{item.notes}</p>
                    )}
                    <div className="mt-2 flex flex-wrap gap-2 text-xs">
                      {item.hasDocument && (
                        <span className="rounded-full bg-[var(--color-portal-accent-light)] px-2 py-0.5 font-semibold text-[var(--color-portal-accent)]">
                          Document on file
                        </span>
                      )}
                      <span className="text-[var(--color-portal-muted)]">
                        Updated {new Date(item.updatedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      <p className="rounded-lg border border-dashed border-[var(--color-portal-border)] bg-white/60 px-4 py-3 text-xs leading-relaxed text-[var(--color-portal-muted)]">
        <strong className="text-[var(--color-portal-text)]">Privacy:</strong> Vault data is stored
        only in this browser on your device — not on Legacy in Motion servers. Do not enter full
        account numbers or SSNs; use references your family can use to locate documents. For a
        full estate review, book a consultation with your advisor.
      </p>
    </div>
  );
}
