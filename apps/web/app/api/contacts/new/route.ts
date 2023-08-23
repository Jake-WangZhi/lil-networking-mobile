import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import prisma from "~/lib/prisma";

interface ContactPayload {
  firstName: string;
  lastName: string;
  title: string;
  company: string;
  goalDays: number;
  email: string;
  phone: string;
  linkedIn: string;
  location: string;
  links: string[];
  tags: string[];
}

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
    linkedIn,
    email,
    phone,
    links,
    tags,
    location,
  } = (await request.json()) as ContactPayload;

  const newContact = await prisma.contact.create({
    data: {
      firstName,
      lastName,
      title,
      company,
      email,
      goalDays,
      linkedIn,
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
