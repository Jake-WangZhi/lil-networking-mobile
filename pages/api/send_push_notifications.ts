import { NextApiRequest, NextApiResponse } from "next";
import webpush from "web-push";
import prisma from "@/lib/prisma";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  try {
    webpush.setVapidDetails(
      process.env.VAPID_MAILTO ?? "",
      process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY ?? "",
      process.env.VAPID_PRIVATE_KEY ?? ""
    );

    const subscriptionData: any[] = await prisma.subscription.findMany();

    const notificationData = {
      title: "Push Notification Title",
      body: "This is a push notification",
    };

    for await (const data of subscriptionData) {
      webpush.sendNotification(data, JSON.stringify(notificationData));
    }

    response
      .status(200)
      .json({ message: "Push notifications sent successfully" });
  } catch (error) {
    response.status(500).json({ error: "Error sending push notifications" });
  }
}
