import prisma from "~/lib/prisma";
import type { GoalsArgs } from "~/types";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const userId = request.headers.get("User-ID") ?? "";

  const goalsArgs: GoalsArgs = await request.json();

  const { networkingComfortLevel, goalConnections, goalMessages } = goalsArgs;

  const newGoals = await prisma.goals.create({
    data: {
      userId,
      networkingComfortLevel: networkingComfortLevel ?? 1,
      goalConnections,
      goalMessages,
    },
  });

  return NextResponse.json(newGoals);
}

export async function PUT(request: Request) {
  const userId = request.headers.get("User-ID") ?? "";

  const goalsArgs: GoalsArgs = await request.json();

  const { goalConnections, goalMessages } = goalsArgs;

  const newGoals = await prisma.goals.update({
    where: {
      userId,
    },
    data: {
      goalConnections,
      goalMessages,
    },
  });

  return NextResponse.json(newGoals);
}

export async function GET(request: Request) {
  const userId = request.headers.get("User-ID") ?? "";

  const goals = await prisma.goals.findUnique({
    where: {
      userId,
    },
  });

  return NextResponse.json(goals);
}
