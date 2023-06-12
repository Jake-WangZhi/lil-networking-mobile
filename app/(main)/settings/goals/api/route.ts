import prisma from "@/lib/prisma";
import { Goals } from "@/types";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");
  const goals: Goals = await request.json();

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

  const { networkingComfortLevel, goalContacts, goalContactsToReach } = goals;

  const newGoals = await prisma.goals.create({
    data: {
      userId: user.id,
      networkingComfortLevel,
      goalContacts,
      goalContactsToReach,
    },
  });

  return NextResponse.json(newGoals);
}
