"use client";

import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="nav-container">
        <Link href="/" className="brand">
          Clerk Option A
        </Link>
        <nav className="nav-links">
          <Link href="/">Home</Link>
          <SignedIn>
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/settings">Settings</Link>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal">Sign in</SignInButton>
          </SignedOut>
        </nav>
      </div>
    </header>
  );
}
