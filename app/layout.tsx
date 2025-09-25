import "./globals.css";
import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { SiteHeader } from "../components/site-header";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: {
    default: "UberHamster Overnight Boarding",
    template: "%s | UberHamster"
  },
  description:
    "UberHamster keeps your hamster happy and cared for with luxury overnight boarding, curated playtime, and seamless reservations."
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <SiteHeader />
          <div className="app-shell">
            {children}
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
