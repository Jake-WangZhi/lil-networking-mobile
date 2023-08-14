import prisma from "~/lib/prisma";
import type { GoalsArgs } from "~/types";
import { SearchParams } from "~/types";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get(SearchParams.UserId);
  const goalsArgs: GoalsArgs = await request.json();

  if (!userId)
    return new NextResponse(
      JSON.stringify({ success: false, message: "Missing User Id" }),
      { status: 400, headers: { "content-type": "application/json" } }
    );

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
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get(SearchParams.UserId);
  const goalsArgs: GoalsArgs = await request.json();

  if (!userId)
    return new NextResponse(
      JSON.stringify({ success: false, message: "Missing User Id" }),
      { status: 400, headers: { "content-type": "application/json" } }
    );

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
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get(SearchParams.UserId);

  if (!userId)
    return new NextResponse(
      JSON.stringify({ success: false, message: "Missing User Id" }),
      { status: 400, headers: { "content-type": "application/json" } }
    );

  const goals = await prisma.goals.findUnique({
    where: {
      userId,
    },
  });

  return NextResponse.json(goals);
}
