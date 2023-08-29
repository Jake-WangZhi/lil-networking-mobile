import { NextResponse } from "next/server";
import prisma from "~/lib/prisma";
import type { Activity, Contact } from "@prisma/client";
import { ActivityType, SearchParams } from "~/types";
import { differenceInDays } from "date-fns";
import { currentUser } from "@clerk/nextjs";
import { actionTypeSchema } from "@foundrymakes/validation";
import type { Action } from "@foundrymakes/validation";
import { ActionType } from "@foundrymakes/validation";

const DAYS_BEFORE_PAST_DUE = 10;

export async function GET(request: Request) {
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

  const { searchParams } = new URL(request.url);
  const type = searchParams.get(SearchParams.Type);
  const parsedType = actionTypeSchema.parse(type);

  const actions = parseActions(contacts, activities, parsedType);

  return NextResponse.json(actions);
}

const parseActions = (
  contacts: Contact[],
  activities: Activity[],
  type: ActionType
) => {
  const actions: Action[] = [];

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

      const pastDueThreshold = isSystemActivity ? 0 : goalDays;
      const upcomingThreshold = pastDueThreshold + DAYS_BEFORE_PAST_DUE;

      if (
        (type === ActionType.PAST && days > upcomingThreshold) ||
        (type === ActionType.UPCOMING &&
          pastDueThreshold <= days &&
          days <= upcomingThreshold)
      ) {
        actions.push({
          contactFirstName: contact.firstName,
          contactLastName: contact.lastName,
          contactId: contact.id,
          days,
          goalDays,
          title: contact.title,
          isNewUser: isSystemActivity,
        });
      }
    }
  }

  return actions;
};
