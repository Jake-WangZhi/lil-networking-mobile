import { NextResponse } from "next/server";
import prisma from "~/lib/prisma";
import type { Activity, Contact, Prisma } from "@prisma/client";
import { SearchParams } from "~/types";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get(SearchParams.Name);
  const userId = request.headers.get("User-ID") ?? "";

  const contacts = await getContacts(name, userId);

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
      goalDays: contact.goalDays,
      email: contact.email,
      phone: contact.phone,
      links: contact.links,
      tags: contact.tags,
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

interface ContactPayload {
  firstName: string;
  lastName: string;
  title: string;
  company: string;
  reminder: number;
  email: string;
  phone: string;
  linkedIn: string;
  location: string;
  links: string[];
  tags: string[];
}

export async function POST(request: Request) {
  const userId = request.headers.get("User-ID") ?? "";
  const body: ContactPayload = await request.json();
  console.log("body", body);
  const newContact = await prisma.contact.create({
    data: {
      firstName: body.firstName,
      lastName: body.lastName,
      title: body.title,
      company: body.company,
      email: body.email,
      goalDays: body.reminder,
      linkedIn: body.linkedIn,
      location: body.location,
      phone: body.phone,
      links: body.links,
      tags: body.tags,
      User: {
        connectOrCreate: {
          where: {
            id: userId,
          },
          create: {
            id: userId,
          },
        },
      },
    },
  });

  return NextResponse.json(newContact);
}
