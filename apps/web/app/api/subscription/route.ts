import { NextResponse } from "next/server";
import prisma from "~/lib/prisma";
import type { SubscriptionArgs } from "~/types";

export async function POST(request: Request) {
  const subscriptionArgs: SubscriptionArgs = await request.json();
  const userId = request.headers.get("User-ID") ?? "";

  const { endpoint, keys } = subscriptionArgs;

  const newSubscription = await prisma.subscription.create({
    data: {
      userId,
      endpoint: endpoint,
      p256dh: keys.p256dh,
      auth: keys.auth,
    },
  });

  return NextResponse.json(newSubscription);
}
