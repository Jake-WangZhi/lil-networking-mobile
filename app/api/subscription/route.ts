import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { SearchParams, SubscriptionArgs } from "@/types";

export async function POST(request: Request) {
  const subscription: SubscriptionArgs = await request.json();
  const { searchParams } = new URL(request.url);
  const email = searchParams.get(SearchParams.Email);

  if (!email)
    return new NextResponse(
      JSON.stringify({ success: false, message: "Missing Email" }),
      { status: 400, headers: { "content-type": "application/json" } }
    );

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user)
    return new NextResponse(
      JSON.stringify({ success: false, message: "No User Found" }),
      { status: 404, headers: { "content-type": "application/json" } }
    );

  const newSubscription = await prisma.subscription.create({
    data: {
      userId: user.id,
      endpoint: subscription.endpoint,
      p256dh: subscription.keys.p256dh,
      auth: subscription.keys.auth,
    },
  });

  await prisma.notificationSettings.create({
    data: {
      subscriptionId: newSubscription.id,
      newAction: true,
      meetGoal: true,
      streak: true,
    },
  });

  return NextResponse.json(newSubscription);
}
