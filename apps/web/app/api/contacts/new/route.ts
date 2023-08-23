import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import prisma from "~/lib/prisma";
import { z } from "zod";

const contactPayloadSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  title: z.string(),
  company: z.string(),
  goalDays: z.number(),
  email: z.string(),
  phone: z.string(),
  linkedInUrl: z.string(),
  location: z.string(),
  links: z.array(z.string()),
  tags: z.array(z.string()),
});

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
  } = contactPayloadSchema.parse(await request.json());

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
    },
  });

  return NextResponse.json(newContact);
}
