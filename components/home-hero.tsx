"use client";

import Link from "next/link";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";

export function HomeHero() {
  return (
    <section className="page hero">
      <div className="hero-text">
        <p className="hero-kicker">Overnight Hamster Boarding</p>
        <h1>White-glove care for the tiniest VIPs.</h1>
        <p>
          UberHamster keeps your furry friend cozy, entertained, and supervised through the
          night. We pair climate-controlled suites with curated enrichment so you can travel
          with total peace of mind.
        </p>
        <div className="cta-row">
          <Link href="/reservation">Reserve a suite</Link>
          <Link href="/pricing" className="secondary-cta">
            View pricing
          </Link>
        </div>
        <SignedOut>
          <div className="auth-helper">
            <SignInButton mode="modal">Sign in to manage reservations</SignInButton>
          </div>
        </SignedOut>
      </div>
      <div className="hero-card">
        <p className="hero-card-title">Tonight&apos;s highlights</p>
        <ul>
          <li>Fresh veggie bar refilled hourly</li>
          <li>Night vision monitoring &amp; wellness checks</li>
          <li>Quiet wheel lounge with noise-dampening tech</li>
        </ul>
        <SignedIn>
          <p className="hero-card-footer">
            You&apos;re signed in; head to the reservation page to pick a date.
          </p>
        </SignedIn>
        <SignedOut>
          <p className="hero-card-footer">
            Guests create an account to book stays and receive care updates.
          </p>
        </SignedOut>
      </div>
    </section>
  );
}
