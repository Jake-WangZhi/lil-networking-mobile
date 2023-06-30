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
    const streakNotificationsCollection =
      await prisma.notificationSettings.findMany({
        where: { streak: true },
        select: {
          subscriptionId: true,
        },
      });

    for (const notifications of streakNotificationsCollection) {
      const subscription = await prisma.subscription.findUnique({
        where: {
          id: notifications.subscriptionId,
        },
      });

      if (!subscription) continue;

      const goals = await prisma.goals.findUnique({
        where: {
          userId: subscription.userId,
        },
        select: {
          messages: true,
          connections: true,
          goalConnections: true,
          goalMessages: true,
        },
      });

      if (!goals) continue;

      const { connections, goalConnections, messages, goalMessages } = goals;

      if (connections < goalConnections || messages < goalMessages) {
        const user = await prisma.user.findUnique({
          where: { id: subscription.userId },
          select: {
            name: true,
          },
        });

        if (!user) continue;

        try {
          const notificationData = {
            title: `Streak Reminder`,
            body: `Hi, ${
              user.name?.split(" ")[0]
            }, make sure to meet your goals by the end of the month to keep your current streak!`,
          };

          const { endpoint, p256dh, auth } = subscription;

          await webpush.sendNotification(
            { endpoint, keys: { p256dh, auth } },
            JSON.stringify(notificationData)
          );
        } catch (error: any) {
          console.error("Error sending streak push notification:", error);
          if (error.statusCode === 410) {
            // Clean out unsubscribed or expired push subscriptions.
            await prisma.notificationSettings.delete({
              where: { subscriptionId: subscription.id },
            });
            await prisma.subscription.delete({
              where: { id: subscription.id },
            });
          }

          continue;
        }
      }
    }

    response
      .status(200)
      .json({ message: "Streak push notifications sent successfully" });
  } catch (error) {
    response
      .status(500)
      .json({ error: "Error sending streak push notifications" });
  }
}
