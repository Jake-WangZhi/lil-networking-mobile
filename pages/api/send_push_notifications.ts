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
    const subscriptionData = await prisma.subscription.findMany();

    const notificationData = {
      title: "Push Notification Title",
      body: "This is a push notification",
    };

    for (const { endpoint, p256dh, auth, id } of subscriptionData) {
      try {
        await webpush.sendNotification(
          { endpoint, keys: { p256dh, auth } },
          JSON.stringify(notificationData)
        );
      } catch (error: any) {
        console.error("Error sending push notification:", error);
        if (error.statusCode === 410) {
          // Clean out unsubscribed or expired push subscriptions.
          await prisma.notificationSettings.delete({
            where: { subscriptionId: id },
          });
          await prisma.subscription.delete({ where: { id } });
        }

        continue;
      }
    }

    response
      .status(200)
      .json({ message: "Push notifications sent successfully" });
  } catch (error) {
    response.status(500).json({ error: "Error sending push notifications" });
  }
}
