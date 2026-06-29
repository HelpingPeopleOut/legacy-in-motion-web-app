"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import CheckoutButton from "@/components/dashboard/CheckoutButton";
import StripeFeeNotice from "@/components/dashboard/StripeFeeNotice";
import { PRODUCTS, getCheckoutTotalLabel, getProcessingFeeLabel } from "@/lib/products";
import { Check } from "lucide-react";

function PricingCard({
  product,
  period,
  featured = false,
  features,
}: {
  product: (typeof PRODUCTS)[string];
  period: string;
  featured?: boolean;
  features?: string[];
}) {
  return (
    <div className={`portal-card portal-pricing-card${featured ? " featured" : ""}`}>
      {featured && <span className="portal-unlock-plan-badge mb-2 inline-block">Best value</span>}
      <h3 className="font-semibold text-[var(--color-portal-text)]">{product.name}</h3>
      <p className="mt-1 text-sm text-[var(--color-portal-muted)]">{product.description}</p>
      <p className="portal-pricing-price">{product.priceLabel}</p>
      <p className="portal-pricing-period">{period}</p>
      <p className="portal-pricing-checkout-total">{getCheckoutTotalLabel(product)}</p>
      {getProcessingFeeLabel(product) && (
        <p className="portal-pricing-fee-note">{getProcessingFeeLabel(product)}</p>
      )}
      {features && features.length > 0 && (
        <ul className="mt-4 flex-1 space-y-2 text-sm text-[var(--color-portal-muted)]">
          {features.map((feature) => (
            <li key={feature} className="flex items-start gap-2">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-portal-accent)]" />
              {feature}
            </li>
          ))}
        </ul>
      )}
      <div className="mt-5">
        <CheckoutButton productKey={product.key} label={`Subscribe — ${product.priceLabel}`} />
      </div>
    </div>
  );
}

