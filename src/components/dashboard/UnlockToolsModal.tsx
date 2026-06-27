"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Check, Sparkles, X } from "lucide-react";
import CheckoutButton from "@/components/dashboard/CheckoutButton";
import { PRODUCTS } from "@/lib/products";
import { hasActivePremium } from "@/lib/access";
import { isPreviewUnlockAll } from "@/lib/preview-access";
import type { Purchase, User } from "@prisma/client";

const SNOOZE_KEY = "lim_unlock_modal_dismissed";
const SNOOZE_MS = 7 * 24 * 60 * 60 * 1000;

type UserWithPurchases = User & { purchases: Purchase[] };

const PREMIUM_FEATURES = [
  "2-minute Financial Vital Signs checkup",
  "Emergency Fund Builder tracker",
  "Policy ladder — expiration & premium alerts",
  "Tax-Free Retirement Forecaster",
  "New premium tools as we add them",
];

function shouldShowModal(): boolean {
  if (typeof window === "undefined" || isPreviewUnlockAll()) return false;
  try {
    const dismissed = localStorage.getItem(SNOOZE_KEY);
    if (!dismissed) return true;
    return Date.now() - new Date(dismissed).getTime() > SNOOZE_MS;
  } catch {
    return true;
  }
}

function snoozeModal() {
  try {
    localStorage.setItem(SNOOZE_KEY, new Date().toISOString());
  } catch {
    /* ignore */
  }
}

export function UnlockToolsOffer({
  signedIn = true,
  compact = false,
}: {
  signedIn?: boolean;
  compact?: boolean;
}) {
  const monthly = PRODUCTS.PREMIUM_MONTHLY;
  const annual = PRODUCTS.PREMIUM_ANNUAL;

  return (
    <div className={compact ? "space-y-4" : "space-y-5"}>
      {!compact && (
        <div className="text-center">
          <p className="portal-hub-eyebrow mb-2 justify-center">
            <Sparkles className="h-3.5 w-3.5" aria-hidden />
            Premium toolkit
          </p>
          <h2 className="font-serif text-xl font-semibold text-[var(--color-portal-text)] md:text-2xl">
            Unlock tools that help get your financials in check
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-[var(--color-portal-muted)]">
            Track debt payoff, emergency savings, policies, and retirement — all in one secure client
            workspace.
          </p>
        </div>
      )}

      <ul className={`grid gap-2 text-sm text-[var(--color-portal-text)] ${compact ? "" : "sm:grid-cols-2"}`}>
        {PREMIUM_FEATURES.map((feature) => (
          <li key={feature} className="flex items-start gap-2">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-portal-accent)]" aria-hidden />
            {feature}
          </li>
        ))}
      </ul>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="portal-unlock-plan">
          <p className="portal-unlock-plan-label">Monthly</p>
          <p className="portal-unlock-plan-price">{monthly.priceLabel}</p>
          <p className="portal-unlock-plan-note">Cancel anytime</p>
          {signedIn ? (
            <CheckoutButton productKey="PREMIUM_MONTHLY" label={`Unlock — ${monthly.priceLabel}`} />
          ) : (
            <Link href="/login/sign-in" className="portal-btn-primary w-full text-center text-sm">
              Sign in to unlock
            </Link>
          )}
        </div>

        <div className="portal-unlock-plan portal-unlock-plan--featured">
          <span className="portal-unlock-plan-badge">Best value</span>
          <p className="portal-unlock-plan-label">Annual</p>
          <p className="portal-unlock-plan-price">{annual.priceLabel}</p>
          <p className="portal-unlock-plan-note">Save $10 vs. monthly</p>
          {signedIn ? (
            <CheckoutButton productKey="PREMIUM_ANNUAL" label={`Unlock — ${annual.priceLabel}`} />
          ) : (
            <Link href="/login/sign-in" className="portal-btn-primary w-full text-center text-sm">
              Sign in to unlock
            </Link>
          )}
        </div>
      </div>

      <p className="text-center text-xs text-[var(--color-portal-muted)]">
        Secure checkout via Stripe · One-time tools (HLV report, Legacy Vault) sold separately on{" "}
        <Link href="/dashboard/billing" className="font-semibold text-[var(--color-portal-gold)] underline">
          Plans & Billing
        </Link>
      </p>
    </div>
  );
}

export default function UnlockToolsModal({ user }: { user: UserWithPurchases | null }) {
  const [open, setOpen] = useState(false);
  const preview = isPreviewUnlockAll();
  const premium = user ? hasActivePremium(user) : false;
  const signedIn = !!user;

  useEffect(() => {
    if (preview || premium) return;
    const timer = window.setTimeout(() => {
      if (shouldShowModal()) setOpen(true);
    }, 800);
    return () => window.clearTimeout(timer);
  }, [preview, premium]);

  const close = useCallback((snooze: boolean) => {
    if (snooze) snoozeModal();
    setOpen(false);
  }, []);

  if (preview || premium || !open) return null;

  return (
    <div className="portal-unlock-overlay" role="dialog" aria-modal="true" aria-labelledby="unlock-tools-title">
      <button
        type="button"
        className="portal-unlock-backdrop"
        aria-label="Close"
        onClick={() => close(true)}
      />
      <div className="portal-unlock-dialog portal-card">
        <button
          type="button"
          className="portal-unlock-close"
          onClick={() => close(true)}
          aria-label="Close unlock offer"
        >
          <X className="h-5 w-5" />
        </button>
        <div id="unlock-tools-title">
          <UnlockToolsOffer signedIn={signedIn} />
        </div>
        <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-center">
          <button type="button" className="portal-btn-ghost text-sm" onClick={() => close(true)}>
            Maybe later
          </button>
          <Link href="/dashboard/billing" className="portal-btn-secondary text-center text-sm" onClick={() => close(false)}>
            Compare all plans
          </Link>
        </div>
      </div>
    </div>
  );
}

export function UnlockToolsBanner({ user }: { user: UserWithPurchases | null }) {
  const [open, setOpen] = useState(false);
  const preview = isPreviewUnlockAll();
  const premium = user ? hasActivePremium(user) : false;

  if (preview || premium) return null;

  return (
    <>
      <div className="portal-unlock-banner mb-6">
        <div className="portal-unlock-banner-text">
          <Sparkles className="h-4 w-4 shrink-0 text-[var(--color-portal-gold)]" aria-hidden />
          <p>
            <strong>Get your financials in check</strong> — unlock premium trackers & dashboards for{" "}
            {PRODUCTS.PREMIUM_MONTHLY.priceLabel} or {PRODUCTS.PREMIUM_ANNUAL.priceLabel}.
          </p>
        </div>
        <button type="button" className="portal-btn-primary shrink-0 text-sm" onClick={() => setOpen(true)}>
          Unlock tools
        </button>
      </div>

      {open && (
        <div className="portal-unlock-overlay" role="dialog" aria-modal="true">
          <button
            type="button"
            className="portal-unlock-backdrop"
            aria-label="Close"
            onClick={() => setOpen(false)}
          />
          <div className="portal-unlock-dialog portal-card">
            <button
              type="button"
              className="portal-unlock-close"
              onClick={() => setOpen(false)}
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
            <UnlockToolsOffer signedIn={!!user} />
          </div>
        </div>
      )}
    </>
  );
}
