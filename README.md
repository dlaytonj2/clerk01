# Clerk Option A Starter

This repository implements the "Option A with Clerk" plan using Next.js (App Router) with email/password and Google authentication.

## Features

- Clerk provider wired into the Next.js App Router root layout with a sticky navigation bar
- Hosted sign-in and sign-up routes mounting Clerk components
- Protected dashboard and settings pages enforced via `auth()` and middleware
- Clerk `UserProfile` mounted for account linking (password + Google, MFA management)
- Private API route that syncs an app-level `Profile` record via Prisma on each request
- Svix-verified webhook endpoint to keep local profiles in sync with Clerk changes

## Getting Started

1. Install dependencies and Prisma client artifacts:

   ```bash
   npm install
   npm run prisma:generate
   ```

2. Copy `.env.example` to `.env.local` and populate the values from the Clerk dashboard:

   ```bash
   cp .env.example .env.local
   ```

   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - `CLERK_SECRET_KEY`
   - `CLERK_WEBHOOK_SECRET`
   - `DATABASE_URL` (defaults to SQLite for local development)

3. Configure the same redirect URLs in Clerk that Next.js will serve:

   - `http://localhost:3000/sign-in`
   - `http://localhost:3000/sign-up`

4. Start the dev server:

   ```bash
   npm run dev
   ```

## Database Notes

- Prisma is configured for SQLite (`file:./dev.db`) by default.
- During webhooks or authenticated API calls the app will upsert into the `Profile` table keyed by Clerk user id.
- Swap the datasource in `prisma/schema.prisma` and update `DATABASE_URL` for Postgres/MySQL in production.

## Webhook Setup

1. In the Clerk dashboard create a webhook pointing to `https://<your-domain>/api/webhooks/clerk` (use `http://localhost:3000` in development).
2. Select events `user.created`, `user.updated`, `session.created`, `email_address.updated`.
3. Copy the generated signing secret into `CLERK_WEBHOOK_SECRET` in `.env.local`.
4. Use Clerk's replay tooling to test the webhook; successful calls should update the `Profile` row.

## Security Checklist

- Configure HTTPS (handled automatically on Vercel/Netlify) and ensure the production domain is listed in Clerk Allowed Origins.
- Extend your Content Security Policy to permit `*.clerk.com` in `script-src` and `frame-src`.
- Keep Clerk-provided PII in Clerk; the Prisma `Profile` stores only what the app needs.
- MFA (TOTP) can be toggled in the Clerk dashboard; the settings page surfaces it to users today.

## Testing Suggestions

Run through the flows described in `docs/clerk.md`:

- Email/password sign-up, verification, login, forgotten password
- Google OAuth sign-up and account linking via the settings page
- Private API access (`/api/private/me`) returning profile metadata
- Webhook replay to validate profile synchronization

---

Refer to `docs/clerk.md` for the original implementation blueprint and timeline.
