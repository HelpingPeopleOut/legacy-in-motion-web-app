# Stripe Setup — Legacy in Motion Client Portal

**Prepared for:** HPO.Center (payment integration)  
**Business:** Legacy in Motion — Nelly Lara, Senior Financial Associate  
**Stack:** Stripe Checkout · Customer Portal · Webhooks · Clerk auth · PostgreSQL (Prisma)

---

## Important: hosting architecture

| Surface | Host today | Stripe APIs |
|--------|------------|-------------|
| Marketing site (`/`, `/es`, pillar pages) | Cloudflare Pages (static) | No — lead forms only |
| Client portal (`/dashboard`, `/login`, billing) | Needs **Node.js server** | **Yes** — checkout + webhooks |

Cloudflare static export **removes** `/api/stripe/*` and `/api/webhooks/stripe`. For live payments, deploy the **full Next.js app** (with API routes) to **Vercel** (recommended), Railway, or Fly.io.

Suggested split:

- **Cloudflare Pages** → marketing static export (`npm run build:pages`)
- **Vercel** → `legacy-in-motion-portal` with `DATABASE_URL`, Clerk, Stripe env vars
- Point `www.legacyinmotion.org/dashboard` to Vercel (reverse proxy or subdomain `app.legacyinmotion.org`)

---

## Product catalog (create exactly these in Stripe)

