import { Suspense } from "react";
import BillingContent from "./BillingContent";

export const dynamic = "force-static";

export default function BillingPage() {
  return (
    <Suspense fallback={<div className="text-[var(--color-portal-muted)]">Loading billing…</div>}>
      <BillingContent />
    </Suspense>
  );
}
