import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <main className="page">
      <h1>Dashboard</h1>
      <p>You are signed in. Explore the private API or manage your settings.</p>
      <ul>
        <li>
          <Link href="/api/private/me">View private API response</Link>
        </li>
        <li>
          <Link href="/settings">Manage your account</Link>
        </li>
      </ul>
    </main>
  );
}
