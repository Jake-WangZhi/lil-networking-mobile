import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { differenceInDays } from "date-fns";
import { sendPushNotification } from "@/helper/PushNotificationHelper";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  try {
    const newActionNotificationsCollection =
      await prisma.notificationSettings.findMany({
        where: { newAction: true },
        select: {
          subscriptionId: true,
        },
      });

    for (const notifications of newActionNotificationsCollection) {
      const subscription = await prisma.subscription.findUnique({
        where: {
          id: notifications.subscriptionId,
        },
      });

      if (!subscription) continue;

      const contacts = await prisma.contact.findMany({
        where: {
          userId: subscription.userId,
          isArchived: false,
        },
        select: {
          id: true,
          firstName: true,
          goalDays: true,
        },
      });

      for (const contact of contacts) {
        const { id, firstName, goalDays } = contact;

        const activity = await prisma.activity.findFirst({
          where: {
            contactId: id,
            type: "USER",
          },
          orderBy: [
            {
              date: "desc",
            },
            {
              createdAt: "desc",
            },
          ],
          select: {
            date: true,
          },
        });

        if (activity) {
          const activityDate = new Date(activity.date);
          const dayDiff = differenceInDays(new Date(), activityDate);

          if (dayDiff === goalDays) {
            const notificationData = {
              title: `New Action Alert`,
              body: `${firstName} has been added to new actions. Reach out today!`,
            };

            await sendPushNotification(subscription, notificationData);
          }
        }
      }
    }

    response
      .status(200)
      .json({ message: "New action push notifications sent successfully" });
  } catch (error) {
    response
      .status(500)
      .json({ error: "Error sending new action push notifications" });
  }
}
