import { STRIPE_FEE_DISCLOSURE } from "@/lib/stripe-fees";

export default function StripeFeeNotice({ className = "" }: { className?: string }) {
  return (
    <p className={`text-xs leading-relaxed text-[var(--color-portal-muted)] ${className}`}>
      {STRIPE_FEE_DISCLOSURE}
    </p>
  );
}
