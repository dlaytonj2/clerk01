import { User } from "@clerk/nextjs/server";
import { prisma } from "./prisma";

export async function syncProfileFromClerk(user: User) {
  const primaryEmail = user.emailAddresses.find(address => address.id === user.primaryEmailAddressId);

  return prisma.profile.upsert({
    where: { clerkUserId: user.id },
    update: {
      email: primaryEmail?.emailAddress ?? undefined,
      fullName: user.fullName ?? undefined
    },
    create: {
      clerkUserId: user.id,
      email: primaryEmail?.emailAddress ?? undefined,
      fullName: user.fullName ?? undefined
    }
  });
}
