import { createClerkClient } from "@clerk/backend";
import type { PrismaClient } from "@prisma/client";
import { Webhook } from "svix";
import type { ServerEnv } from "./env";

export async function requireClerkUserId(request: Request, env: ServerEnv): Promise<string | null> {
  if (!env.CLERK_SECRET_KEY || !env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) return null;

  try {
    const clerk = createClerkClient({
      secretKey: env.CLERK_SECRET_KEY,
      publishableKey: env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    });
    const state = await clerk.authenticateRequest(request, {
      secretKey: env.CLERK_SECRET_KEY,
      publishableKey: env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    });
    if (!state.isSignedIn) return null;
    return state.toAuth().userId;
  } catch (error) {
    console.error("[clerk] authenticateRequest failed", error);
    return null;
  }
}

export async function ensureDbUserFromClerk(
  prisma: PrismaClient,
  env: ServerEnv,
  clerkUserId: string
) {
  if (!env.CLERK_SECRET_KEY) return null;
  const clerk = createClerkClient({ secretKey: env.CLERK_SECRET_KEY });
  const clerkUser = await clerk.users.getUser(clerkUserId);
  const email =
    clerkUser.emailAddresses.find((e) => e.id === clerkUser.primaryEmailAddressId)?.emailAddress ??
    clerkUser.emailAddresses[0]?.emailAddress;
  if (!email) return null;

  return prisma.user.upsert({
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
}

type ClerkWebhookEvent = {
  type: string;
  data: {
    id: string;
    email_addresses?: { email_address: string }[];
    first_name?: string | null;
    last_name?: string | null;
    image_url?: string;
  };
};

export async function handleClerkWebhook(
  prisma: PrismaClient,
  env: ServerEnv,
  payload: string,
  headers: Headers
): Promise<{ status: number; body: string }> {
  if (!env.CLERK_WEBHOOK_SECRET) {
    return { status: 400, body: "Clerk webhook not configured" };
  }

  const svix = new Webhook(env.CLERK_WEBHOOK_SECRET);
  let event: ClerkWebhookEvent;
  try {
    event = svix.verify(payload, {
      "svix-id": headers.get("svix-id")!,
      "svix-timestamp": headers.get("svix-timestamp")!,
      "svix-signature": headers.get("svix-signature")!,
    }) as ClerkWebhookEvent;
  } catch {
    return { status: 400, body: "Invalid signature" };
  }

  if (event.type === "user.created" || event.type === "user.updated") {
    const { id, email_addresses, first_name, last_name, image_url } = event.data;
    const email = email_addresses?.[0]?.email_address;
    if (email) {
      await prisma.user.upsert({
        where: { clerkId: id },
        create: {
          clerkId: id,
          email,
          name: [first_name, last_name].filter(Boolean).join(" ") || null,
          imageUrl: image_url,
        },
        update: {
          email,
          name: [first_name, last_name].filter(Boolean).join(" ") || null,
          imageUrl: image_url,
        },
      });
    }
  }

  if (event.type === "user.deleted") {
    await prisma.user.deleteMany({ where: { clerkId: event.data.id } });
  }

  return { status: 200, body: "OK" };
}
