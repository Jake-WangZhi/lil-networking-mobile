import { NextApiRequest, NextApiResponse } from "next";
import webpush from "web-push";
import prisma from "@/lib/prisma";

webpush.setVapidDetails(
  `mailto:${process.env.VAPID_MAILTO}`,
  process.env.VAPID_PUBLIC_KEY ?? "",
  process.env.VAPID_PRIVATE_KEY ?? ""
);

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  try {
    const subscriptionData: any = await prisma.subscription.findFirst();

    const notificationData = {
      title: "New Action Alert",
      body: "New actions on your dashboard",
    };

    await webpush.sendNotification(
      subscriptionData,
      JSON.stringify(notificationData)
    );

    response
      .status(200)
      .json({ message: "Push notifications sent successfully" });
  } catch (error) {
    response.status(500).json({ error: "Error sending push notifications" });
  }
}
