import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Activity, Contact } from "@prisma/client";
import { formatDate } from "@/lib/utils";

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
  const contact: Contact = await request.json();

  const {
    firstName,
    lastName,
    title,
    company,
    industry,
    goalDays,
    email,
    phone,
    links,
    interests,
    isArchived,
  } = contact;

  const updatedContact = await prisma.contact.update({
    where: { id: params.contactId },
    data: {
      firstName,
      lastName,
      title,
      company,
      industry,
      goalDays,
      email,
      phone,
      links,
      interests,
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
    industry,
    goalDays,
    email,
    phone,
    links,
    interests,
    isArchived,
  } = contact;

  return {
    id,
    firstName,
    lastName,
    title,
    company,
    industry,
    goalDays,
    email,
    phone,
    links,
    interests,
    activities: activities
      .filter((activity) => activity.contactId === contact.id)
      .map((activity) => ({
        ...activity,
        date: formatDate(activity.date),
      })),
    isArchived,
  };
};