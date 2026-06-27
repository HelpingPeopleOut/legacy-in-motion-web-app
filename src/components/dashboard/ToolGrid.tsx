"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { TOOLS, type ToolDefinition } from "@/lib/tools";
import { canAccessTool, hasActivePremium, hasPurchase } from "@/lib/access";
import { isPreviewUnlockAll } from "@/lib/preview-access";
import type { User, Purchase } from "@prisma/client";
import { ToolIcon } from "./DashboardShell";
import { ArrowRight, Sparkles, Wrench } from "lucide-react";

type UserWithPurchases = User & { purchases: Purchase[] };

type CategoryFilter = "all" | ToolDefinition["category"];

const FILTERS: { key: CategoryFilter; label: string }[] = [
  { key: "all", label: "All tools" },
  { key: "analyzer", label: "Analyzers" },
  { key: "tracker", label: "Trackers" },
  { key: "simulator", label: "Simulators" },
  { key: "portal", label: "Vault & Portal" },
];

const accessBadge = (tool: ToolDefinition, user: UserWithPurchases | null) => {
  if (isPreviewUnlockAll()) {
    return { label: "Preview", className: "preview" };
  }
  const access = canAccessTool(user, tool);
  if (access.allowed) {
    if (tool.access === "free") return { label: "Free", className: "free" };
    return { label: "Unlocked", className: "unlocked" };
  }
  if (tool.access === "one_time")
    return { label: tool.productKey === "HLV_REPORT" ? "$49" : "$99", className: "locked" };
  if (tool.access === "premium") return { label: "Premium", className: "locked" };
  return { label: "Advisor+", className: "locked" };
};

export default function ToolGrid({ user }: { user: UserWithPurchases | null }) {
  const [category, setCategory] = useState<CategoryFilter>("all");
  const [search, setSearch] = useState("");
  const preview = isPreviewUnlockAll();
  const premium = user ? hasActivePremium(user) : false;

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return TOOLS.filter((tool) => {
      const matchCat = category === "all" || tool.category === category;
      const matchSearch =
        !q ||
        tool.name.toLowerCase().includes(q) ||
        tool.description.toLowerCase().includes(q) ||
        tool.category.includes(q);
      return matchCat && matchSearch;
    });
  }, [category, search]);

  const unlockedCount = TOOLS.filter((t) => canAccessTool(user, t).allowed).length;

  return (
    <>
      <div className="portal-hub-hero">
        <p className="portal-hub-eyebrow">
          <Sparkles className="h-3.5 w-3.5" aria-hidden />
          Financial command center
        </p>
        <h1 className="portal-hub-title">
          Your complete wealth toolkit
        </h1>
        <p className="portal-hub-sub">
          Analyze coverage, eliminate debt, forecast retirement, and protect your legacy — all in one secure client workspace.
          {preview && " Preview mode: every tool is unlocked for testing."}
          {!preview && premium && " Your Premium plan is active."}
        </p>
      </div>

      <div className="portal-stats-row">
        <div className="portal-stat-card">
          <div className="portal-stat-value gold">{TOOLS.length}</div>
          <div className="portal-stat-label">Total tools</div>
        </div>
        <div className="portal-stat-card">
          <div className="portal-stat-value accent">{preview ? TOOLS.length : unlockedCount}</div>
          <div className="portal-stat-label">{preview ? "Unlocked (preview)" : "Unlocked"}</div>
        </div>
        <div className="portal-stat-card">
          <div className="portal-stat-value">{TOOLS.filter((t) => t.access === "free").length}</div>
          <div className="portal-stat-label">Always free</div>
        </div>
        <div className="portal-stat-card">
          <div className="portal-stat-value">{TOOLS.filter((t) => t.category === "simulator").length}</div>
          <div className="portal-stat-label">Simulators</div>
        </div>
      </div>

      <div className="mb-4 md:hidden">
        <input
          type="search"
          placeholder="Search tools…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border border-[var(--color-portal-border)] bg-white px-4 py-3 text-sm outline-none focus:border-[var(--color-portal-gold)] focus:ring-2 focus:ring-[rgba(166,124,0,0.12)]"
          aria-label="Search tools"
        />
      </div>

      <div className="portal-filter-bar" role="tablist" aria-label="Filter tools by category">
        {FILTERS.map(({ key, label }) => (
          <button
            key={key}
            type="button"
            role="tab"
            aria-selected={category === key}
            className={`portal-filter-chip${category === key ? " active" : ""}`}
            onClick={() => setCategory(key)}
          >
            {label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="portal-empty portal-card">
          <Wrench aria-hidden />
          <p>No tools match your search. Try a different term or category.</p>
        </div>
      ) : (
        <div className="portal-tools-grid">
          {filtered.map((tool) => {
            const badge = accessBadge(tool, user);
            return (
              <Link
                key={tool.slug}
                href={`/dashboard/tools/${tool.slug}`}
                className="portal-card portal-tool-card group"
              >
                <div className="portal-tool-card-header">
                  <div className="portal-tool-icon">
                    <ToolIcon name={tool.icon} className="h-5 w-5" />
                  </div>
                  <span className={`portal-tool-badge ${badge.className}`}>{badge.label}</span>
                </div>
                <h2 className="portal-tool-name">{tool.name}</h2>
                <p className="portal-tool-desc">{tool.description}</p>
                <div className="portal-tool-footer">
                  <span className="portal-tool-category">{tool.category}</span>
                  <span className="portal-tool-cta">
                    Open
                    <ArrowRight aria-hidden />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
}

export function UserStatusBanner({ user }: { user: UserWithPurchases }) {
  const preview = isPreviewUnlockAll();
  const premium = hasActivePremium(user);
  const vault = hasPurchase(user, "LEGACY_VAULT");
  const hlv = hasPurchase(user, "HLV_REPORT");

  if (preview) return null;

  return (
    <div className="portal-stats-row mb-6">
      {[
        { label: "Premium plan", active: premium, value: premium ? "Active" : "—" },
        { label: "HLV report", active: hlv, value: hlv ? "Owned" : "—" },
        { label: "Legacy vault", active: vault, value: vault ? "Owned" : "—" },
      ].map((item) => (
        <div key={item.label} className="portal-stat-card">
          <div className={`portal-stat-value${item.active ? " accent" : ""}`}>{item.value}</div>
          <div className="portal-stat-label">{item.label}</div>
        </div>
      ))}
    </div>
  );
}
