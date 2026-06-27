"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import CheckoutButton from "@/components/dashboard/CheckoutButton";
import { PRODUCTS } from "@/lib/products";
import { Check } from "lucide-react";

export default function BillingContent() {
  const searchParams = useSearchParams();
  const success = searchParams.get("success");
  const canceled = searchParams.get("canceled");
  const [portalLoading, setPortalLoading] = useState(false);

  async function openPortal() {
    setPortalLoading(true);
    try {
      const res = await fetch("/api/stripe/portal", { method: "POST" });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else alert(data.error ?? "Billing portal unavailable.");
    } finally {
      setPortalLoading(false);
    }
  }

  const oneTime = [PRODUCTS.HLV_REPORT, PRODUCTS.LEGACY_VAULT];
  const subscriptions = [PRODUCTS.PREMIUM_MONTHLY, PRODUCTS.PREMIUM_ANNUAL, PRODUCTS.PREMIUM_HYBRID];

  return (
    <div>
      <div className="portal-hub-hero">
        <p className="portal-hub-eyebrow">Plans & billing</p>
        <h1 className="portal-hub-title">Upgrade your financial toolkit</h1>
        <p className="portal-hub-sub">
          Unlock premium dashboards, branded reports, and advisor-grade tools. Secure payments through Stripe.
        </p>
      </div>

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
        <h2 className="mb-4 text-lg font-semibold text-[var(--color-portal-text)]">One-time purchases</h2>
        <div className="portal-pricing-grid cols-2">
          {oneTime.map((p) => (
            <div key={p.key} className="portal-card portal-pricing-card">
              <h3 className="font-semibold text-[var(--color-portal-text)]">{p.name}</h3>
              <p className="mt-1 text-sm text-[var(--color-portal-muted)]">{p.description}</p>
              <p className="portal-pricing-price">{p.priceLabel}</p>
              <p className="portal-pricing-period">Lifetime access</p>
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
        <h2 className="mb-4 text-lg font-semibold text-[var(--color-portal-text)]">Premium subscriptions</h2>
        <div className="portal-pricing-grid cols-3">
          {subscriptions.map((p) => (
            <div
              key={p.key}
              className={`portal-card portal-pricing-card${p.key === "PREMIUM_ANNUAL" ? " featured" : ""}`}
            >
              {p.key === "PREMIUM_ANNUAL" && (
                <span className="portal-unlock-plan-badge mb-2 inline-block">Best value</span>
              )}
              <h3 className="font-semibold text-[var(--color-portal-text)]">{p.name}</h3>
              <p className="mt-1 text-sm text-[var(--color-portal-muted)]">{p.description}</p>
              <p className="portal-pricing-price">{p.priceLabel}</p>
              <p className="portal-pricing-period">
                {p.key === "PREMIUM_ANNUAL" ? "Billed annually" : p.key === "PREMIUM_HYBRID" ? "Advisor + tools" : "Billed monthly"}
              </p>
              <div className="mt-5">
                <CheckoutButton productKey={p.key} label={`Subscribe — ${p.priceLabel}`} />
              </div>
            </div>
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
