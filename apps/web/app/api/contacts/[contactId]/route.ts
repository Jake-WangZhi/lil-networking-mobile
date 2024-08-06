import { NextResponse } from "next/server";
import prisma from "~/lib/prisma";
import type { ContactArgs } from "~/types";

export async function GET(
  request: Request,
  { params }: { params: { contactId: string } }
) {
  const contact = await prisma.contact.findUnique({
    where: {
      id: params.contactId,
    },
    include: {
      activities: {
        where: {
          contactId: params.contactId,
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
      },
    },
  });

  return NextResponse.json(contact);
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
