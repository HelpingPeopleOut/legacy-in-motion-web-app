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
      <h1 className="mb-2 text-2xl font-semibold">Billing & Upgrades</h1>
      <p className="mb-8 max-w-xl text-[var(--color-portal-muted)]">
        Manage subscriptions, one-time tool unlocks, and payment methods via Stripe.
      </p>

      {success && (
        <div className="mb-6 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-400">
          {searchParams.get("mock") === "1"
            ? "Mock purchase applied — tier updated (local test only, no charge)."
            : "Payment successful — your access will update momentarily."}
        </div>
      )}
      {canceled && (
        <div className="mb-6 rounded-lg border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-400">
          Checkout canceled. You can upgrade anytime.
        </div>
      )}

      <section className="mb-10">
        <h2 className="mb-4 text-lg font-medium">One-Time Purchases</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {oneTime.map((p) => (
            <div
              key={p.key}
              className="rounded-xl border border-[var(--color-portal-border)] bg-[var(--color-portal-card)] p-5"
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
              className="rounded-xl border border-[var(--color-portal-border)] bg-[var(--color-portal-card)] p-5"
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
          className="rounded-lg border border-[var(--color-portal-border)] px-5 py-2.5 text-sm hover:border-[var(--color-portal-gold)] disabled:opacity-60"
        >
          {portalLoading ? "Opening…" : "Open Stripe Customer Portal"}
        </button>
      </section>
    </div>
  );
}
