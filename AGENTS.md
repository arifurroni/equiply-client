<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Completed Work

- Implemented the role-based dashboard routes for Customer, Admin, and Owner users.
- Built and updated the dashboard layout, sidebar, navbar, mobile navbar, profile, and sign-in/sign-out flows.
- Added the Dashboard and DashboardSidebar pages and supporting index types.
- Created the Location page.
- Added a custom 404 not-found page.
- Created and integrated the HeroBanner section.
- Built the Express backend foundation in `equiply-server/` (Phase 2 of the roadmap).
- Added admin-only owner location management: owners are listed from the Better Auth `user` collection, and admins can assign, update, or clear their location.
- Fixed `PATCH /users/:id` returning "User account was not found." on role/location changes: the route now converts the string id to an ObjectId (Better Auth stores `_id` as ObjectId), matching the pattern already used by the bookings/equipments/favorites routes. Verified against the live database.
- Hardened the client against intermittent Vercel "A server error occurred. ERROR <id>" failures:
  - `src/lib/api.ts` now exports `fetchWithTimeout()` — every outbound backend/imgbb fetch has an `AbortSignal.timeout` (8s GET default, 10-15s for mutations/imgbb) and converts timeouts/network failures into catchable `ApiError`s with friendly messages, so a sleeping backend can no longer hang a serverless function until Vercel kills it.
  - All server actions in `payment/`, `admin/all-*`, `customer/favorites`, `customer/my-rentals`, `owner/equipment-rental`, and `lib/action.ts` now use `fetchWithTimeout`.
  - Added `src/app/error.tsx` (root error boundary with Try again / Go home, shows `error.digest` for log matching) and `src/app/global-error.tsx` (root-layout fallback with its own `<html>`/`<body>` and inline styles).
  - `api.ts` fails fast with a clear message when `NEXT_PUBLIC_API_URL` is unset instead of fetching `undefined/...`.

## Completed Work — Backend Foundation (`equiply-server/`)

- Restructured the single root `index.js` into a clean `src/` layout:
  - `src/index.js` — app entry: dotenv, CORS (origin from env), JSON parsing, routes, 404 + error handler, graceful shutdown
  - `src/config/db.js` — MongoDB connection (`connectToMongoDB`, `getDb`, `getCollection`, `closeMongoDB`), fails fast if `MONGODB_URI` is missing
  - `src/utils/response.js` — consistent API responses: `{ success, message, data }` / `{ success, message, errors }`
  - `src/middleware/notFound.js` — 404 handler with the same JSON shape
  - `src/middleware/errorHandler.js` — global error handler (invalid JSON → 400, body too large → 413, otherwise 500 without leaking internals)
  - `src/routes/index.js` — mounts all routers under `/api/v1`
  - `src/routes/equipments/index.js` — `GET /api/v1/equipments` (moved from old root index.js, now uses response helpers)
  - `src/routes/users/index.js` and `src/routes/bookings/index.js` — empty placeholder routers
- `package.json`: added `npm start` and `npm run dev` (node --watch) scripts; `main` → `src/index.js`
- Added `.env.example` (PORT, CLIENT_URL, MONGODB_URI, MONGODB_DB_NAME — no real secrets)
- Added real `.env` (git-ignored) and `.gitignore` (`node_modules/`, `.env`)
- Removed leftover empty root `middleware/` and `routes/` folders
- Tested and verified: health check OK, MongoDB connected, `GET /api/v1/equipments` returns `data: []`, unknown route → 404 JSON, invalid JSON body → 400 JSON, CORS headers present

## Current Project State (after inspection)

- Stack: Next.js 16.4.6 (App Router), React 19, TypeScript, Tailwind CSS 4, shadcn/ui, Better Auth + MongoDB adapter, Recharts, Framer Motion, Lucide.
- Auth is wired: `src/lib/auth.ts` (role field: customer | owner | admin), `src/lib/auth-client.ts`, `src/app/api/auth/[...all]/route.ts`, Signin/Signup forms.
- Navbar, MobileNavbar, Footer, Signout, HeroBanner, dashboard shell (sidebar layout), profile, and a custom 404 are in place.
- Dashboard pages for customer / owner / admin are mostly placeholders; admin owner-location management is implemented.
- Design palette is in use: primary #166534, deep evergreen #102A24, accent #6EE7A5, background #F0FDF4, border #DCE9DF. Typography: Inter.

## Known Gaps

- No Express backend repo yet (API, Stripe, imgbb pending).
- Google social provider is empty in `auth.ts`; the Google button in SigninForm is not wired.
- No route protection: guests and wrong-role users can open `/dashboard/*` (must add middleware + role guard).
- `react-hook-form`, `zod`, and `@hookform/resolvers` are not installed yet.
- No backend API URL env var (`NEXT_PUBLIC_API_URL`).
- Navbar links to `/equipments`, `/how-it-works`, `/about`, `/contact` — pages do not exist (404).
- `src/lib/auth-client.ts` creates the auth client twice (duplicate export to clean up).

## Phase Roadmap

1. Foundation & security: install missing packages, fix auth-client, add middleware + role-based route guards, env cleanup.
2. Backend: Express + MongoDB, consistent API responses, validation, auth verification.
3. Equipment CRUD with imgbb uploads (owner flows).
4. Booking system (customer flows, availability).
5. Stripe payments — paid status only via Stripe webhook, never via frontend redirect.
6. Admin panel (approve owners/equipment, manage users).
7. Dashboards & analytics (Recharts), missing public pages, polish.

## Rules Reminder

- Validate on both frontend and backend; never trust frontend roles or prices.
- Verify auth/authz on the backend; never expose secrets; use env vars for all sensitive config.
- No email verification or forget-password; no fake data for MongoDB-backed features.
- Handle loading / error / empty / success states; use proper HTTP status codes.
- Wait for the next phase prompt before implementing beyond the current phase.
