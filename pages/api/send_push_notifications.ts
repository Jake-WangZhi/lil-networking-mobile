import { NextApiRequest, NextApiResponse } from "next";
import webpush from "web-push";
import prisma from "@/lib/prisma";

webpush.setVapidDetails(
  process.env.VAPID_MAILTO ?? "",
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY ?? "",
  process.env.VAPID_PRIVATE_KEY ?? ""
);

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  try {
    const subscriptionData: any[] = await prisma.subscription.findMany();

    const notificationData = {
      title: "Push Notification Title",
      body: "This is a push notification",
    };

    subscriptionData.map((data) =>
      webpush.sendNotification(data, JSON.stringify(notificationData))
    );

    response
      .status(200)
      .json({ message: "Push notifications scheduled successfully" });
  } catch (error) {
    response.status(500).json({ error: "Error scheduling push notifications" });
  }
}
