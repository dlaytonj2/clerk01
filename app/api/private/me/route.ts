import { currentUser } from "@clerk/nextjs/server";
import { syncProfileFromClerk } from "../../../../lib/profile";

export async function GET() {
  const user = await currentUser();

  if (!user) {
    return new Response(JSON.stringify({ error: "Unauthenticated" }), {
      status: 401,
      headers: { "content-type": "application/json" }
    });
  }

  const profile = await syncProfileFromClerk(user);
  const primaryEmail = user.emailAddresses.find(address => address.id === user.primaryEmailAddressId);

  return Response.json({
    id: user.id,
    email: primaryEmail?.emailAddress,
    fullName: user.fullName,
    hasPassword: user.passwordEnabled,
    hasGoogle: user.externalAccounts.some(account => account.provider === "google"),
    profileId: profile.id
  });
}
