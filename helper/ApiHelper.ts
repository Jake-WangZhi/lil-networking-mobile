import prisma from "@/lib/prisma";

// Try to get the latest USER activities for each contact first,
// Then get the SYSTEM activities for the contacts who don't have any USER activities
export const getLatestActivitiesForContacts = async (contactIds: string[]) => {
  const activities = await prisma.activity.findMany({
    where: {
      contactId: { in: contactIds },
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
    distinct: ["contactId"],
  });

  const contactIdsWithActivity = new Set(
    activities.map((activity) => activity.contactId)
  );

  for (const contactId of contactIds) {
    const hasActivity = contactIdsWithActivity.has(contactId);

    if (!hasActivity) {
      const activity = await prisma.activity.findFirst({
        where: {
          contactId: contactId,
          type: "SYSTEM",
        },
        orderBy: {
          createdAt: "asc",
        },
      });

      if (activity) {
        activities.push(activity);
      }
    }
  }

  return activities;
};
