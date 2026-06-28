import Link from "next/link";
import CheckoutButton from "./CheckoutButton";
import { UnlockToolsOffer, UnlockAdvisorOffer } from "./UnlockToolsModal";
import type { ProductKey } from "@prisma/client";
import { Lock } from "lucide-react";

interface PaywallProps {
  title: string;
  message: string;
  productKey?: ProductKey;
  priceLabel?: string;
  advisorCta?: string;
  reason?: "auth" | "premium" | "one_time" | "hybrid";
}

export default function Paywall({
  title,
  message,
  productKey,
  priceLabel,
  advisorCta,
  reason,
}: PaywallProps) {
  const isPremium = reason === "premium";
  const isAdvisor = reason === "hybrid";

  return (
    <div className="portal-card portal-paywall-card relative overflow-hidden p-5 sm:p-8 md:p-10">
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[var(--color-portal-gold-light)]/60 to-white/80"
        aria-hidden
      />
      <div className="relative z-10 mx-auto max-w-2xl">
        <div className="mb-4 text-center sm:mb-6">
          <div className="portal-paywall-icon mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-portal-gold-light)] text-[var(--color-portal-gold)] sm:mb-4 sm:h-12 sm:w-12">
            <Lock className="h-4 w-4 sm:h-5 sm:w-5" />
          </div>
          <div className="mb-3 inline-flex rounded-full border border-amber-200 bg-amber-50 px-2.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wider text-amber-800 sm:px-3 sm:py-1 sm:text-xs">
            Unlock full access
          </div>
          <h3 className="mb-2 font-serif text-xl font-semibold text-[var(--color-portal-text)] sm:text-2xl">{title}</h3>
          <p className="text-sm text-[var(--color-portal-muted)] sm:text-base">{message}</p>
        </div>

        {isPremium ? (
          <UnlockToolsOffer signedIn compact />
        ) : isAdvisor ? (
          <UnlockAdvisorOffer signedIn compact />
        ) : (
          <div className="text-center">
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              {productKey && (
                <CheckoutButton
                  productKey={productKey}
                  label={priceLabel ? `Unlock — ${priceLabel}` : "Upgrade now"}
                />
              )}
              {reason === "auth" && (
                <Link href="/login/sign-in" className="portal-btn-primary">
                  Sign in with Google
                </Link>
              )}
              <Link href="/#consultation" className="portal-btn-secondary">
                Book free advisory call
              </Link>
            </div>
          </div>
        )}

        {advisorCta && (
          <p className="mt-6 text-center text-sm italic text-[var(--color-portal-muted)]">{advisorCta}</p>
        )}
      </div>
    </div>
  );
}
