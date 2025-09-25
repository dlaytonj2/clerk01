import { headers } from "next/headers";
import { Webhook } from "svix";
import type { WebhookEvent } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/nextjs/server";
import { syncProfileFromClerk } from "../../../../lib/profile";

type SvixHeaders = {
  "svix-id": string;
  "svix-timestamp": string;
  "svix-signature": string;
};

export async function POST(req: Request) {
  const payload = await req.text();
  const headerList = headers();
  const headerPayload: SvixHeaders = {
    "svix-id": headerList.get("svix-id") ?? "",
    "svix-timestamp": headerList.get("svix-timestamp") ?? "",
    "svix-signature": headerList.get("svix-signature") ?? ""
  };

  if (!headerPayload["svix-id"] || !headerPayload["svix-timestamp"] || !headerPayload["svix-signature"]) {
    return new Response("Missing Svix headers", { status: 400 });
  }

  const secret = process.env.CLERK_WEBHOOK_SECRET;

  if (!secret) {
    return new Response("Missing Clerk webhook secret", { status: 500 });
  }

  let event: WebhookEvent;

  try {
    event = new Webhook(secret).verify(payload, headerPayload) as WebhookEvent;
  } catch (error) {
    console.error("Webhook signature verification failed", error);
    return new Response("Invalid signature", { status: 400 });
  }

  switch (event.type) {
    case "user.created":
    case "user.updated": {
      const user = await clerkClient.users.getUser(event.data.id);
      await syncProfileFromClerk(user);
      break;
    }
    case "session.created":
    case "email_address.updated":
    default:
      break;
  }

  return new Response("ok", { status: 200 });
}
