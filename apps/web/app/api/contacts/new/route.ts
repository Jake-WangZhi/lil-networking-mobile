import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import prisma from "~/lib/prisma";
import { createContactPayloadSchema } from "@foundrymakes/validation";

export async function POST(request: Request) {
  const user = await currentUser();

  if (!user)
    return NextResponse.json({ error: "User Not Found" }, { status: 404 });

  const {
    firstName,
    lastName,
    title,
    company,
    goalDays,
    linkedInUrl,
    email,
    phone,
    links,
    tags,
    location,
  } = createContactPayloadSchema.parse(await request.json());

  const newContact = await prisma.contact.create({
    data: {
      firstName,
      lastName,
      title,
      company,
      email,
      goalDays,
      linkedInUrl,
      location,
      phone,
      links,
      tags,
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
          description: "",
          date: new Date(),
          type: "SYSTEM",
        },
      },
    },
  });

  return NextResponse.json(newContact);
}
