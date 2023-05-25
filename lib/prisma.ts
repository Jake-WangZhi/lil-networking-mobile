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

export async function createContact({
  name,
  email,
  phone,
  category,
  goalDays,
  note,
  userId,
}: {
  name: string;
  email: string;
  phone: string;
  category: string;
  goalDays: number;
  note: string;
  userId: string;
}) {
  const contact = await prisma.contact.create({
    data: {
      name,
      email,
      phone,
      category,
      goalDays,
      userId,
    },
  });

  if (note)
    await prisma.activity.create({
      data: {
        contactId: contact.id,
        note,
      },
    });
}

export default prisma;