Use **USD**. Prices below are what **Legacy in Motion receives** — the app adds a separate **“Payment processing”** line at checkout so **customers pay Stripe fees** (see [Fee pass-through](#fee-pass-through-customer-pays-stripe-fees)).

| App key | Stripe product name | Type | Amount | Billing |
|---------|---------------------|------|--------|---------|
| `HLV_REPORT` | Family Financial Security Report (HLV PDF) | One-time | **$49.00** | Single charge |
| `LEGACY_VAULT` | Digital Legacy & Vault | One-time | **$99.00** | Single charge |
| `PREMIUM_MONTHLY` | Premium Client (Monthly) | Recurring | **$5.00** | Monthly |
| `PREMIUM_ANNUAL` | Premium Client (Annual) | Recurring | **$50.00** | Yearly |
| `PREMIUM_HYBRID` | Advisor Pro (Monthly) | Recurring | **$15.00** | Monthly |
| `ADVISOR_ANNUAL` | Advisor Pro (Annual) | Recurring | **$100.00** | Yearly |

### What each plan unlocks

**Premium Client ($5/mo or $50/yr)**  
Financial Vital Signs, Emergency Fund Builder, Policy Ladder, Tax-Free Retirement Forecaster

**Advisor Pro ($15/mo or $100/yr)**  
Everything in Premium Client **plus** What-If Scenario Modeler, Secure Document Hub, future advisor tools

**One-time**  
- HLV PDF branded report (`human-life-value` tool — calculator free, PDF paid)  
- Digital Legacy & Vault lifetime access

---

## Step-by-step: Stripe Dashboard

### 1. Create or access the Stripe account

1. Go to [https://dashboard.stripe.com/register](https://dashboard.stripe.com/register) (or log in).
2. Complete **business verification** for Legacy in Motion / Nelly Lara (legal entity, EIN or SSN, bank account for payouts).
3. Start in **Test mode** (toggle top-right) until end-to-end testing passes.

### 2. Create products and prices

For each row in the catalog table:

1. **Product catalog → + Add product**
2. **Name:** use exact Stripe product name from table.
3. **Pricing:**
   - One-time products → **One time** → amount in USD.
   - Subscriptions → **Recurring** → interval **Monthly** or **Yearly** → amount in USD.
4. Save and copy the **Price ID** (`price_xxxxxxxxxxxx`).

> Do **not** inflate prices to cover fees. The app adds a second line item **“Payment processing”** at checkout.

### 3. Map Price IDs to environment variables

On the **portal host** (Vercel, etc.), set:

```env
STRIPE_SECRET_KEY=sk_test_...          # Developers → API keys
STRIPE_WEBHOOK_SECRET=whsec_...        # From webhook step below
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...

STRIPE_PRICE_HLV_REPORT=price_...
STRIPE_PRICE_LEGACY_VAULT=price_...
STRIPE_PRICE_PREMIUM_MONTHLY=price_...
STRIPE_PRICE_PREMIUM_ANNUAL=price_...
STRIPE_PRICE_PREMIUM_HYBRID=price_...
STRIPE_PRICE_ADVISOR_ANNUAL=price_...

# Fee pass-through (defaults shown — customer pays processing)
STRIPE_PASS_FEES_TO_CUSTOMER=true
STRIPE_FEE_PERCENT=0.029
STRIPE_FEE_FIXED_CENTS=30
```

Copy from `.env.example` in the repo. **Never commit** live secret keys.

### 4. Configure Customer Portal

1. **Settings → Billing → Customer portal**
2. Enable: update payment method, view invoices, cancel subscription.
3. **Return URL:** `https://YOUR_PORTAL_URL/dashboard/billing`
4. Save.

### 5. Create webhook endpoint

1. **Developers → Webhooks → + Add endpoint**
2. **URL:** `https://YOUR_PORTAL_URL/api/webhooks/stripe`
3. **Events to listen for:**
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_failed`
4. Copy **Signing secret** → `STRIPE_WEBHOOK_SECRET`

**Local testing:** use Stripe CLI:

```bash
stripe login
stripe listen --forward-to localhost:3000/api/webhooks/stripe
# Use the whsec_... from CLI output as STRIPE_WEBHOOK_SECRET locally
```

### 6. Clerk + database (required for checkout)

Checkout requires signed-in users synced to Postgres.

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Google OAuth login |
| `CLERK_SECRET_KEY` | Server auth |
| `CLERK_WEBHOOK_SECRET` | User sync → `/api/webhooks/clerk` |
| `DATABASE_URL` | PostgreSQL (Neon, Supabase, Vercel Postgres) |

Run migrations on production DB:

```bash
npx prisma migrate deploy
```

### 7. Go live

1. Complete Stripe **activation** checklist.
2. Toggle Stripe to **Live mode**.
3. Recreate products/prices in **live mode** (test `price_` IDs do not work in live).
4. Update all env vars with **live** `sk_live_`, `pk_live_`, and live `price_` IDs.
5. Create a **live** webhook endpoint with the same events.
6. Run one real $5 test subscription and confirm:
   - Checkout shows **two line items** (plan + Payment processing)
   - Webhook fires → user `subscriptionTier` updates in DB
   - Tools unlock in `/dashboard`

---

## Fee pass-through (customer pays Stripe fees)

The app (`src/lib/stripe-fees.ts` + `src/lib/stripe.ts`) calculates a gross-up so Legacy in Motion **nets the listed price** after Stripe’s typical US card rate (**2.9% + $0.30** per charge).

**Example — Premium Client Monthly ($5.00 base):**

| Line item | Amount |
|-----------|--------|
| Premium Client (Monthly) | $5.00 |
| Payment processing | ~$0.46 |
| **Customer pays** | **~$5.46** |
| **You receive (net)** | **~$5.00** |

Annual and one-time purchases use the same formula on their base amounts.

### Checkout display

- Billing page shows **list price** + **“$X.XX at checkout”** total estimate.
- Stripe Checkout shows **two line items** for transparency.

### Disable pass-through (not recommended)

Set `STRIPE_PASS_FEES_TO_CUSTOMER=false` — business absorbs Stripe fees.

### Legal note

Card surcharge rules vary by state and card network. California allows certain surcharges with disclosure requirements. Legacy in Motion should confirm compliance with their attorney; the app labels the fee **“Payment processing”** on the Stripe receipt.

---

## Estimated customer totals (test mode reference)

| Product | List price | ~Total at checkout |
|---------|------------|-------------------|
| HLV Report | $49.00 | ~$50.76 |
| Legacy Vault | $99.00 | ~$102.27 |
| Premium Monthly | $5.00/mo | ~$5.46/mo |
| Premium Annual | $50.00/yr | ~$51.79/yr |
| Advisor Pro Monthly | $15.00/mo | ~$15.75/mo |
| Advisor Pro Annual | $100.00/yr | ~$103.29/yr |

*Exact cents may vary slightly; formula is `ceil((base + 30¢) / (1 - 2.9%)) - base` for the fee line.*

---

## Test cards (Stripe test mode)

| Card | Result |
|------|--------|
| `4242 4242 4242 4242` | Success |
| `4000 0000 0000 9995` | Declined |

Use any future expiry, any CVC, any ZIP.

---

## Troubleshooting

| Symptom | Fix |
|---------|-----|
| “Stripe price not configured” | Missing `STRIPE_PRICE_*` env var for that product |
| Checkout works but access not granted | Webhook not reaching server; check `STRIPE_WEBHOOK_SECRET` and endpoint URL |
| Portal button does nothing | User has no `stripeCustomerId` — complete one checkout first |
| Fees not showing | `STRIPE_PASS_FEES_TO_CUSTOMER=false` or deploying static export without API routes |
| Double subscriptions | User should use **Customer Portal** to cancel old plan before switching |

---

## Files reference (for HPO developers)

| File | Role |
|------|------|
| `src/lib/products.ts` | Canonical prices and Stripe price ID mapping |
| `src/lib/stripe-fees.ts` | Processing fee math |
| `src/lib/stripe.ts` | Checkout session + fee line item |
| `src/app/api/stripe/checkout/route.ts` | POST checkout |
| `src/app/api/stripe/portal/route.ts` | Customer portal |
| `src/app/api/webhooks/stripe/route.ts` | Subscription & purchase sync |
| `src/app/dashboard/billing/BillingContent.tsx` | Pricing UI |
| `prisma/schema.prisma` | `ProductKey`, `SubscriptionTier` enums |

---

## Handoff checklist for HPO

- [ ] Stripe account verified and bank linked  
- [ ] 6 products + prices created (test mode)  
- [ ] All 6 `STRIPE_PRICE_*` vars set on portal host  
- [ ] Webhook endpoint live and `STRIPE_WEBHOOK_SECRET` set  
- [ ] Customer Portal enabled  
- [ ] Clerk Google OAuth + `DATABASE_URL` + Prisma migrate  
- [ ] Portal deployed on Node host (not static-only Cloudflare)  
- [ ] Test checkout: fee line visible, tier unlocks, portal opens  
- [ ] Switch to live keys + live prices + live webhook  
- [ ] Confirm Nelly receives **net list price** on first live payout  

**Questions:** HPO.Center — [https://www.hpo.center](https://www.hpo.center)
