import { NextApiRequest, NextApiResponse } from "next";
import prisma from "~/lib/prisma";
import { sendPushNotification } from "~/helper/PushNotificationHelper";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.query.key !== process.env.CRON_KEY) {
    response.status(404).end();
    return;
  }

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
            firstName: true,
          },
        });

        if (!user) continue;

        const notificationData = {
          title: `Streak Reminder`,
          body: `Hi, ${user.firstName}, make sure to meet your goals by the end of the month to keep your current streak!`,
        };

        await sendPushNotification(subscription, notificationData);
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
