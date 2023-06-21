import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Activity, Contact } from "@prisma/client";
import { calculateDaysSinceCreatedAt } from "@/lib/utils";
import { Action, SearchParams } from "@/types";

const DAYS_BEFORE_PAST_DUE = 10;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get(SearchParams.Email);

  if (!email)
    return new NextResponse(
      JSON.stringify({ success: false, message: "Missing Email" }),
      { status: 400, headers: { "content-type": "application/json" } }
    );

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user)
    return new NextResponse(
      JSON.stringify({ success: false, message: "No User Found" }),
      { status: 404, headers: { "content-type": "application/json" } }
    );

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
  const pastActions: Array<Action> = [];
  const upcomingActions: Array<Action> = [];

  const contactIndex: Record<string, Contact> = {};
  contacts.forEach((contact) => {
    contactIndex[contact.id] = contact;
  });

  for (const activity of activities) {
    const contact = contactIndex[activity.contactId];

    if (contact) {
      const days = calculateDaysSinceCreatedAt(new Date(activity.date));
      const goalDays = contact.goalDays;

      const action = {
        contactFirstName: contact.firstName,
        contactLastName: contact.lastName,
        contactIndustry: contact.industry || "",
        contactId: contact.id,
        description: activity.description,
        days,
        goalDays,
      };

      if (days > goalDays + DAYS_BEFORE_PAST_DUE) {
        pastActions.push(action);
      } else if (goalDays <= days && days <= goalDays + DAYS_BEFORE_PAST_DUE) {
        upcomingActions.push(action);
      }
    }
  }

  return { pastActions, upcomingActions };
};
