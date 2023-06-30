import { NextApiRequest, NextApiResponse } from "next";
import webpush from "web-push";
import prisma from "@/lib/prisma";
import { differenceInDays } from "date-fns";

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
    const meetGoalNotificationsCollection =
      await prisma.notificationSettings.findMany({
        where: { meetGoal: true },
      });

    for (const notifications of meetGoalNotificationsCollection) {
      const subscription = await prisma.subscription.findUnique({
        where: {
          id: notifications.subscriptionId,
        },
      });

      if (!subscription) continue;

      const contacts = await prisma.contact.findMany({
        where: {
          userId: subscription.userId,
        },
      });

      const contactIds = contacts.map((c) => c.id);

      const activity = await prisma.activity.findFirst({
        where: {
          contactId: { in: contactIds },
          type: "USER",
        },
        orderBy: { date: "desc" },
        select: {
          date: true,
        },
      });

      if (!activity) {
        const user = await prisma.user.findUnique({
          where: { id: subscription.userId },
          select: {
            name: true,
          },
        });

        if (!user) continue;

        const notificationData = {
          title: `Meet Goal Reminder`,
          body: `Hey, ${
            user.name?.split(" ")[0]
          }! You haven't been active in a week. Get back on the app and build those habits!`,
        };

        const { endpoint, p256dh, auth } = subscription;

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
              where: { subscriptionId: subscription.id },
            });
            await prisma.subscription.delete({
              where: { id: subscription.id },
            });
          }

          continue;
        }

        continue;
      }

      const activityDate = new Date(activity.date);
      const dayDiff = differenceInDays(new Date(), activityDate);

      if (dayDiff > 7) {
        const user = await prisma.user.findUnique({
          where: { id: subscription.userId },
          select: {
            name: true,
          },
        });

        if (!user) continue;

        const notificationData = {
          title: `Meet Goal Reminder`,
          body: `Hey, ${
            user.name?.split(" ")[0]
          }! You haven't been active in a week. Get back on the app and build those habits!`,
        };

        const { endpoint, p256dh, auth } = subscription;

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
      .json({ message: "Meet goal push notifications sent successfully" });
  } catch (error) {
    response
      .status(500)
      .json({ error: "Error sending meet goal push notifications" });
  }
}
