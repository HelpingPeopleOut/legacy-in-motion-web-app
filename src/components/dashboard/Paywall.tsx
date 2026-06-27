import Link from "next/link";
import CheckoutButton from "./CheckoutButton";
import type { ProductKey } from "@prisma/client";

interface PaywallProps {
  title: string;
  message: string;
  productKey?: ProductKey;
  priceLabel?: string;
  advisorCta?: string;
}

export default function Paywall({ title, message, productKey, priceLabel, advisorCta }: PaywallProps) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-[var(--color-portal-border)] bg-[var(--color-portal-card)] p-8">
      <div className="pointer-events-none absolute inset-0 backdrop-blur-sm bg-black/40" aria-hidden />
      <div className="relative z-10 mx-auto max-w-lg text-center">
        <div className="mb-4 inline-flex rounded-full border border-[var(--color-portal-gold)]/30 bg-[var(--color-portal-gold)]/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[var(--color-portal-gold)]">
          Upgrade to unlock
        </div>
        <h3 className="mb-3 text-2xl font-semibold text-white">{title}</h3>
        <p className="mb-6 text-[var(--color-portal-muted)]">{message}</p>
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          {productKey && (
            <CheckoutButton
              productKey={productKey}
              label={priceLabel ? `Unlock — ${priceLabel}` : "Upgrade now"}
            />
          )}
          <Link
            href="/#consultation"
            className="rounded-lg border border-[var(--color-portal-border)] px-5 py-2.5 text-sm font-medium text-white hover:border-[var(--color-portal-gold)]"
          >
            Book advisory call
          </Link>
        </div>
        {advisorCta && (
          <p className="mt-4 text-sm italic text-[var(--color-portal-muted)]">{advisorCta}</p>
        )}
      </div>
    </div>
  );
}
