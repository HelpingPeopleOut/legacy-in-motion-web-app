# Local Test Sandbox

Use this when you want to build and test the **client portal, tools, and paywalls** on your machine only — with **no Clerk, no Stripe, and no database** required, and **nothing that can accidentally deploy**.

---

## Quick start

```bash
npm run local:init    # once — creates gitignored local-test/.env
npm run dev:local     # start safe test server
```

Open **http://localhost:3000/dashboard**

- No Google login needed in test mode
- Amber banner confirms you are in the sandbox
- Use **Local test controls** to switch client tiers (Free → Premium → Hybrid → All unlocked)
- Checkout buttons use **mock billing** — no real charges

---

## What stays private (never pushed to git)

The entire `local-test/` folder is **gitignored**:

| File | Purpose |
|------|---------|
| `local-test/.env` | Your local-only flags (copy from `env/local-test.example`) |
| Anything you add here | Scratch notes, test data, etc. |

Committed template (safe): `env/local-test.example`

---

## Commands

| Command | Use |
|---------|-----|
| `npm run dev:local` | **Use this** for portal/tool work |
| `npm run dev` | Normal dev — needs real Clerk keys for dashboard auth |
| `npm run local:init` | Recreate `local-test/.env` if missing |

---

## Test scenarios (dashboard panel)

| Button | Simulates |
|--------|-----------|
| Free client | Only free tools + paywalls on premium |
| Premium subscriber | Vital Signs, Policy Tracker, Retirement, Emergency Fund |
| One-time purchases only | HLV PDF + Legacy Vault |
| Hybrid / Advisor+ | Premium + What-If + Secure Portal |
| Everything unlocked | All tools for full UI review |

---

## When you are ready for real Stripe / Google (later)

1. Create a **separate** `.env.local` (also gitignored) with production-bound keys
2. Set `LOCAL_TEST_MODE=false` or use `npm run dev` without local-test env
3. Never put real keys in `local-test/.env`

---

## Important

- **`npm run dev:local` is for local use only** — do not set `LOCAL_TEST_MODE=true` on any hosted server
- The marketing site (`/`, `/toolbox`, etc.) works the same in both modes
- Mock checkout sets a cookie on your browser; clear cookies to reset to Free
