import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Activity, Contact } from "@prisma/client";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");
  const id = searchParams.get("id");

  if (!email)
    return new NextResponse(
      JSON.stringify({ success: false, message: "Missing Email" }),
      { status: 400, headers: { "content-type": "application/json" } }
    );

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user)
    return new NextResponse(
      JSON.stringify({ success: false, message: "No User Found" }),
      { status: 404, headers: { "content-type": "application/json" } }
    );

  const contacts = await prisma.contact.findMany({
    where: {
      userId: user.id,
      ...(id ? { id } : {}),
    },
    orderBy: {
      name: "asc",
    },
  });

  const contactIds = contacts.map((c) => c.id);

  const activities = await prisma.activity.findMany({
    where: {
      contactId: { in: contactIds },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const parsedContacts = parseContacts(contacts, activities);

  return NextResponse.json(parsedContacts);
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id)
    return new NextResponse(
      JSON.stringify({ success: false, message: "Missing contact id" }),
      { status: 400, headers: { "content-type": "application/json" } }
    );

  const contact = await prisma.contact.delete({
    where: { id },
  });

  return NextResponse.json(contact);
}

export async function PUT(request: Request) {
  const contact = (await request.json()) as Contact;

  if (!contact.id)
    return new NextResponse(
      JSON.stringify({ success: false, message: "Missing contact id" }),
      { status: 400, headers: { "content-type": "application/json" } }
    );

  const {
    id,
    name,
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
    where: { id },
    data: {
      name,
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

const parseContacts = (contacts: Contact[], activities: Activity[]) => {
  const parsedContacts = contacts.map((contact) => {
    return {
      id: contact.id,
      name: contact.name,
      title: contact.title,
      company: contact.company,
      industry: contact.industry,
      goalDays: contact.goalDays,
      email: contact.email,
      phone: contact.phone,
      links: contact.links,
      interests: contact.interests,
      activities: activities
        .filter((activity) => activity.contactId === contact.id)
        .map((activity) => ({
          ...activity,
          date: new Date(activity.date).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          }),
        })),
      isArchived: contact.isArchived,
    };
  });

  return parsedContacts;
};
