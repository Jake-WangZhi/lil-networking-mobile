import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { differenceInDays } from "date-fns";
import { sendPushNotification } from "@/helper/pushNotificationHelper";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  try {
    const meetGoalNotificationsCollection =
      await prisma.notificationSettings.findMany({
        where: { meetGoal: true },
        select: {
          subscriptionId: true,
        },
      });

    for (const notifications of meetGoalNotificationsCollection) {
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
      });

      if (!goals) continue;

      const contacts = await prisma.contact.findMany({
        where: {
          userId: subscription.userId,
        },
      });

      const contactIds = contacts.map((c) => c.id);

      const user = await prisma.user.findUnique({
        where: { id: subscription.userId },
        select: {
          name: true,
          createdAt: true,
        },
      });

      if (!user) continue;

      const notificationData = {
        title: `Meet Goal Reminder`,
        body: `Hey, ${
          user.name?.split(" ")[0]
        }! You haven't been active in a week. Get back on the app and build those habits!`,
      };

      const activity = await prisma.activity.findFirst({
        where: {
          contactId: { in: contactIds },
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
          createdAt: true,
        },
      });

      // Check if a user activity exists first,
      // if not, then check if a system activity exists,
      // if still not, use the creation date of the user.
      const dayDiff = differenceInDays(
        new Date(),
        activity
          ? activity.date
            ? new Date(activity.date)
            : activity.createdAt
          : user.createdAt
      );

      if (dayDiff !== 0 && dayDiff % 7 === 0) {
        await sendPushNotification(subscription, notificationData);
      }
    }

    response
      .status(200)
      .json({ message: "Meet goal push notifications sent successfully" });
  } catch (error) {
    response
      .status(500)
      .json({ error: "Error sending meet goal push notifications" });
  }
}
