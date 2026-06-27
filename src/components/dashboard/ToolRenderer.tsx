"use client";

import dynamic from "next/dynamic";
import Paywall from "@/components/dashboard/Paywall";
import CheckoutButton from "@/components/dashboard/CheckoutButton";
import type { ToolDefinition } from "@/lib/tools";
import type { AccessResult } from "@/lib/access";

const DIMECalculator = dynamic(() => import("@/components/DIMECalculator"), { ssr: false });
const TaxFreeComparison = dynamic(() => import("@/components/TaxFreeComparison"), { ssr: false });
const WealthCalculator = dynamic(() => import("@/components/WealthCalculator"), { ssr: false });
const ProgressTracker = dynamic(() => import("@/components/ProgressTracker"), { ssr: false });
const DebtFreedomVisualizer = dynamic(() => import("@/components/DebtFreedomVisualizer"), { ssr: false });
const RuleOf72 = dynamic(() => import("@/components/RuleOf72"), { ssr: false });
const CostOfWaiting = dynamic(() => import("@/components/CostOfWaiting"), { ssr: false });

function LegacyVaultPlaceholder() {
  return (
    <div className="portal-card p-6 text-[var(--color-portal-muted)]">
      <p className="mb-4">Digital inventory for policies, wills, bank accounts, and beneficiary instructions.</p>
      <ul className="list-inside list-disc space-y-2 text-sm">
        <li>Life insurance policies & policy numbers</li>
        <li>Wills, trusts, and estate documents</li>
        <li>Bank & retirement account locations</li>
        <li>Beneficiary contact instructions</li>
      </ul>
      <p className="mt-4 text-sm italic">Full vault CRUD + encrypted storage — Phase 2.</p>
    </div>
  );
}

function VitalSignsPlaceholder() {
  return (
    <div className="portal-card p-6">
      <p className="text-[var(--color-portal-muted)]">
        Net worth, liquidity, debt-to-income, and coverage metrics. Plaid bank sync — Phase 2.
      </p>
    </div>
  );
}

function PolicyLadderPlaceholder() {
  return (
    <div className="portal-card p-6">
      <p className="text-[var(--color-portal-muted)]">
        Add multiple policies, track premium due dates, and get lapse alerts — Phase 2.
      </p>
    </div>
  );
}

function WhatIfPlaceholder() {
  return (
    <div className="portal-card p-6">
      <p className="text-[var(--color-portal-muted)]">
        Model home purchases, new children, or early retirement — Phase 2.
      </p>
    </div>
  );
}

function SecurePortalPlaceholder() {
  return (
    <div className="portal-card p-6">
      <p className="text-[var(--color-portal-muted)]">
        Encrypted document uploads and advisor messaging — Phase 2.
      </p>
    </div>
  );
}

interface ToolRendererProps {
  tool: ToolDefinition;
  access: AccessResult;
  hlvReportAccess: AccessResult;
}

export default function ToolRenderer({ tool, access, hlvReportAccess }: ToolRendererProps) {
  if (!access.allowed) {
    return (
      <Paywall
        title={tool.name}
        message={access.message}
        productKey={"productKey" in access ? access.productKey : undefined}
        priceLabel={
          access.reason === "premium"
            ? "$15/mo"
            : access.reason === "hybrid"
              ? "Advisor+"
              : tool.productKey === "LEGACY_VAULT"
                ? "$99"
                : "$49"
        }
        advisorCta={tool.advisorCta}
      />
    );
  }

  const calculatorWrapper = "rounded-xl overflow-hidden [&_.card]:!shadow-none";

  return (
    <div className="space-y-6">
      <div className={`portal-calculator-host ${calculatorWrapper}`}>
        {tool.slug === "human-life-value" && <DIMECalculator />}
        {tool.slug === "term-vs-permanent" && <TaxFreeComparison />}
        {tool.slug === "retirement-forecaster" && <WealthCalculator />}
        {tool.slug === "emergency-fund" && <ProgressTracker />}
        {tool.slug === "debt-freedom" && <DebtFreedomVisualizer />}
        {tool.slug === "rule-of-72" && <RuleOf72 />}
        {tool.slug === "cost-of-waiting" && <CostOfWaiting />}
        {tool.slug === "legacy-vault" && <LegacyVaultPlaceholder />}
        {tool.slug === "financial-vital-signs" && <VitalSignsPlaceholder />}
        {tool.slug === "policy-ladder" && <PolicyLadderPlaceholder />}
        {tool.slug === "what-if-scenarios" && <WhatIfPlaceholder />}
        {tool.slug === "secure-portal" && <SecurePortalPlaceholder />}
      </div>

      {tool.slug === "human-life-value" && (
        <div className="portal-card p-6">
          <h3 className="mb-2 font-semibold text-[var(--color-portal-text)]">Family Financial Security Report (PDF)</h3>
          {hlvReportAccess.allowed ? (
            <p className="text-sm text-[var(--color-portal-accent)]">Report unlocked — PDF download coming soon.</p>
          ) : (
            <>
              <p className="mb-4 text-sm text-[var(--color-portal-muted)]">{hlvReportAccess.message}</p>
              <CheckoutButton productKey="HLV_REPORT" label="Download Report — $49" />
            </>
          )}
        </div>
      )}

      {tool.advisorCta && (
        <div className="rounded-xl border border-amber-200 bg-[var(--color-portal-gold-light)] p-5 text-center">
          <p className="text-sm text-[var(--color-portal-muted)]">{tool.advisorCta}</p>
          <a
            href="/#consultation"
            className="portal-btn-primary mt-3 inline-flex text-sm"
          >
            Schedule your free strategy session
          </a>
        </div>
      )}
    </div>
  );
}
