import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Activity, Contact } from "@prisma/client";
import { calculateDaysSinceCreatedAt } from "@/lib/utils";
import { Action } from "@/types";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");

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
    },
  });

  const contactIds = contacts.map((c) => c.id);

  const activities = await prisma.activity.findMany({
    where: {
      contactId: { in: contactIds },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const actions = parseActions({ contacts, activities });

  return NextResponse.json({ actions });
}

const parseActions = ({
  activities,
  contacts,
}: {
  activities: Array<Activity>;
  contacts: Array<Contact>;
}) => {
  const pastActions: Array<Action> = [];
  const upcomingActions: Array<Action> = [];

  const contactIndex: Record<string, Contact> = {};
  contacts.map((contact) => {
    contactIndex[contact.id] = contact;
  });

  for (const activity of activities) {
    const contact = contactIndex[activity.contactId];

    if (contact) {
      const days = calculateDaysSinceCreatedAt(activity.createdAt);
      const action = {
        contactName: contact.name,
        contactCategory: contact.category || "",
        note: activity.note,
        days: days,
      };

      if (days > 10) {
        pastActions.push(action);
      } else {
        upcomingActions.push(action);
      }
    }
  }

  return { pastActions, upcomingActions };
};
