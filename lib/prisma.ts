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

export function createContact({
  name,
  email,
  phone,
  userId,
}: {
  name: string;
  email: string;
  phone: string;
  userId: string;
}) {
  return prisma.contact.create({
    data: {
      name,
      email,
      phone,
      userId,
    },
  });
}

export default prisma;
