import { NextResponse } from "next/server";
import prisma from "~/lib/prisma";
import type { Prisma } from "@prisma/client";
import { SearchParams } from "~/types";
import { currentUser } from "@clerk/nextjs";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get(SearchParams.Name);
  const user = await currentUser();

  if (!user)
    return NextResponse.json({ error: "User Not Found" }, { status: 404 });

  const contacts = await getContacts(name, user.id);

  return NextResponse.json(contacts);
}

const getContacts = async (name: string | null, userId: string) => {
  let whereClause: Prisma.ContactWhereInput = {
    userId,
  };

  if (name) {
    const [firstName, lastName] = name.split(" ");

    if (lastName) {
      whereClause = {
        ...whereClause,
        firstName: { contains: firstName, mode: "insensitive" },
        lastName: { contains: lastName, mode: "insensitive" },
      };
    } else {
      whereClause = {
        ...whereClause,
        OR: [
          { firstName: { contains: firstName, mode: "insensitive" } },
          { lastName: { contains: firstName, mode: "insensitive" } },
        ],
      };
    }
  }

  const contacts = await prisma.contact.findMany({
    where: whereClause,
    orderBy: [
      {
        firstName: "asc",
      },
      {
        lastName: "asc",
      },
    ],
    select: {
      id: true,
      firstName: true,
      lastName: true,
      title: true,
      tags: true,
      isArchived: true,
    },
  });

  return contacts;
};
