import { Activity } from "@/types";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(
  request: Request,
  { params }: { params: { contactId: string } }
) {
  const activity: Activity = await request.json();

  const { title, date, description, type } = activity;

  const newActivity = await prisma.activity.create({
    data: {
      contactId: params.contactId,
      title,
      date,
      description,
      type,
    },
  });

  const contact = await prisma.contact.findUnique({
    where: { id: params.contactId },
  });

  await prisma.goals.update({
    where: {
      userId: contact?.userId,
    },
    data: {
      messages: {
        increment: 1,
      },
    },
  });

  return NextResponse.json(newActivity);
}
