# Stripe Setup — Legacy in Motion Client Portal

**Prepared for:** HPO.Center (payment integration)  
**Business:** Legacy in Motion — Nelly Lara, Senior Financial Associate  
**Stack:** Stripe Checkout · Customer Portal · Webhooks · Clerk auth · PostgreSQL (Prisma) · **Cloudflare Pages Functions**

---

## Hosting architecture

| Surface | Host | Stripe APIs |
|--------|------|-------------|
| Marketing + portal UI | **Cloudflare Pages** (static export → `/out`) | Via **Pages Functions** (`functions/`) |
| Checkout, portal, webhooks | Same domain — `/api/stripe/*`, `/api/webhooks/*` | Yes |

The static build strips Next.js `src/app/api/*`, but Cloudflare **Pages Functions** in `functions/` serve the same routes at runtime. No separate Vercel deploy required.

**Two phases for you (manual in Stripe Dashboard):**

1. **Phase 1 — Test mode:** Create 6 test products → paste test `price_` IDs + `sk_test_` keys into Cloudflare secrets → test with card `4242 4242 4242 4242`
2. **Phase 2 — Live mode:** Recreate the same 6 products in **Live** mode → new live `price_` IDs + `sk_live_` keys → new live webhook

Until Phase 1 is complete, the site stays in **preview mode** (mock checkout, tier simulator).

---

## Product catalog (create exactly these in Stripe)

Use **USD**. Prices below are what **Legacy in Motion receives** — the app adds a separate **“Payment processing”** line at checkout so **customers pay Stripe fees**.

| App key | Stripe product name | Type | Amount | Billing |
|---------|---------------------|------|--------|---------|
| `HLV_REPORT` | Family Financial Security Report (HLV PDF) | One-time | **$49.00** | Single charge |
| `LEGACY_VAULT` | Digital Legacy & Vault | One-time | **$99.00** | Single charge |
| `PREMIUM_MONTHLY` | Premium Client (Monthly) | Recurring | **$5.00** | Monthly |
| `PREMIUM_ANNUAL` | Premium Client (Annual) | Recurring | **$50.00** | Yearly |
| `FAMILY_FORTRESS` | Family Financial Fortress Bundle | Recurring | **$129.00** | Yearly |
| `PREMIUM_HYBRID` | Advisor Pro (Monthly) | Recurring | **$15.00** | Monthly |
| `ADVISOR_ANNUAL` | Advisor Pro (Annual) | Recurring | **$100.00** | Yearly |

> Create products at the **list price** above. Do **not** inflate prices for fees — the app adds the processing line automatically.

---

## Phase 1 — Test mode (your steps)

### 1. Stripe Dashboard (Test mode toggle ON)

