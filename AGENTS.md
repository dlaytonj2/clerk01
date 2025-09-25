# Repository Guidelines

## Project Structure & Module Organization
The application uses Next.js App Router semantics. Core routes live in `app/`, with auth-specific pages under `app/sign-in/[[...sign-in]]` and `app/settings/[[...rest]]`. Shared UI lives in `components/`, and authentication helpers are in `lib/`. Prisma schema files reside in `prisma/`, while operational docs (including `docs/clerk.md`) capture deployment context.

## Build, Test, and Development Commands
Run `npm install` to pull dependencies, including the latest `@clerk/nextjs`. Use `npm run dev` for the local development server, `npm run build` to emit a production bundle, and `npm run start` to serve that bundle. Execute `npm run lint` before every merge to surface TypeScript and ESLint issues. When data models change, regenerate Prisma client types with `npm run prisma:generate`.

## Coding Style & Naming Conventions
TypeScript is mandatory for new code. Prefer explicit component/function names (`DashboardPage`, `syncProfileFromClerk`). Follow the existing two-space indentation and trailing comma style shown in the repo. Let ESLint (configured through `eslint-config-next`) and the default Next.js TypeScript settings be the source of truth; fix warnings instead of suppressing them.

## Testing Guidelines
No automated tests exist yet. Add new suites under `app/` (for route-level tests) or `tests/` (for integration/e2e) and document any new commands in `package.json`. Use descriptive test names that state behavior (e.g., `it("redirects unauthenticated users")`). Always run the relevant test command before submitting a PR.

## Commit & Pull Request Guidelines
Write concise, imperative commit subjects (e.g., `Align Clerk integration with latest quickstart`). Group related changes into a single commit to keep history readable. PRs should include a summary of changes, testing notes, and any follow-up tasks. Where UI changes are involved, attach before/after screenshots or short screen recordings.

## Security & Configuration Tips
Never commit secrets—`.env*` files are ignored by git. Populate `.env.local` with Clerk keys (`NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`, `CLERK_WEBHOOK_SECRET`) and keep per-environment database URLs there. Prisma is preconfigured with SQLite via `DATABASE_URL="file:./dev.db"`; swap the connection string for Postgres/MySQL in production and rerun `npm run prisma:generate` after schema updates. Review `middleware.ts` whenever adding routes to ensure protected areas stay up to date.
