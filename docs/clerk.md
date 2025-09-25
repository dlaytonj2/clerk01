Do a clean, production-ready plan for **Option A with Clerk**.
Use **Next.js (App Router)**

# Phase 0 — Decisions & prerequisites (½ day)

* **Auth model:** Single user with multiple sign-in methods (email/password + Google).
* **Session model:** Clerk server sessions via secure cookies (default). No custom JWTs unless you have downstream services.
* **Domains:** Finalize primary domain and staging domain; add both to Clerk **Allowed Origins & Redirects**.
* **Email sender:** Choose Clerk’s built-in email or connect a custom SMTP provider (for branding/deliverability).
* **MFA:** Enable TOTP now (low friction) and plan WebAuthn later.

# Phase 1 — Clerk project setup (½ day)

1. Create a **Clerk application** (Dashboard).
2. Generate **Frontend API** and **Publishable/Secret Keys**; store in your secrets manager.

   * `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   * `CLERK_SECRET_KEY`
3. **OAuth providers → Google**: turn on Google, add your production & staging redirect URLs (Clerk shows them).
4. **Email verification**: require verified email for password logins.
5. **Branding**: upload logo, set colour, configure sign-in/up flows (which factors appear, copy, legal links).
6. **MFA**: toggle **TOTP**; set enforcement to “optional” initially.

# Phase 2 — Integrate with Next.js (1 day)

1. **Install & wrap app**

   ```bash
   npm i @clerk/nextjs
   ```

   In `app/layout.tsx`:

   ```tsx
   import { ClerkProvider } from '@clerk/nextjs';

   export default function RootLayout({ children }) {
     return (
       <ClerkProvider>
         <html lang="en"><body>{children}</body></html>
       </ClerkProvider>
     );
   }
   ```

2. **Public auth pages (no code needed)**
   Create routes that mount Clerk’s hosted components:

   * `/sign-in/[[...sign-in]]` with `<SignIn />`
   * `/sign-up/[[...sign-up]]` with `<SignUp />`
     Example:

   ```tsx
   // app/sign-in/[[...sign-in]]/page.tsx
   import { SignIn } from '@clerk/nextjs';
   export default function Page() { return <SignIn />; }
   ```

3. **Protecting pages & API routes**

   * Pages: `export const dynamic = "force-dynamic"` if needed; gate with `<SignedIn>` / `<SignedOut>`.
   * Server actions & API routes: use `auth()` / `currentUser()` from `@clerk/nextjs/server`.

   ```tsx
   // app/dashboard/page.tsx
   import { auth } from '@clerk/nextjs/server';
   export default async function Dashboard() {
     const { userId } = auth();
     if (!userId) return null; // or redirect('/sign-in')
     return <div>Hi!</div>;
   }
   ```

4. **Navbar user controls**

   ```tsx
   import { UserButton, SignedIn, SignedOut } from '@clerk/nextjs';
   // In your nav:
   <SignedIn><UserButton afterSignOutUrl="/" /></SignedIn>
   <SignedOut><a href="/sign-in">Sign in</a></SignedOut>
   ```

5. **Account linking UX**
   Add a **“Connected accounts”** section by mounting `<UserProfile />`, which includes OAuth connections (Google) out of the box:

   ```tsx
   import { UserProfile } from '@clerk/nextjs';
   export default function Settings() { return <UserProfile />; }
   ```

   This lets a password user add Google later and vice-versa.

# Phase 3 — Email/password + Google specifics (½ day)

* **Sign-up options** (Clerk Dashboard → Sign up):

  * Enable **Email + Password** and **OAuth: Google**.
  * Require **Email verification** for password users.
* **Sign-in options** (Dashboard → Sign in):

  * Enable **Email + Password** and **Continue with Google** button.
* **Magic links (optional)**: turn on; add a “Continue with email link” button to improve conversion.

# Phase 4 — Session, roles, and app data (1 day)

1. **Session handling**
   Default Clerk cookie sessions are fine. If you need backend services to trust the browser, create a **JWT Template** in Clerk and verify it server-side—skip if not necessary.

2. **Roles/permissions**

   * Use **Clerk “public metadata”** or **“permissions/roles”** (if on the right plan) to store `role` (e.g., `user`, `admin`).
   * Example (server-side):

     ```ts
     import { clerkClient } from '@clerk/nextjs/server';
     await clerkClient.users.updateUser(userId, { publicMetadata: { role: 'admin' }});
     ```
   * Gate routes based on role in server components or API handlers.

3. **App database linking**

   * Create a local `profiles` table keyed by `clerk_user_id` for your app-specific data.
   * On first authenticated request, **upsert** a profile row if absent.
   * Store minimal PII; you can read name/email from Clerk on demand.

# Phase 5 — Webhooks & events (½ day)

* Configure **Clerk Webhooks** for `user.created`, `user.updated`, `session.created`, `email_address.updated`.
* Verify signatures (HMAC) and update your `profiles` table or analytics.
* Useful for provisioning, welcome emails, or CRM sync.

# Phase 6 — Security hardening (½ day)

* **Enforce HTTPS**; set `NEXTAUTH_URL`-like base URLs consistently (Clerk uses your domain config).
* **Content Security Policy**: allow Clerk domains (`*.clerk.com`) in `script-src` and `frame-src`.
* **Rate limiting**: Clerk rate-limits auth endpoints; also rate-limit your own public APIs.
* **PII minimization**: avoid duplicating Clerk’s user data in your DB; store only what you must.
* **MFA policy**: keep optional at launch; add **step-up MFA** for sensitive actions later.
* **Data residency/compliance**: review Clerk’s regional options and your PIPEDA notice; add a clear privacy policy.

# Phase 7 — Testing checklist (½ day)

* Email/password:

  * Sign up → receive verification → login → forgot password → reset works.
* Google:

  * New user via Google creates app profile.
  * Existing password user can **link Google** in profile, then sign in with either.
* Session & logout:

  * Session persists across reloads; logout clears session.
* Roles:

  * Non-admin blocked from admin routes; admin allowed.
* Webhooks:

  * Replay request in dev; DB updates as expected.

# Phase 8 — Launch & post-launch (ongoing)

* **Staging → Production**: add prod domain to Clerk, rotate keys as needed.
* **Analytics**: track auth funnel (view → start → success) by method (email vs Google).
* **Support tools**: use Clerk Dashboard to search users, revoke sessions, reset factors.
* **Enhancements** (quick wins):

  * **Passkeys (WebAuthn)** for passwordless high-security sign-in.
  * **Organization** support (if you need teams/tenants).
  * **Custom emails**: brand verification, magic link, and reset templates.

---

## Minimal code snippets (copy-paste)

**Middleware to protect whole sections**

```ts
// middleware.ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtected = createRouteMatcher([
  "/dashboard(.*)",
  "/settings(.*)",
  "/api/private(.*)"
]);

export default clerkMiddleware((auth, req) => {
  if (isProtected(req)) auth().protect(); // redirects to /sign-in
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)","/(api|trpc)(.*)"],
};
```

**Server access to the user**

```ts
// app/api/private/me/route.ts
import { currentUser } from "@clerk/nextjs/server";
export async function GET() {
  const user = await currentUser();
  return Response.json({ id: user?.id, email: user?.emailAddresses[0]?.emailAddress });
}
```

**Client-side gate**

```tsx
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
export default function Hero() {
  return (
    <>
      <SignedIn><a href="/dashboard">Go to dashboard</a></SignedIn>
      <SignedOut><SignInButton mode="modal" /></SignedOut>
    </>
  );
}
```

---

## Timeline (realistic)

* **Day 1:** Clerk config, Next.js wiring, public auth pages, protected routes.
* **Day 2:** Profiles table, account linking UI (UserProfile), MFA optional, webhooks.
* **Day 3:** CSP, rate limits, tests, polish, deploy to prod.

---

If you’re not on Next.js, tell me your stack (Django, Laravel, Spring, etc.) and I’ll swap the integration steps and code for the right SDKs (Clerk has official packages for many).
