import { NextResponse } from "next/server";
import type { WebhookEvent } from "@clerk/clerk-sdk-node";
import { Webhook, WebhookRequiredHeaders } from "svix";
import { headers } from "next/headers";
import { IncomingHttpHeaders } from "http";
import prisma from "~/lib/prisma";

export async function POST(request: Request) {
  const payload = await request.json();
  const headersList = headers();
  const heads = {
    "svix-id": headersList.get("svix-id"),
    "svix-timestamp": headersList.get("svix-timestamp"),
    "svix-signature": headersList.get("svix-signature"),
  };

  const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET || "");

  let event: WebhookEvent;
  try {
    event = wh.verify(
      JSON.stringify(payload),
      heads as IncomingHttpHeaders & WebhookRequiredHeaders
    ) as WebhookEvent;
  } catch (err) {
    console.log((err as Error).message);
    return NextResponse.json({}, { status: 400 });
  }

  if (event.type === "user.created" || event.type === "user.updated") {
    const {
      id,
      first_name,
      last_name,
      image_url,
      email_addresses,
      primary_email_address_id,
      primary_phone_number_id,
      phone_numbers,
    } = event.data;

    const primaryEmail = email_addresses.find(
      (e) => e.id === primary_email_address_id
    )?.email_address;

    const primaryPhone = phone_numbers.find(
      (e) => e.id === primary_phone_number_id
    )?.phone_number;

    await prisma.user.upsert({
      where: { externalId: id },
      create: {
        externalId: id,
        firstName: first_name,
        lastName: last_name,
        email: primaryEmail,
        phone: primaryPhone,
        image: image_url,
      },
      update: {
        externalId: id,
        firstName: first_name,
        lastName: last_name,
        email: primaryEmail,
        phone: primaryPhone,
        image: image_url,
      },
    });
  }

  if (event.type === "user.deleted") {
    await prisma.user.delete({ where: { externalId: event.data.id } });
  }

  return NextResponse.json({}, { status: 200 });
}
