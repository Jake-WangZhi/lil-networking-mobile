import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV === "development") global.prisma = prisma;

export function getUserByEmail(email: string) {
  return prisma.users.findUnique({
    where: { email },
  });
}

export function createContact({
  name,
  email,
  phone,
  usersId,
}: {
  name: string;
  email: string;
  phone: string;
  usersId: string;
}) {
  return prisma.contacts.create({
    data: {
      name,
      email,
      phone,
      usersId,
    },
  });
}

export default prisma;