1. [dashboard.stripe.com](https://dashboard.stripe.com) → ensure **Test mode** (top-right).
2. For each row in the catalog table: **Product catalog → + Add product** → set name, price, interval.
3. Copy each **Price ID** (`price_xxxxxxxxxxxx`).

### 2. Customer Portal (test)

1. **Settings → Billing → Customer portal**
2. Enable: update payment method, view invoices, cancel subscription.
3. **Return URL:** `https://test-legacy-in-motion-web-app.pages.dev/dashboard/billing` (or your custom domain).

### 3. Webhook (test)

1. **Developers → Webhooks → + Add endpoint**
2. **URL:** `https://test-legacy-in-motion-web-app.pages.dev/api/webhooks/stripe`
3. **Events:**
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_failed`
4. Copy **Signing secret** → `STRIPE_WEBHOOK_SECRET`

### 4. Clerk webhook (if not already set)

1. Clerk Dashboard → Webhooks → add endpoint
2. **URL:** `https://test-legacy-in-motion-web-app.pages.dev/api/webhooks/clerk`
3. Events: `user.created`, `user.updated`, `user.deleted`
4. Copy signing secret → `CLERK_WEBHOOK_SECRET`

### 5. Cloudflare Pages secrets

**Dashboard → Workers & Pages → test-legacy-in-motion-web-app → Settings → Environment variables**

Set for **Production** (staging branch):

**Plaintext (build + runtime):**

| Variable | Value |
|----------|-------|
| `NEXT_PUBLIC_STRIPE_ENABLED` | `true` |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | `pk_test_...` |
| `LOCAL_TEST_MODE` | `false` |
| `NEXT_PUBLIC_LOCAL_TEST_MODE` | `false` |
| `STRIPE_PAGES` | `1` *(optional — enables Stripe mode at build time)* |

**Encrypted secrets:**

```env
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
CLERK_SECRET_KEY=sk_test_...
CLERK_WEBHOOK_SECRET=whsec_...
DATABASE_URL=postgresql://...   # Neon serverless URL recommended

STRIPE_PRICE_HLV_REPORT=price_...
STRIPE_PRICE_LEGACY_VAULT=price_...
STRIPE_PRICE_PREMIUM_MONTHLY=price_...
STRIPE_PRICE_PREMIUM_ANNUAL=price_...
STRIPE_PRICE_FAMILY_FORTRESS=price_...
STRIPE_PRICE_PREMIUM_HYBRID=price_...
STRIPE_PRICE_ADVISOR_ANNUAL=price_...

STRIPE_PASS_FEES_TO_CUSTOMER=true
STRIPE_FEE_PERCENT=0.029
STRIPE_FEE_FIXED_CENTS=30
```

Redeploy the `staging` branch after saving variables.

### 6. Database

```bash
npx prisma migrate deploy
```

### 7. Test checkout

1. Sign in at `/login` (Google via Clerk).
2. Go to `/dashboard/billing`.
3. Subscribe to Premium Monthly ($5).
4. Card: `4242 4242 4242 4242`, any future expiry/CVC.
5. Confirm Checkout shows **two line items** (plan + Payment processing).
6. After redirect, tools should unlock (webhook syncs tier to Postgres).

---

## Phase 2 — Live mode (after test passes)

1. Complete Stripe **business verification** and bank account.
2. Toggle Stripe to **Live mode**.
3. **Recreate all 6 products/prices** in Live — test `price_` IDs do not work in live.
4. In Cloudflare, replace secrets with live values:
   - `sk_live_...`, `pk_live_...`, live `price_...` IDs
   - New **live** webhook at same URL → new `whsec_...`
5. Update `NEXT_PUBLIC_APP_URL` if using production domain (e.g. `https://www.legacyinmotion.org`).
6. Run one real small subscription ($5) and confirm payout nets ~list price.

---

## Fee pass-through (customer pays Stripe fees)

Formula: `ceil((base + 30¢) / (1 - 2.9%)) - base` for the fee line (configurable via env).

| Product | List price | ~Total at checkout |
|---------|------------|-------------------|
| HLV Report | $49.00 | ~$50.76 |
| Legacy Vault | $99.00 | ~$102.27 |
| Premium Monthly | $5.00/mo | ~$5.46/mo |
| Premium Annual | $50.00/yr | ~$51.79/yr |
| Advisor Pro Monthly | $15.00/mo | ~$15.75/mo |
| Advisor Pro Annual | $100.00/yr | ~$103.29/yr |

Set `STRIPE_PASS_FEES_TO_CUSTOMER=false` to absorb fees (not recommended).

---

## Local development

**Full Next.js (recommended for API dev):**

```bash
cp .env.example .env.local
# Fill in Clerk, DATABASE_URL, Stripe test keys
npm run dev
```

**Cloudflare Pages + Functions locally:**

```bash
cp .dev.vars.example .dev.vars
npm run build:pages
npx wrangler pages dev out
```

Stripe CLI for local webhooks:

```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

---

## Troubleshooting

| Symptom | Fix |
|---------|-----|
| “Stripe price not configured” | Missing `STRIPE_PRICE_*` in Cloudflare secrets |
| 401 on checkout | User not signed in; Clerk `CLERK_SECRET_KEY` missing on Functions |
| Checkout works, no unlock | Webhook URL or `STRIPE_WEBHOOK_SECRET` wrong |
| Still shows “(preview)” on buttons | `NEXT_PUBLIC_STRIPE_ENABLED` not `true` or rebuild needed |
| Functions 500 on DB | Use Neon serverless `DATABASE_URL`; run `prisma migrate deploy` |

---

## Files reference

| File | Role |
|------|------|
| `functions/api/stripe/checkout.ts` | CF Pages checkout |
| `functions/api/stripe/portal.ts` | CF Pages billing portal |
| `functions/api/webhooks/stripe.ts` | CF Stripe webhooks |
| `functions/api/webhooks/clerk.ts` | CF Clerk user sync |
| `src/lib/server/stripe-handlers.ts` | Shared Stripe logic |
| `src/lib/products.ts` | UI prices + fee labels |
| `wrangler.toml` | CF Pages config (`nodejs_compat`) |
| `.dev.vars.example` | Local Functions secrets template |

---

## Handoff checklist

**Phase 1 (test) — you:**

- [ ] 6 test products created in Stripe  
- [ ] Test webhook + Clerk webhook pointing to Pages URL  
- [ ] All env vars/secrets set in Cloudflare  
- [ ] `NEXT_PUBLIC_STRIPE_ENABLED=true` + redeploy  
- [ ] Test $5 subscription unlocks tools  

**Phase 2 (live) — you:**

- [ ] Stripe account activated  
- [ ] 6 **live** products recreated  
- [ ] Live keys + live webhook in Cloudflare  
- [ ] One real purchase verified  

**Questions:** HPO.Center — [https://www.hpo.center](https://www.hpo.center)
