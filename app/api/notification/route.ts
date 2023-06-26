import { NextResponse } from "next/server";
import webpush from "web-push";

webpush.setVapidDetails(
  `mailto:${process.env.VAPID_MAILTO}`,
  process.env.VAPID_PUBLIC_KEY ?? "",
  process.env.VAPID_PRIVATE_KEY ?? ""
);

let subscriptionData: any = null;

export async function GET(request: Request) {
  console.log("haha", subscriptionData);

  const notificationData = {
    title: "subscriptionData",
    body: "haha",
  };

  await webpush.sendNotification(
    subscriptionData,
    JSON.stringify(notificationData)
  );

  return new NextResponse("", {
    status: 200,
  });
}

export async function POST(request: Request) {
  const req = await request.json();
  console.log(req);

  subscriptionData = req;

  return NextResponse.json("haha");
}
