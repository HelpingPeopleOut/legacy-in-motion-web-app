import { headers } from "next/headers";
import { Webhook } from "svix";
import type { WebhookEvent } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;
  if (!webhookSecret) {
    return new Response("Clerk webhook not configured", { status: 400 });
  }

  const payload = await req.text();
  const headerPayload = await headers();
  const svix = new Webhook(webhookSecret);

  let event: WebhookEvent;
  try {
    event = svix.verify(payload, {
      "svix-id": headerPayload.get("svix-id")!,
      "svix-timestamp": headerPayload.get("svix-timestamp")!,
      "svix-signature": headerPayload.get("svix-signature")!,
    }) as WebhookEvent;
  } catch {
    return new Response("Invalid signature", { status: 400 });
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

  return new Response("OK", { status: 200 });
}
