"use client";

import { useState } from "react";
import type { ProductKey } from "@prisma/client";

interface CheckoutButtonProps {
  productKey: ProductKey;
  label: string;
  className?: string;
}

const isLocalTestClient = process.env.NEXT_PUBLIC_LOCAL_TEST_MODE === "true";

export default function CheckoutButton({ productKey, label, className }: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false);

  async function handleCheckout() {
    setLoading(true);
    try {
      const endpoint = isLocalTestClient
        ? "/api/local-test/mock-checkout"
        : "/api/stripe/checkout";

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productKey }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(
          data.error ??
            (isLocalTestClient
              ? "Mock checkout failed."
              : "Checkout unavailable. Stripe prices may not be configured yet.")
        );
      }
    } catch {
      alert("Could not start checkout. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleCheckout}
      disabled={loading}
      className={
        className ??
        "rounded-lg bg-[var(--color-portal-gold)] px-5 py-2.5 text-sm font-semibold text-black transition hover:brightness-110 disabled:opacity-60"
      }
    >
      {loading ? "Redirecting…" : isLocalTestClient ? `${label} (test)` : label}
    </button>
  );
}
