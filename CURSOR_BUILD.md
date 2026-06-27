# Legacy in Motion — Client SaaS Platform (Cursor Build Spec)

> **Business objective:** This app is a revenue engine. Every feature must generate cash flow, convert leads into advisory consultations, or increase client LTV.

## Stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 16 App Router, React, TypeScript |
| Styling | Tailwind CSS v4 (portal) + existing CSS (marketing site) |
| Auth | Clerk with **Google OAuth** |
| Database | PostgreSQL via Prisma |
| Payments | Stripe Checkout + Customer Portal + Webhooks |
| Charts | Recharts (Phase 2) |
| PDF | @react-pdf/renderer (Phase 2) |
| Bank sync | Plaid API (Phase 2) |

## Phase 1 — DONE (scaffold)

- [x] Prisma schema: users, subscriptions, purchases, financial profiles, policies, vault, documents
- [x] Clerk Google login (`/login`, `/sign-up`)
- [x] Protected `/dashboard` client portal with all 12 tools listed
- [x] Access control middleware (free / one-time / premium / hybrid)
- [x] Stripe checkout API + webhook handler + billing page
- [x] Existing calculators wired into dashboard (DIME, TaxFree, Wealth, etc.)

## Phase 2 — TODO

- [ ] Run `npx prisma migrate dev` against production Postgres
- [ ] Configure Clerk webhook → `/api/webhooks/clerk`
- [ ] Configure Stripe webhook → `/api/webhooks/stripe`
- [ ] Create Stripe products/prices and add IDs to `.env.local`
- [ ] PDF report generation (HLV $49)
- [ ] Legacy Vault CRUD + encrypted storage (R2/S3)
- [ ] Financial Vital Signs dashboard + Plaid Link
- [ ] Policy Ladder Tracker with email/SMS alerts
- [ ] What-If Scenario Modeler
- [ ] Secure Document Hub + advisor messaging
- [ ] Paywall blur overlay on locked tool previews

## Tool Catalog & Monetization

| Tool | Access | Price | Revenue type |
|------|--------|-------|--------------|
| Human Life Value Analyzer | Calculate free; PDF paid | $49 | One-time |
| Digital Legacy & Vault | Paid | $99 | One-time |
| Term vs. Permanent Simulator | Free | — | Lead gen / sales cycle |
| Financial Vital Signs | Premium | $15/mo or $150/yr | MRR |
| Policy Ladder Tracker | Premium | included | MRR + renewal commissions |
| Tax-Free Retirement Forecaster | Premium | included | MRR + advisory upsell |
| Emergency Fund Builder | Premium | included | MRR |
| What-If Scenario Modeler | Hybrid | custom | High-ticket advisory |
| Secure Document Hub | Hybrid | custom | Faster underwriting |
| Debt Freedom / Rule of 72 / Cost of Waiting | Free | — | Lead magnets |

## Key Routes

- `/login` — Google sign-in (Clerk)
- `/dashboard` — Tool hub
- `/dashboard/tools/[slug]` — Individual tool with paywall
- `/dashboard/billing` — Upgrades + Stripe portal
- `/api/stripe/checkout` — Create Checkout session
- `/api/stripe/portal` — Customer portal
- `/api/webhooks/stripe` — Subscription & purchase sync
- `/api/webhooks/clerk` — User sync

## Deployment Note

Static export (`output: 'export'`) was **removed** — auth and webhooks require a Node.js server. Deploy to **Vercel** (recommended), Railway, or Cloudflare via OpenNext.

## Cursor Prompt — Phase 2 Kickoff

```
Continue building the Legacy in Motion client SaaS portal.

Phase 1 is scaffolded. Next:
1. Implement Legacy Vault full CRUD with Prisma
2. Add @react-pdf/renderer for HLV Family Financial Security Report ($49 paywall)
3. Build Financial Vital Signs dashboard with manual inputs first, then Plaid
4. Add Policy Ladder Tracker with expiration alerts
5. Blurred paywall preview on locked tools

Follow prisma/schema.prisma, src/lib/access.ts, and src/lib/tools.ts for access rules.
Every tool needs an advisor upsell CTA linking to /#consultation.
```
