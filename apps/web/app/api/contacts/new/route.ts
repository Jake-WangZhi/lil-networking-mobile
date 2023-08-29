import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import prisma from "~/lib/prisma";
import { createContactPayloadSchema } from "@foundrymakes/validation";

export async function POST(request: Request) {
  const user = await currentUser();

  if (!user)
    return NextResponse.json({ error: "User Not Found" }, { status: 404 });

  const data = createContactPayloadSchema.parse(await request.json());

  const newContact = await prisma.contact.create({
    data: {
      ...data,
      User: {
        connectOrCreate: {
          where: {
            id: user.id,
          },
          create: {
            id: user.id,
          },
        },
      },
      activities: {
        create: {
          title: "Contact created",
          date: new Date(),
          type: "SYSTEM",
        },
      },
    },
    select: {
      id: true,
    },
  });

  return NextResponse.json({ contactId: newContact.id });
}
