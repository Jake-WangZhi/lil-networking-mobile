import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import prisma from "~/lib/prisma";
import type { SubscriptionArgs } from "~/types";

export async function POST(request: Request) {
  const subscriptionArgs: SubscriptionArgs = await request.json();
  const user = await currentUser();

  if (!user)
    return new NextResponse(
      JSON.stringify({ success: false, message: "User Not Found" }),
      { status: 404 }
    );

  const { endpoint, keys } = subscriptionArgs;

  const newSubscription = await prisma.subscription.create({
    data: {
      userId: user.id,
      endpoint: endpoint,
      p256dh: keys.p256dh,
      auth: keys.auth,
    },
  });

  return NextResponse.json(newSubscription);
}
