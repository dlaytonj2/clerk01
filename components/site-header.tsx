"use client";

import Link from "next/link";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton
} from "@clerk/nextjs";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="nav-container">
        <Link href="/" className="brand">
          UberHamster
        </Link>
        <nav className="nav-links">
          <Link href="/">Landing</Link>
          <Link href="/reservation">Reservation</Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="/gallery">Gallery</Link>
          <Link href="/faq">FAQ</Link>
          <SignedIn>
            <Link href="/settings">Account</Link>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal">Sign in</SignInButton>
            <SignUpButton mode="modal">Get started</SignUpButton>
          </SignedOut>
        </nav>
      </div>
    </header>
  );
}
