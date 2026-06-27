import Link from "next/link";
import CheckoutButton from "./CheckoutButton";
import type { ProductKey } from "@prisma/client";
import { Lock } from "lucide-react";

interface PaywallProps {
  title: string;
  message: string;
  productKey?: ProductKey;
  priceLabel?: string;
  advisorCta?: string;
}

export default function Paywall({ title, message, productKey, priceLabel, advisorCta }: PaywallProps) {
  return (
    <div className="portal-card relative overflow-hidden p-8 md:p-10">
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[var(--color-portal-gold-light)]/60 to-white/80"
        aria-hidden
      />
      <div className="relative z-10 mx-auto max-w-lg text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-portal-gold-light)] text-[var(--color-portal-gold)]">
          <Lock className="h-5 w-5" />
        </div>
        <div className="mb-3 inline-flex rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-amber-800">
          Unlock full access
        </div>
        <h3 className="mb-2 font-serif text-2xl font-semibold text-[var(--color-portal-text)]">{title}</h3>
        <p className="mb-6 text-[var(--color-portal-muted)]">{message}</p>
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          {productKey && (
            <CheckoutButton
              productKey={productKey}
              label={priceLabel ? `Unlock — ${priceLabel}` : "Upgrade now"}
            />
          )}
          <Link href="/#consultation" className="portal-btn-secondary">
            Book free advisory call
          </Link>
        </div>
        {advisorCta && (
          <p className="mt-4 text-sm italic text-[var(--color-portal-muted)]">{advisorCta}</p>
        )}
      </div>
    </div>
  );
}