export default function BillingContent() {
  const searchParams = useSearchParams();
  const success = searchParams.get("success");
  const canceled = searchParams.get("canceled");
  const [portalLoading, setPortalLoading] = useState(false);

  async function openPortal() {
    setPortalLoading(true);
    try {
      const stripeEnabled = process.env.NEXT_PUBLIC_STRIPE_ENABLED === "true";
      const res = await fetch("/api/stripe/portal", {
        method: "POST",
        credentials: stripeEnabled ? "include" : "same-origin",
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else alert(data.error ?? "Billing portal unavailable.");
    } finally {
      setPortalLoading(false);
    }
  }

  const fortress = PRODUCTS.FAMILY_FORTRESS;
  const oneTime = [PRODUCTS.HLV_REPORT, PRODUCTS.LEGACY_VAULT];
  const clientPlans = [PRODUCTS.PREMIUM_MONTHLY, PRODUCTS.PREMIUM_ANNUAL];
  const advisorPlans = [PRODUCTS.PREMIUM_HYBRID, PRODUCTS.ADVISOR_ANNUAL];

  const fortressFeatures = [
    "Everything in Premium Client Annual",
    "Family Financial Security Report (branded PDF)",
    "Digital Legacy & Vault — keep forever",
    "Financial Vital Signs + Emergency Fund Builder",
    "Policy Ladder + Tax-Free Retirement Forecaster",
    "Save $69+ vs. buying each item separately",
  ];

  const clientFeatures = [
    "Financial Vital Signs checkup",
    "Emergency Fund Builder",
    "Policy ladder tracker",
    "Tax-Free Retirement Forecaster",
  ];

  const advisorFeatures = [
    "All Premium Client tools included",
    "What-If Scenario Modeler",
    "Secure Document Hub",
    "Upcoming advisor releases",
  ];

  return (
    <div>
      <div className="portal-hub-hero">
        <p className="portal-hub-eyebrow">Plans & billing</p>
        <h1 className="portal-hub-title">Upgrade your financial toolkit</h1>
        <p className="portal-hub-sub">
          Clients unlock premium trackers from $5/month. Advisors get the full client workspace plus
          advisor tools from $15/month or $100/year flat. Totals at checkout include card processing so
          Legacy in Motion receives the listed price.
        </p>
      </div>

      <StripeFeeNotice className="mb-8 max-w-2xl" />

      <section className="portal-card mb-10 overflow-x-auto p-5">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-[var(--color-portal-muted)]">
          Full price list
        </h2>
        <table className="portal-pricing-table w-full text-left text-sm">
          <thead>
            <tr>
              <th>Product</th>
              <th>List price</th>
              <th>~Customer pays</th>
            </tr>
          </thead>
          <tbody>
            {Object.values(PRODUCTS).map((p) => (
              <tr key={p.key}>
                <td>{p.name}</td>
                <td>{p.priceLabel}</td>
                <td>{getCheckoutTotalLabel(p)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {success && (
        <div className="mb-6 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          {searchParams.get("mock") === "1"
            ? "Mock purchase applied — tier updated (preview only, no charge)."
            : "Payment successful — your access will update momentarily."}
        </div>
      )}
      {canceled && (
        <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          Checkout canceled. You can upgrade anytime.
        </div>
      )}

      <section className="mb-10">
        <h2 className="mb-1 text-lg font-semibold text-[var(--color-portal-text)]">Best seller</h2>
        <p className="mb-4 text-sm text-[var(--color-portal-muted)]">
          The complete family toolkit — protection analysis, legacy organization, and year-round tracking in one plan.
        </p>
        <div className="portal-pricing-grid cols-1 max-w-xl">
          <div className="portal-card portal-pricing-card featured">
            <span className="portal-unlock-plan-badge mb-2 inline-block">Most popular</span>
            <h3 className="font-semibold text-[var(--color-portal-text)]">{fortress.name}</h3>
            <p className="mt-1 text-sm text-[var(--color-portal-muted)]">{fortress.description}</p>
            <p className="portal-pricing-price">{fortress.priceLabel}</p>
            <p className="portal-pricing-period">Billed annually · HLV + Vault kept even if you cancel later</p>
            <p className="portal-pricing-checkout-total">{getCheckoutTotalLabel(fortress)}</p>
            {getProcessingFeeLabel(fortress) && (
              <p className="portal-pricing-fee-note">{getProcessingFeeLabel(fortress)}</p>
            )}
            <ul className="mt-4 flex-1 space-y-2 text-sm text-[var(--color-portal-muted)]">
              {fortressFeatures.map((feature) => (
                <li key={feature} className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-portal-accent)]" />
                  {feature}
                </li>
              ))}
            </ul>
            <div className="mt-5">
              <CheckoutButton productKey="FAMILY_FORTRESS" label={`Get Fortress — ${fortress.priceLabel}`} />
            </div>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-lg font-semibold text-[var(--color-portal-text)]">One-time purchases</h2>
        <div className="portal-pricing-grid cols-2">
          {oneTime.map((p) => (
            <div key={p.key} className="portal-card portal-pricing-card">
              <h3 className="font-semibold text-[var(--color-portal-text)]">{p.name}</h3>
              <p className="mt-1 text-sm text-[var(--color-portal-muted)]">{p.description}</p>
              <p className="portal-pricing-price">{p.priceLabel}</p>
              <p className="portal-pricing-period">Lifetime access</p>
              <p className="portal-pricing-checkout-total">{getCheckoutTotalLabel(p)}</p>
              {getProcessingFeeLabel(p) && (
                <p className="portal-pricing-fee-note">{getProcessingFeeLabel(p)}</p>
              )}
              <ul className="mt-4 flex-1 space-y-2 text-sm text-[var(--color-portal-muted)]">
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-portal-accent)]" />
                  Branded client deliverable
                </li>
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-portal-accent)]" />
                  No recurring fees
                </li>
              </ul>
              <div className="mt-5">
                <CheckoutButton productKey={p.key} label={`Buy — ${p.priceLabel}`} />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="mb-1 text-lg font-semibold text-[var(--color-portal-text)]">Premium Client</h2>
        <p className="mb-4 text-sm text-[var(--color-portal-muted)]">
          For families tracking progress between advisory meetings.
        </p>
        <div className="portal-pricing-grid cols-2">
          {clientPlans.map((p) => (
            <PricingCard
              key={p.key}
              product={p}
              period={p.key === "PREMIUM_ANNUAL" ? "Billed annually · save $10 vs. monthly" : "Billed monthly"}
              featured={p.key === "PREMIUM_ANNUAL"}
              features={clientFeatures}
            />
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="mb-1 text-lg font-semibold text-[var(--color-portal-text)]">Advisor Pro</h2>
        <p className="mb-4 text-sm text-[var(--color-portal-muted)]">
          Full client-side access plus advisor workspace and upcoming advisor-only tools.
        </p>
        <div className="portal-pricing-grid cols-2">
          {advisorPlans.map((p) => (
            <PricingCard
              key={p.key}
              product={p}
              period={
                p.key === "ADVISOR_ANNUAL"
                  ? "Billed annually · $100 flat"
                  : "Billed monthly"
              }
              featured={p.key === "ADVISOR_ANNUAL"}
              features={advisorFeatures}
            />
          ))}
        </div>
      </section>

      <section className="portal-card p-6">
        <h2 className="mb-2 text-lg font-semibold">Manage subscription</h2>
        <p className="mb-4 text-sm text-[var(--color-portal-muted)]">
          Update payment method, view invoices, or cancel through the Stripe customer portal.
        </p>
        <button
          type="button"
          onClick={openPortal}
          disabled={portalLoading}
          className="portal-btn-secondary disabled:opacity-60"
        >
          {portalLoading ? "Opening…" : "Open Stripe Customer Portal"}
        </button>
      </section>
    </div>
  );
}
