import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV === "development") global.prisma = prisma;

export function getUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email },
  });
}

export async function upsertContact({
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
  userId,
}: {
  id: string;
  firstName: string;
  lastName: string;
  title: string;
  company: string;
  industry: string;
  goalDays: number;
  email: string;
  phone: string;
  links: string[];
  interests: string[];
  userId: string;
}) {
  const contact = await prisma.contact.upsert({
    where: { id },
    create: {
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
      userId,
    },
    update: {
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
    },
  });

  if (!id)
    await prisma.activity.create({
      data: {
        contactId: contact.id,
        title: "Contact created",
        description: "",
        date: new Date().toISOString().split("T")[0],
        type: "SYSTEM",
      },
    });

  return contact;
}

export function createActivity({
  title,
  date,
  description,
  contactId,
}: {
  title: string;
  date: string;
  description: string;
  contactId: string;
}) {
  return prisma.activity.create({
    data: {
      contactId,
      title,
      description,
      date,
      type: "USER",
    },
  });
}

export default prisma;
