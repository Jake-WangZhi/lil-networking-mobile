import { NextResponse } from "next/server";
import prisma from "~/lib/prisma";
import { Activity, Contact } from "@prisma/client";
import { Action, ActivityType, SearchParams } from "~/types";
import { differenceInDays } from "date-fns";

const DAYS_BEFORE_PAST_DUE = 10;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get(SearchParams.UserId);

  if (!userId)
    return new NextResponse(
      JSON.stringify({ success: false, message: "Missing User Id" }),
      { status: 400, headers: { "content-type": "application/json" } }
    );

  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (!user)
    return new NextResponse(
      JSON.stringify({ success: false, message: "No User Found" }),
      { status: 404, headers: { "content-type": "application/json" } }
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
  const pastActions: Array<Action> = [];
  const upcomingActions: Array<Action> = [];

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
        contactIndustry: contact.industry || "",
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
