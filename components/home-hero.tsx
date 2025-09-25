"use client";

import Link from "next/link";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";

export function HomeHero() {
  return (
    <section className="page">
      <h1>Product-ready auth with Clerk</h1>
      <p>
        Email/password and Google sign-in work out of the box. Use the dashboard to
        inspect the authenticated experience or jump into settings to link accounts and
        manage MFA.
      </p>
      <SignedIn>
        <div className="cta-row">
          <Link href="/dashboard">Go to dashboard</Link>
          <Link href="/settings">Manage account</Link>
        </div>
      </SignedIn>
      <SignedOut>
        <SignInButton mode="modal">Sign in to get started</SignInButton>
      </SignedOut>
    </section>
  );
}
