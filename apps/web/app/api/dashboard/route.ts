import { NextResponse } from "next/server";
import prisma from "~/lib/prisma";
import type { Activity, Contact } from "@prisma/client";
import type { Action } from "~/types";
import { ActivityType } from "~/types";
import { differenceInDays } from "date-fns";
import { currentUser } from "@clerk/nextjs";

const DAYS_BEFORE_PAST_DUE = 10;

export async function GET() {
  const user = await currentUser();

  if (!user)
    return new NextResponse(
      JSON.stringify({ success: false, message: "User Not Found" }),
      { status: 404 }
    );

  const contacts = await prisma.contact.findMany({
    where: {
      userId: user.id,
    },
  });

  const activeContacts = contacts.filter((c) => !c.isArchived);

  const activeContactIds = activeContacts.map((c) => c.id);

  const activities = await prisma.activity.findMany({
    where: {
      contactId: { in: activeContactIds },
    },
    orderBy: [
      { type: "asc" },
      {
        date: "desc",
      },
      {
        createdAt: "desc",
      },
    ],
    distinct: ["contactId"],
  });

  const sortedActivities = activities.sort(
    (a, b) => b.date.getTime() - a.date.getTime()
  );

  const actions = parseActions(activeContacts, sortedActivities);

  return NextResponse.json({ ...actions, hasContacts: !!contacts.length });
}

const parseActions = (contacts: Contact[], activities: Activity[]) => {
  const pastActions: Action[] = [];
  const upcomingActions: Action[] = [];

  const contactIndex: Record<string, Contact> = {};
  contacts.forEach((contact) => {
    contactIndex[contact.id] = contact;
  });

  for (const activity of activities) {
    const contact = contactIndex[activity.contactId];

    if (contact) {
      const days = differenceInDays(new Date(), activity.date);
      const goalDays = contact.goalDays;
      const isUserActivity = activity.type === ActivityType.USER;

      const action = {
        contactFirstName: contact.firstName,
        contactLastName: contact.lastName,
        contactId: contact.id,
        description: activity.description,
        days,
        goalDays,
        ...(!isUserActivity && {
          contactCreatedAt: activity.date.toISOString(),
        }),
      };

      const pastDueThreshold = isUserActivity ? goalDays : 0;
      const upcomingThreshold = goalDays + DAYS_BEFORE_PAST_DUE;

      if (days > upcomingThreshold) {
        pastActions.push(action);
      } else if (pastDueThreshold <= days && days <= upcomingThreshold) {
        upcomingActions.push(action);
      }
    }
  }

  return { pastActions, upcomingActions };
};
