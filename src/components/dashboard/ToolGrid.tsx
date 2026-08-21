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
import { canAccessTool, hasActivePremium } from "@/lib/access";
import { PRODUCTS } from "@/lib/products";
import { isPreviewUnlockAll } from "@/lib/preview-access";
import type { Purchase, User } from "@prisma/client";
import { usePortalUser } from "@/hooks/usePortalUser";
import { ToolIcon } from "./ToolIcon";
import {
  ArrowRight,
  Briefcase,
  GraduationCap,
  LayoutGrid,
  Search,
  Sparkles,
  Star,
  Unlock,
  Users,
  Wrench,
} from "lucide-react";
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

const FEATURED_SLUGS = [
  "financial-vital-signs",
  "legacy-vault",
  "human-life-value",
  "debt-freedom",
] as const;

const QUICK_PATHS = [
  {
    slug: "financial-vital-signs",
    label: "Start here",
    title: "2-minute financial checkup",
    desc: "See emergency savings, debt pressure, and protection at a glance.",
  },
  {
    slug: "debt-freedom",
    label: "Popular",
    title: "Debt payoff visualizer",
    desc: "Map your path to zero credit card interest.",
  },
  {
    slug: "legacy-vault",
    label: "Protect",
    title: "Digital legacy vault",
    desc: "Policies, wills, and beneficiaries in one place.",
  },
  {
    slug: "human-life-value",
    label: "Advisor",
    title: "Coverage needs analyzer",
    desc: "D.I.M.E. method for exact protection amounts.",
  },
] as const;

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

