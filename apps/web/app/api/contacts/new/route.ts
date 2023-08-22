import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import prisma from "~/lib/prisma";

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
  const user = await currentUser();

  if (!user)
    return new NextResponse(
      JSON.stringify({ success: false, message: "User Not Found" }),
      { status: 404 }
    );

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
