import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import prisma from "~/lib/prisma";
import { CreateContactPayloadSchema } from "@foundrymakes/validation";

export async function POST(request: Request) {
  const user = await currentUser();

  if (!user)
    return NextResponse.json({ error: "User Not Found" }, { status: 404 });

  const data = CreateContactPayloadSchema.parse(await request.json());

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
  });

  return NextResponse.json(newContact);
}