function ToolCard({
  tool,
  user,
  featured = false,
  delay = 0,
}: {
  tool: ToolDefinition;
  user: UserWithPurchases | null;
  featured?: boolean;
  delay?: number;
}) {
  const badge = accessBadge(tool, user);
  const unlocked = badge.className === "unlocked" || badge.className === "free" || badge.className === "preview";

  return (
    <Link
      href={`/dashboard/tools/${tool.slug}`}
      className={`portal-card portal-tool-card group portal-fade-in${featured ? " portal-tool-card--featured" : ""}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {featured && <span className="portal-tool-card-glow" aria-hidden />}
      <div className="portal-tool-card-header">
        <div className="portal-tool-icon">
          <ToolIcon name={tool.icon} className="h-5 w-5" />
        </div>
        <span className={`portal-tool-badge ${badge.className}`}>{badge.label}</span>
      </div>
      <h2 className="portal-tool-name">{tool.name}</h2>
      <p className="portal-tool-desc">{tool.description}</p>
      <div className="portal-tool-footer">
        <span className="portal-tool-category flex items-center gap-1.5">
          <span className={`portal-tool-audience-dot portal-tool-audience-dot--${tool.audience}`} aria-hidden />
          {TOOL_CATEGORY_LABELS[tool.category]}
        </span>
        <span className="portal-tool-cta">
          {unlocked ? "Open" : "View"}
          <ArrowRight aria-hidden />
        </span>
      </div>
    </Link>
  );
}

export default function ToolGrid() {
  const [audience, setAudience] = useState<AudienceFilter>("all");
  const [search, setSearch] = useState("");
  const { user, loading, preview, stripeLive } = usePortalUser();
  const premium = user ? hasActivePremium(user) : false;

  if (stripeLive && !preview && loading) {
    return (
      <div className="portal-hub-panel portal-fade-in">
        <div className="portal-hub-panel-inner">
          <div className="portal-skeleton-line portal-skeleton-line--title" />
          <div className="portal-skeleton-line portal-skeleton-line--medium mt-3" />
          <div className="portal-skeleton-grid mt-6">
            <div className="portal-skeleton-card" />
            <div className="portal-skeleton-card" />
            <div className="portal-skeleton-card portal-skeleton-card--wide" />
          </div>
        </div>
      </div>
    );
  }

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

  const featuredTools = FEATURED_SLUGS.map((slug) => TOOLS.find((t) => t.slug === slug)).filter(
    Boolean
  ) as ToolDefinition[];

  const stats = [
    { label: "Total tools", value: TOOLS.length, tone: "gold" as const, icon: LayoutGrid },
    { label: "For clients", value: byAudience.customer.length, tone: "default" as const, icon: Users },
    { label: "For advisors", value: byAudience.agent.length, tone: "default" as const, icon: Briefcase },
    {
      label: preview ? "Unlocked (preview)" : "Unlocked",
      value: preview ? TOOLS.length : unlockedCount,
      tone: "accent" as const,
      icon: Unlock,
    },
  ];

  return (
    <>
      <UnlockToolsModal user={user} />
      <UnlockToolsBanner user={user} />

      <div className="portal-hub-panel portal-fade-in">
        <div className="portal-hub-panel-inner">
          <p className="portal-hub-eyebrow">
            <Sparkles className="h-3.5 w-3.5" aria-hidden />
            Financial command center
          </p>
          <h1 className="portal-hub-title">Your wealth toolkit</h1>
          <p className="portal-hub-sub portal-hub-sub--compact">
            A premium workspace for clients and advisors — analyze coverage, eliminate debt, forecast
            retirement, and protect your legacy.
            {preview && " Preview mode: every tool is unlocked for testing."}
            {!preview && premium && " Your Premium plan is active."}
          </p>

          <div className="portal-hub-toolbar">
            <div className="portal-hub-search">
              <Search aria-hidden />
              <input
                type="search"
                placeholder="Search tools by name, topic, or audience…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                aria-label="Search tools"
              />
              {search.trim() && (
                <p className="portal-hub-search-count">
                  {filtered.length} result{filtered.length === 1 ? "" : "s"}
                </p>
              )}
            </div>
            <Link href="/dashboard/billing" className="portal-btn-primary shrink-0 text-sm">
              {premium || preview ? "Manage plan" : "Upgrade access"}
            </Link>
          </div>
        </div>
      </div>

      <div className="portal-stats-row portal-fade-in portal-fade-in-delay-1">
        {stats.map((stat) => (
          <div key={stat.label} className="portal-stat-card portal-stat-card--premium">
            <div className="portal-stat-icon">
              <stat.icon className="h-4 w-4" aria-hidden />
            </div>
            <div className={`portal-stat-value${stat.tone !== "default" ? ` ${stat.tone}` : ""}`}>
              {stat.value}
            </div>
            <div className="portal-stat-label">{stat.label}</div>
          </div>
        ))}
      </div>

      {!search.trim() && audience === "all" && (
        <>
          <p className="portal-section-eyebrow portal-fade-in portal-fade-in-delay-2">
            <Star className="h-3.5 w-3.5" aria-hidden />
            Quick start
          </p>
          <div className="portal-quick-paths portal-fade-in portal-fade-in-delay-2">
            {QUICK_PATHS.map((path) => {
              const tool = TOOLS.find((t) => t.slug === path.slug);
              if (!tool) return null;
              return (
                <Link key={path.slug} href={`/dashboard/tools/${path.slug}`} className="portal-quick-path">
                  <div className="portal-quick-path-icon">
                    <ToolIcon name={tool.icon} className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="portal-quick-path-label">{path.label}</p>
                    <p className="portal-quick-path-title">{path.title}</p>
                    <p className="portal-quick-path-desc">{path.desc}</p>
                  </div>
                </Link>
              );
            })}
          </div>

          <p className="portal-section-eyebrow portal-fade-in portal-fade-in-delay-3">
            <GraduationCap className="h-3.5 w-3.5" aria-hidden />
            Featured tools
          </p>
          <div className="portal-tools-grid mb-8 portal-fade-in portal-fade-in-delay-3">
            {featuredTools.map((tool, i) => (
              <ToolCard key={tool.slug} tool={tool} user={user} featured delay={i * 40} />
            ))}
          </div>
        </>
      )}

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
      ) : audience === "all" && !search.trim() ? (
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
                  {tools.map((tool, i) => (
                    <ToolCard key={tool.slug} tool={tool} user={user} delay={i * 30} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      ) : (
        <div className="portal-tools-grid">
          {filtered.map((tool, i) => (
            <ToolCard key={tool.slug} tool={tool} user={user} delay={i * 25} />
          ))}
        </div>
      )}
    </>
  );
}

export function UserStatusBanner({ user }: { user: UserWithPurchases }) {
  const preview = isPreviewUnlockAll();
  const premium = hasActivePremium(user);
  const vault = user.purchases.some((p) => p.productKey === "LEGACY_VAULT");
  const hlv = user.purchases.some((p) => p.productKey === "HLV_REPORT");

  if (preview) return null;

  return (
    <div className="portal-stats-row portal-stats-row--triple mb-4 sm:mb-6 portal-fade-in">
      {[
        { label: "Premium plan", active: premium, value: premium ? "Active" : "—" },
        { label: "HLV report", active: hlv, value: hlv ? "Owned" : "—" },
        { label: "Legacy vault", active: vault, value: vault ? "Owned" : "—" },
      ].map((item) => (
        <div key={item.label} className="portal-stat-card portal-stat-card--premium">
          <div className={`portal-stat-value${item.active ? " accent" : ""}`}>{item.value}</div>
          <div className="portal-stat-label">{item.label}</div>
        </div>
      ))}
    </div>
  );
}
