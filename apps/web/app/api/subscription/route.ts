import { NextResponse } from "next/server";
import prisma from "~/lib/prisma";
import { SearchParams, SubscriptionArgs } from "~/types";

export async function POST(request: Request) {
  const subscriptionArgs: SubscriptionArgs = await request.json();
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get(SearchParams.UserId);

  if (!userId)
    return new NextResponse(
      JSON.stringify({ success: false, message: "Missing User Id" }),
      { status: 400, headers: { "content-type": "application/json" } }
    );

  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (!user)
    return new NextResponse(
      JSON.stringify({ success: false, message: "No User Found" }),
      { status: 404, headers: { "content-type": "application/json" } }
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
