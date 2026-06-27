"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import CheckoutButton from "@/components/dashboard/CheckoutButton";
import { PRODUCTS } from "@/lib/products";

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
      <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-[var(--color-portal-gold)]">
        Plans & billing
      </p>
      <h1 className="mb-2 font-serif text-2xl font-semibold text-[var(--color-portal-text)]">
        Upgrade your toolkit
      </h1>
      <p className="mb-8 max-w-xl text-[var(--color-portal-muted)]">
        Unlock premium dashboards, reports, and advisor tools. Manage payment methods securely through Stripe.
      </p>

      {success && (
        <div className="mb-6 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          {searchParams.get("mock") === "1"
            ? "Mock purchase applied — tier updated (local test only, no charge)."
            : "Payment successful — your access will update momentarily."}
        </div>
      )}
      {canceled && (
        <div className="mb-6 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          Checkout canceled. You can upgrade anytime.
        </div>
      )}

      <section className="mb-10">
        <h2 className="mb-4 text-lg font-medium">One-Time Purchases</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {oneTime.map((p) => (
            <div
              key={p.key}
              className="portal-card p-5"
            >
              <h3 className="font-semibold">{p.name}</h3>
              <p className="mt-1 text-sm text-[var(--color-portal-muted)]">{p.description}</p>
              <div className="mt-4">
                <CheckoutButton productKey={p.key} label={`Buy — ${p.priceLabel}`} />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-lg font-medium">Premium Subscriptions</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {subscriptions.map((p) => (
            <div
              key={p.key}
              className="portal-card p-5"
            >
              <h3 className="font-semibold">{p.name}</h3>
              <p className="mt-1 text-sm text-[var(--color-portal-muted)]">{p.description}</p>
              <div className="mt-4">
                <CheckoutButton productKey={p.key} label={`Subscribe — ${p.priceLabel}`} />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-medium">Manage Existing Subscription</h2>
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
