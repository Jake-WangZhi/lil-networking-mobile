import prisma from "~/lib/prisma";
import type { GoalsArgs } from "~/types";
import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs";

export async function POST(request: Request) {
  const user = await currentUser();

  if (!user)
    return new NextResponse(
      JSON.stringify({ success: false, message: "User Not Found" }),
      { status: 404 }
    );

  const goalsArgs: GoalsArgs = await request.json();

  const { networkingComfortLevel, goalConnections, goalMessages } = goalsArgs;

  const newGoals = await prisma.goals.create({
    data: {
      userId: user.id,
      networkingComfortLevel: networkingComfortLevel ?? 1,
      goalConnections,
      goalMessages,
    },
  });

  return NextResponse.json(newGoals);
}

export async function PUT(request: Request) {
  const user = await currentUser();

  if (!user)
    return new NextResponse(
      JSON.stringify({ success: false, message: "User Not Found" }),
      { status: 404 }
    );

  const goalsArgs: GoalsArgs = await request.json();

  const { goalConnections, goalMessages } = goalsArgs;

  const newGoals = await prisma.goals.update({
    where: {
      userId: user.id,
    },
    data: {
      goalConnections,
      goalMessages,
    },
  });

  return NextResponse.json(newGoals);
}

export async function GET() {
  const user = await currentUser();

  if (!user)
    return new NextResponse(
      JSON.stringify({ success: false, message: "User Not Found" }),
      { status: 404 }
    );

  const goals = await prisma.goals.findUnique({
    where: {
      userId: user.id,
    },
  });

  return NextResponse.json(goals);
}
