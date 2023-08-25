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
    return NextResponse.json({ error: "User Not Found" }, { status: 404 });

  const contacts = await prisma.contact.findMany({
    where: {
      userId: user.id,
      isArchived: false,
    },
  });

  const contactIds = contacts.map((c) => c.id);

  const activities = await prisma.activity.findMany({
    where: {
      contactId: { in: contactIds },
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

  const actions = parseActions(contacts, activities);

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
      const isSystemActivity = activity.type === ActivityType.SYSTEM;

      const action = {
        contactFirstName: contact.firstName,
        contactLastName: contact.lastName,
        contactId: contact.id,
        days,
        goalDays,
        title: contact.title,
        isNewUser: isSystemActivity,
      };

      const pastDueThreshold = isSystemActivity ? 0 : goalDays;
      const upcomingThreshold = pastDueThreshold + DAYS_BEFORE_PAST_DUE;

      if (days > upcomingThreshold) {
        pastActions.push(action);
      } else if (pastDueThreshold <= days && days <= upcomingThreshold) {
        upcomingActions.push(action);
      }
    }
  }

  return { pastActions, upcomingActions };
};
