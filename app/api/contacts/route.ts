import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Activity, Contact } from "@prisma/client";

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
    orderBy: {
      name: "asc",
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

  const parsedContacts = parseContacts(contacts, activities);

  return NextResponse.json({ contacts: parsedContacts });
}

const parseContacts = (contacts: Contact[], activities: Activity[]) => {
  const parsedContacts = contacts.map((contact) => {
    return {
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
      website: contact.website,
      image: contact.image,
      category: contact.category,
      goalDays: contact.goalDays,
      interests: contact.interests,
      activities: activities.filter(
        (activity) => activity.contactId === contact.id
      ),
    };
  });

  return parsedContacts;
};
