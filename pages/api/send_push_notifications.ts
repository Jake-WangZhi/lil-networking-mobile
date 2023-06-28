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
    console.log("subscriptionData", subscriptionData);
    const notificationData = {
      title: "Push Notification Title",
      body: "This is a push notification",
    };

    const sendNotifications = async () => {
      for (const data of subscriptionData) {
        const notification = await webpush.sendNotification(
          data,
          JSON.stringify(notificationData)
        );
        console.log("notification", notification);
      }
    };

    await sendNotifications();

    response
      .status(200)
      .json({ message: "Push notifications sent successfully" });
  } catch (error) {
    response.status(500).json({ error: "Error sending push notifications" });
  }
}
