import { isLocalTestMode } from "./app-env";
import { buildLocalTestUser } from "./local-test";
import { prisma } from "./db";

export async function ensureDbUser() {
  if (isLocalTestMode()) {
    return buildLocalTestUser();
  }

  const { currentUser } = await import("@clerk/nextjs/server");
  const clerkUser = await currentUser();
  if (!clerkUser) return null;

  const email =
    clerkUser.emailAddresses.find((e) => e.id === clerkUser.primaryEmailAddressId)
      ?.emailAddress ?? clerkUser.emailAddresses[0]?.emailAddress;

  if (!email) return null;

  const user = await prisma.user.upsert({
    where: { clerkId: clerkUser.id },
    create: {
      clerkId: clerkUser.id,
      email,
      name: [clerkUser.firstName, clerkUser.lastName].filter(Boolean).join(" ") || null,
      imageUrl: clerkUser.imageUrl,
    },
    update: {
      email,
      name: [clerkUser.firstName, clerkUser.lastName].filter(Boolean).join(" ") || null,
      imageUrl: clerkUser.imageUrl,
    },
    include: { purchases: true },
  });

  return user;
}

export async function getDbUserWithPurchases() {
  return ensureDbUser();
}
