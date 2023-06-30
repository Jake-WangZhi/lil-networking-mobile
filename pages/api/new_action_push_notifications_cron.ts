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
    const newActionNotificationsCollection =
      await prisma.notificationSettings.findMany({
        where: { newAction: true },
      });

    for (const notifications of newActionNotificationsCollection) {
      const subscription = await prisma.subscription.findUnique({
        where: {
          id: notifications.subscriptionId,
        },
      });

      if (!subscription) return;

      const contacts = await prisma.contact.findMany({
        where: {
          userId: subscription.userId,
          isArchived: false,
        },
      });

      for (const contact of contacts) {
        const activity = await prisma.activity.findFirst({
          where: {
            contactId: contact.id,
            type: "USER",
          },
          orderBy: { date: "desc" },
          select: {
            date: true,
          },
        });

        if (activity) {
          const activityDate = new Date(activity.date);

          const dayDiff = differenceInDays(new Date(), activityDate);
          if (dayDiff === 31) {
            const notificationData = {
              title: `New Action Alert`,
              body: `${contact.firstName} has been added to new actions. Reach out today!`,
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
