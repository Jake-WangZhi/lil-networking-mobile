import { NextResponse } from "next/server";
import prisma from "~/lib/prisma";
import type { Activity, Contact } from "@prisma/client";
import type { ContactArgs } from "~/types";

export async function GET(
  request: Request,
  { params }: { params: { contactId: string } }
) {
  const contact = await prisma.contact.findUnique({
    where: {
      id: params.contactId,
    },
  });

  if (!contact) return NextResponse.json(contact);

  const activities = await prisma.activity.findMany({
    where: {
      contactId: contact?.id,
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
  });

  const parsedContacts = parseContact(contact, activities);

  return NextResponse.json(parsedContacts);
}

export async function DELETE(
  request: Request,
  { params }: { params: { contactId: string } }
) {
  const contact = await prisma.contact.delete({
    where: { id: params.contactId },
  });

  return NextResponse.json(contact);
}

export async function PUT(
  request: Request,
  { params }: { params: { contactId: string } }
) {
  const contactArgs: ContactArgs = await request.json();

  const { isArchived } = contactArgs;

  const updatedContact = await prisma.contact.update({
    where: { id: params.contactId },
    data: {
      isArchived,
    },
  });

  return NextResponse.json(updatedContact);
}

const parseContact = (contact: Contact, activities: Activity[]) => {
  const {
    id,
    firstName,
    lastName,
    title,
    company,
    goalDays,
    email,
    phone,
    links,
    tags,
    isArchived,
    linkedInUrl,
  } = contact;

  return {
    id,
    firstName,
    lastName,
    title,
    company,
    goalDays,
    email,
    phone,
    links,
    tags,
    linkedInUrl,
    activities: activities.filter(
      (activity) => activity.contactId === contact.id
    ),
    isArchived,
  };
};
