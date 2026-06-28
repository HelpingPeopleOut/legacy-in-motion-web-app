/**
 * Pass Stripe card processing costs to the customer at checkout.
 * Default US online card rate: 2.9% + $0.30 per successful charge.
 * Override via STRIPE_FEE_PERCENT (e.g. 0.029) and STRIPE_FEE_FIXED_CENTS (e.g. 30).
 */

const DEFAULT_FEE_RATE = 0.029;
const DEFAULT_FEE_FIXED_CENTS = 30;

export function stripeFeeRate(): number {
  const raw = process.env.STRIPE_FEE_PERCENT;
  if (!raw) return DEFAULT_FEE_RATE;
  const n = Number(raw);
  return Number.isFinite(n) && n >= 0 ? n : DEFAULT_FEE_RATE;
}

export function stripeFeeFixedCents(): number {
  const raw = process.env.STRIPE_FEE_FIXED_CENTS;
  if (!raw) return DEFAULT_FEE_FIXED_CENTS;
  const n = Number(raw);
  return Number.isFinite(n) && n >= 0 ? Math.round(n) : DEFAULT_FEE_FIXED_CENTS;
}

/** When true (default), checkout adds a separate "Payment processing" line item. */
export function passStripeFeesToCustomer(): boolean {
  return process.env.STRIPE_PASS_FEES_TO_CUSTOMER !== "false";
}

/**
 * Gross-up so the business nets `baseCents` after Stripe takes rate% + fixed.
 * customerTotal = ceil((base + fixed) / (1 - rate))
 */
export function calculateCustomerTotalCents(baseCents: number): number {
  if (baseCents <= 0) return 0;
  const rate = stripeFeeRate();
  const fixed = stripeFeeFixedCents();
  if (rate >= 1) return baseCents + fixed;
  return Math.ceil((baseCents + fixed) / (1 - rate));
}

export function calculateProcessingFeeCents(baseCents: number): number {
  if (!passStripeFeesToCustomer() || baseCents <= 0) return 0;
  return calculateCustomerTotalCents(baseCents) - baseCents;
}

export function formatUsdFromCents(cents: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(cents / 100);
}

/** e.g. "$5.46/mo at checkout" */
export function formatCheckoutEstimate(baseCents: number, suffix = ""): string {
  if (!passStripeFeesToCustomer()) {
    return `${formatUsdFromCents(baseCents)}${suffix}`;
  }
  const total = calculateCustomerTotalCents(baseCents);
  return `${formatUsdFromCents(total)}${suffix} at checkout`;
}

export const STRIPE_FEE_DISCLOSURE =
  "A payment processing fee is added at checkout so Legacy in Motion receives the listed plan price. Card processing is handled securely by Stripe.";

export const STRIPE_FEE_DISCLOSURE_SHORT = "+ processing fee at checkout";
