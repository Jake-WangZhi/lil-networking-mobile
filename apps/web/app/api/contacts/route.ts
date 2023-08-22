import { NextResponse } from "next/server";
import prisma from "~/lib/prisma";
import type { Activity, Contact, Prisma } from "@prisma/client";
import { SearchParams } from "~/types";
import { currentUser } from "@clerk/nextjs";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get(SearchParams.Name);
  const user = await currentUser();

  if (!user)
    return new NextResponse(
      JSON.stringify({ success: false, message: "User Not Found" }),
      { status: 404 }
    );

  const contacts = await getContacts(name, user.id);

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

  const parsedContacts = parseContacts(contacts, activities);

  return NextResponse.json(parsedContacts);
}

const parseContacts = (contacts: Contact[], activities: Activity[]) => {
  const parsedContacts = contacts.map((contact) => {
    return {
      id: contact.id,
      firstName: contact.firstName,
      lastName: contact.lastName,
      title: contact.title,
      company: contact.company,
      industry: contact.industry,
      goalDays: contact.goalDays,
      email: contact.email,
      phone: contact.phone,
      links: contact.links,
      interests: contact.interests,
      activities: activities.filter(
        (activity) => activity.contactId === contact.id
      ),
      isArchived: contact.isArchived,
    };
  });

  return parsedContacts;
};

const getContacts = async (name: string | null, userId: string) => {
  let whereClause: Prisma.ContactWhereInput = {
    userId,
  };

  if (name) {
    const [firstName, lastName] = name.split(" ");

    if (lastName) {
      whereClause = {
        ...whereClause,
        firstName: { contains: firstName, mode: "insensitive" },
        lastName: { contains: lastName, mode: "insensitive" },
      };
    } else {
      whereClause = {
        ...whereClause,
        OR: [
          { firstName: { contains: firstName, mode: "insensitive" } },
          { lastName: { contains: firstName, mode: "insensitive" } },
        ],
      };
    }
  }

  const contacts = await prisma.contact.findMany({
    where: whereClause,
    orderBy: [
      {
        firstName: "asc",
      },
      {
        lastName: "asc",
      },
    ],
  });

  return contacts;
};
