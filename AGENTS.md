<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# AGENTS.md

Single Next.js 16 App Router app (`bazar-dor-web`). Bangla (bn-BD) market-price site. Not a monorepo.

## Commands

- Package manager: **npm** (`package-lock.json` only — do not switch to pnpm/yarn)
- `npm run dev` — Next 16 + Turbopack
- `npm run lint` — ESLint 9 flat config (`eslint.config.mjs`)
- `npx tsc --noEmit` — typecheck (no `typecheck` script exists)
- `npm run build` / `npm start`
- No tests, no CI workflows, no formatter config

Verify with: `npm run lint && npx tsc --noEmit`

## Next 16 quirks (this repo uses them)

- **`src/proxy.ts` is the middleware** (Next 16 renamed `middleware` → `proxy`). Named export `proxy` + optional `config.matcher`. Do not create `middleware.ts`.
- Route `params` is a **Promise** — always `const { slug } = await params`.
- Root layout uses generated `LayoutProps<"/">` (from `.next/types`), not a hand-rolled props type.
- Guides live in `node_modules/next/dist/docs/` — read before changing routing/proxy/API patterns.

## Architecture

- Code under `src/`; alias `@/*` → `./src/*` (`tsconfig.json`).
- Routes: `src/app/` (pages, `(auth)` group, `api/auth/[...all]`). Shared UI: `src/components/`. Auth: `src/lib/auth.ts` (server) + `src/lib/auth-client.ts` (client). Types: `src/types/bazardor.ts`.
- **External API** for products/categories: `NEXT_PUBLIC_API_URL` (not in this repo). Fetch with `next: { revalidate }` or `cache: "no-store"` as the page needs. Response may be a bare array or `{ data | products }` — normalize like `CategoriesProducts.tsx`.
- **Auth**: Better Auth + MongoDB (`BETTER_AUTH_DB_URI`, db name hardcoded `bazar-dor`). Handler at `src/app/api/auth/[...all]/route.ts`. Social: GitHub + Google.
- **Route protection** in `src/proxy.ts` matcher: `/dashboard/:path*`, `/profile/:path*`, `/products/:path*` → redirect `/signin` if no session. Some pages also re-check session server-side (e.g. `products/[slug]/page.tsx`). Category pages are public.
- `auth-client.ts` exports hooks from a **second** `createAuthClient()` (no `baseURL`); `authClient` is a separate instance with `baseURL`. Prefer importing from `authClient` when touching auth calls, or keep both in sync deliberately.

## Env (`.env` is gitignored)

Required keys: `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `BETTER_AUTH_DB_URI`, `GITHUB_CLIENT_ID`/`SECRET`, `GOOGLE_CLIENT_ID`/`SECRET`, `NEXT_PUBLIC_API_URL`. Client code only sees `NEXT_PUBLIC_*` + values inlined by Next; server auth uses the rest.

## Styling / UI

- Tailwind **v4** via Turbopack loader rule in `next.config.ts` (no `tailwind.config` / PostCSS file). CSS entry: `src/app/globals.css`.
- **daisyUI** (themes via `@plugin`) + **HeroUI** styles both imported — class names mix `btn btn-success` (daisy) and HeroUI components.
- React Compiler enabled (`reactCompiler: true` in `next.config.ts`).
- User-facing strings, dates, and number formatting are **Bangla** (`bn-BD`, `Asia/Dhaka`). Keep new UI copy in Bangla unless asked otherwise.
- Toasts: `react-toastify` `ToastContainer` is in the root layout; `toast.*` only works in client components (not in server page components).

## Gotchas

- `@better-auth/mongo-adapter` is imported in `src/lib/auth.ts` but **not** listed in `package.json` — it resolves only as a transitive dep of `better-auth`. If install/pruning breaks auth, add it as a direct dependency.
- `next.config.ts` allows **all** https image hosts (`remotePatterns` hostname `**`).
- Do not edit or delete the `nextjs-agent-rules` block above; `next dev` regenerates it.
