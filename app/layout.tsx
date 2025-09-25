import "./globals.css";
import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { SiteHeader } from "../components/site-header";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Clerk Option A",
  description: "Authentication with Clerk using Next.js App Router"
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
