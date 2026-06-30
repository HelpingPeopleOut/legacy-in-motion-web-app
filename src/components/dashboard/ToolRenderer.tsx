"use client";

import dynamic from "next/dynamic";
import Paywall from "@/components/dashboard/Paywall";
import CheckoutButton from "@/components/dashboard/CheckoutButton";
import PortalToolIntro from "@/components/dashboard/PortalToolIntro";
import PortalWorkspace from "@/components/dashboard/ui/PortalWorkspace";
import ToolLoadingSkeleton from "@/components/dashboard/ui/ToolLoadingSkeleton";
import type { ToolDefinition } from "@/lib/tools";
import type { AccessResult } from "@/lib/access";
import { isPreviewUnlockAll } from "@/lib/preview-access";
import { PRODUCTS } from "@/lib/products";
import { BarChart3, Calculator, Clock, Shield, TrendingUp } from "lucide-react";
import type { ComponentType } from "react";

function portalDynamic<T extends ComponentType<unknown>>(
  importer: () => Promise<{ default: T }>
) {
  return dynamic(importer, {
    ssr: false,
    loading: () => <ToolLoadingSkeleton />,
  });
}

const DIMECalculator = portalDynamic(() => import("@/components/DIMECalculator"));
const TaxFreeComparison = portalDynamic(() => import("@/components/TaxFreeComparison"));
const WealthCalculator = portalDynamic(() => import("@/components/WealthCalculator"));
const RuleOf72 = portalDynamic(() => import("@/components/RuleOf72"));
const CostOfWaiting = portalDynamic(() => import("@/components/CostOfWaiting"));
const LegacyVault = portalDynamic(() => import("@/components/dashboard/LegacyVault"));
const BeneficiaryChecklist = portalDynamic(() => import("@/components/dashboard/BeneficiaryChecklist"));
const AgentMeetingPrep = portalDynamic(() => import("@/components/dashboard/AgentMeetingPrep"));
const MortgageProtectionEst = portalDynamic(() => import("@/components/dashboard/MortgageProtectionEst"));
const CollegeFundingPlanner = portalDynamic(() => import("@/components/dashboard/CollegeFundingPlanner"));
const HlvReportPanel = portalDynamic(() => import("@/components/dashboard/HlvReportPanel"));
const FinancialVitalSigns = portalDynamic(() => import("@/components/dashboard/FinancialVitalSigns"));
const PolicyLadderTracker = portalDynamic(() => import("@/components/dashboard/PolicyLadderTracker"));
const WhatIfScenarios = portalDynamic(() => import("@/components/dashboard/WhatIfScenarios"));
const SecureDocumentHub = portalDynamic(() => import("@/components/dashboard/SecureDocumentHub"));
const EmergencyFundBuilder = portalDynamic(() => import("@/components/dashboard/EmergencyFundBuilder"));
const DebtFreedomPortal = portalDynamic(() => import("@/components/dashboard/DebtFreedomPortal"));

const calcHost = "portal-calculator-host";

interface ToolRendererProps {
  tool: ToolDefinition;
  access: AccessResult;
  hlvReportAccess: AccessResult;
}

export default function ToolRenderer({ tool, access, hlvReportAccess }: ToolRendererProps) {
  const preview = isPreviewUnlockAll();
  const allowed = preview || access.allowed;
  const hlvAllowed = preview || hlvReportAccess.allowed;

  if (!allowed) {
    return (
      <Paywall
        title={tool.name}
        message={access.message}
        reason={access.reason}
        productKey={"productKey" in access ? access.productKey : undefined}
        priceLabel={
          access.reason === "premium"
            ? PRODUCTS.PREMIUM_MONTHLY.priceLabel
            : access.reason === "hybrid"
              ? PRODUCTS.PREMIUM_HYBRID.priceLabel
              : tool.productKey === "LEGACY_VAULT"
                ? "$99"
                : "$49"
        }
        advisorCta={tool.advisorCta}
      />
    );
  }

  const renderTool = () => {
    switch (tool.slug) {
      case "legacy-vault":
        return <LegacyVault />;
      case "beneficiary-checklist":
        return <BeneficiaryChecklist />;
      case "financial-vital-signs":
        return <FinancialVitalSigns />;
      case "policy-ladder":
        return <PolicyLadderTracker />;
      case "secure-portal":
        return <SecureDocumentHub />;
      case "emergency-fund":
        return <EmergencyFundBuilder />;
      case "debt-freedom":
        return <DebtFreedomPortal />;
      case "mortgage-protection":
        return <MortgageProtectionEst />;
      case "meeting-prep":
        return <AgentMeetingPrep />;
      case "what-if-scenarios":
        return <WhatIfScenarios />;
      case "college-funding":
        return <CollegeFundingPlanner />;
      case "human-life-value":
        return (
          <div className={calcHost}>
            <DIMECalculator />
          </div>
        );
      case "term-vs-permanent":
        return (
          <>
            <PortalToolIntro
              icon={BarChart3}
              eyebrow="Product comparison"
              title="Term vs. permanent — side by side"
              description="Walk through this live with clients. Compare permanent cash value vs. term plus investing the difference."
            />
            <div className={calcHost}>
              <TaxFreeComparison />
            </div>
          </>
        );
      case "retirement-forecaster":
        return (
          <>
            <PortalToolIntro
              icon={TrendingUp}
              eyebrow="Retirement planning"
              title="Tax-free vs. taxable retirement income"
              description="Adjust inputs to show how tax drag changes spendable income — strong workshop and review tool."
            />
            <div className={calcHost}>
              <WealthCalculator />
            </div>
          </>
        );
      case "rule-of-72":
        return (
          <>
            <PortalToolIntro
              icon={Calculator}
              eyebrow="Quick demo"
              title="How fast does money double?"
              description="Enter any rate of return — great 30-second teaching moment in workshops."
            />
            <div className={calcHost}>
              <RuleOf72 />
            </div>
          </>
        );
      case "cost-of-waiting":
        return (
          <>
            <PortalToolIntro
              icon={Clock}
              eyebrow="Urgency without pressure"
              title="The cost of waiting"
              description="Show what delaying saving or protecting your family costs over 5, 10, and 20 years."
            />
            <div className={calcHost}>
              <CostOfWaiting />
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {tool.slug === "human-life-value" && (
        <PortalToolIntro
          icon={Shield}
          eyebrow="Needs analysis"
          title="How much coverage does your family need?"
          description="D.I.M.E. method — debt, income to replace, mortgage, education. Calculator is free; branded PDF report unlocks below."
        />
      )}

      <PortalWorkspace>{renderTool()}</PortalWorkspace>

      {tool.slug === "human-life-value" && (
        <>
          {hlvAllowed ? (
            <HlvReportPanel />
          ) : (
            <div className="portal-card p-6">
              <h3 className="mb-2 font-semibold text-[var(--color-portal-text)]">
                Family Financial Security Report (PDF)
              </h3>
              <p className="mb-4 text-sm text-[var(--color-portal-muted)]">{hlvReportAccess.message}</p>
              <CheckoutButton productKey="HLV_REPORT" label={`Download Report — ${PRODUCTS.HLV_REPORT.priceLabel}`} />
            </div>
          )}
        </>
      )}

      {tool.advisorCta && (
        <div className="portal-advisor-cta">
          <p className="text-sm text-[var(--color-portal-muted)]">{tool.advisorCta}</p>
          <a href="/#consultation" className="portal-btn-primary mt-3 inline-flex text-sm">
            Schedule your free strategy session
          </a>
        </div>
      )}
    </div>
  );
}
