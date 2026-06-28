"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  TOOLS,
  TOOL_AUDIENCE_META,
  TOOL_CATEGORY_LABELS,
  groupToolsByAudience,
  type ToolAudience,
  type ToolDefinition,
} from "@/lib/tools";
import { canAccessTool, hasActivePremium, hasPurchase } from "@/lib/access";
import { PRODUCTS } from "@/lib/products";
import { isPreviewUnlockAll } from "@/lib/preview-access";
import type { User, Purchase } from "@prisma/client";
import { ToolIcon } from "./DashboardShell";
import { ArrowRight, Sparkles, Wrench } from "lucide-react";
import UnlockToolsModal, { UnlockToolsBanner } from "./UnlockToolsModal";

type UserWithPurchases = User & { purchases: Purchase[] };

type AudienceFilter = "all" | ToolAudience;

const FILTERS: { key: AudienceFilter; label: string }[] = [
  { key: "all", label: "All tools" },
  { key: "customer", label: TOOL_AUDIENCE_META.customer.shortLabel },
  { key: "agent", label: TOOL_AUDIENCE_META.agent.shortLabel },
  { key: "other", label: TOOL_AUDIENCE_META.other.shortLabel },
];

const AUDIENCE_ORDER: ToolAudience[] = ["customer", "agent", "other"];

const accessBadge = (tool: ToolDefinition, user: UserWithPurchases | null) => {
  if (isPreviewUnlockAll()) {
    return { label: "Preview", className: "preview" };
  }
  const access = canAccessTool(user, tool);
  if (access.allowed) {
    if (tool.access === "free") return { label: "Free", className: "free" };
    return { label: "Unlocked", className: "unlocked" };
  }
  if (tool.access === "one_time" && tool.productKey) {
    const product = PRODUCTS[tool.productKey];
    return { label: product?.priceLabel ?? "Paid", className: "locked" };
  }
  if (tool.access === "premium") return { label: PRODUCTS.PREMIUM_MONTHLY.priceLabel, className: "locked" };
  if (tool.access === "hybrid") return { label: PRODUCTS.PREMIUM_HYBRID.priceLabel, className: "locked" };
  return { label: "Locked", className: "locked" };
};

function ToolCard({ tool, user }: { tool: ToolDefinition; user: UserWithPurchases | null }) {
  const badge = accessBadge(tool, user);
  return (
    <Link href={`/dashboard/tools/${tool.slug}`} className="portal-card portal-tool-card group">
      <div className="portal-tool-card-header">
        <div className="portal-tool-icon">
          <ToolIcon name={tool.icon} className="h-5 w-5" />
        </div>
        <span className={`portal-tool-badge ${badge.className}`}>{badge.label}</span>
      </div>
      <h2 className="portal-tool-name">{tool.name}</h2>
      <p className="portal-tool-desc">{tool.description}</p>
      <div className="portal-tool-footer">
        <span className="portal-tool-category">{TOOL_CATEGORY_LABELS[tool.category]}</span>
        <span className="portal-tool-cta">
          Open
          <ArrowRight aria-hidden />
        </span>
      </div>
    </Link>
  );
}

export default function ToolGrid({ user }: { user: UserWithPurchases | null }) {
  const [audience, setAudience] = useState<AudienceFilter>("all");
  const [search, setSearch] = useState("");
  const preview = isPreviewUnlockAll();
  const premium = user ? hasActivePremium(user) : false;

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return TOOLS.filter((tool) => {
      const matchAudience = audience === "all" || tool.audience === audience;
      const matchSearch =
        !q ||
        tool.name.toLowerCase().includes(q) ||
        tool.description.toLowerCase().includes(q) ||
        tool.category.includes(q) ||
        TOOL_AUDIENCE_META[tool.audience].label.toLowerCase().includes(q);
      return matchAudience && matchSearch;
    });
  }, [audience, search]);

  const grouped = useMemo(() => groupToolsByAudience(filtered), [filtered]);

  const unlockedCount = TOOLS.filter((t) => canAccessTool(user, t).allowed).length;
  const byAudience = groupToolsByAudience();

  return (
    <>
      <UnlockToolsModal user={user} />
      <UnlockToolsBanner user={user} />
      <div className="portal-hub-hero">
        <p className="portal-hub-eyebrow">
          <Sparkles className="h-3.5 w-3.5" aria-hidden />
          Financial command center
        </p>
        <h1 className="portal-hub-title">Your wealth toolkit</h1>
        <p className="portal-hub-sub portal-hub-sub--compact">
          Tools organized for clients, advisors, and workshops — analyze coverage, eliminate debt,
          forecast retirement, and protect your legacy.
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
          <div className="portal-stat-value">{byAudience.customer.length}</div>
          <div className="portal-stat-label">For clients</div>
        </div>
        <div className="portal-stat-card">
          <div className="portal-stat-value">{byAudience.agent.length}</div>
          <div className="portal-stat-label">For advisors</div>
        </div>
        <div className="portal-stat-card">
          <div className="portal-stat-value accent">{preview ? TOOLS.length : unlockedCount}</div>
          <div className="portal-stat-label">{preview ? "Unlocked (preview)" : "Unlocked"}</div>
        </div>
      </div>

      <div className="mb-4 md:hidden">
        <input
          type="search"
          placeholder="Search tools…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border border-[var(--color-portal-border)] bg-white px-3 py-2.5 text-sm outline-none focus:border-[var(--color-portal-gold)] focus:ring-2 focus:ring-[rgba(166,124,0,0.12)]"
          aria-label="Search tools"
        />
      </div>

      <div className="portal-filter-bar" role="tablist" aria-label="Filter tools by audience">
        {FILTERS.map(({ key, label }) => (
          <button
            key={key}
            type="button"
            role="tab"
            aria-selected={audience === key}
            className={`portal-filter-chip${audience === key ? " active" : ""}`}
            onClick={() => setAudience(key)}
          >
            {label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="portal-empty portal-card">
          <Wrench aria-hidden />
          <p>No tools match your search. Try a different term or filter.</p>
        </div>
      ) : audience === "all" ? (
        <div className="portal-tool-sections">
          {AUDIENCE_ORDER.map((key) => {
            const tools = grouped[key];
            if (tools.length === 0) return null;
            const meta = TOOL_AUDIENCE_META[key];
            return (
              <section key={key} className="portal-tool-section" aria-labelledby={`section-${key}`}>
                <div className="portal-tool-section-header">
                  <h2 id={`section-${key}`} className="portal-tool-section-title">
                    {meta.label}
                  </h2>
                  <p className="portal-tool-section-desc">{meta.description}</p>
                </div>
                <div className="portal-tools-grid">
                  {tools.map((tool) => (
                    <ToolCard key={tool.slug} tool={tool} user={user} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      ) : (
        <div className="portal-tools-grid">
          {filtered.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} user={user} />
          ))}
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
    <div className="portal-stats-row portal-stats-row--triple mb-4 sm:mb-6">
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
