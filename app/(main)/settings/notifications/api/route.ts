import { NotificationSettings, SearchParams } from "@/types";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get(SearchParams.Email);

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

  const notificationSettings = await prisma.notificationSettings.findUnique({
    where: {
      userId: user.id,
    },
  });

  return NextResponse.json(notificationSettings);
}

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get(SearchParams.Email);
  const notificationSettings: NotificationSettings = await request.json();

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

  const { newAction, streak, meetGoal, updateTime, timeZone } =
    notificationSettings;

  const newNotificationSettings = await prisma.notificationSettings.create({
    data: {
      userId: user.id,
      newAction,
      streak,
      meetGoal,
      updateTime,
      timeZone,
    },
  });

  return NextResponse.json(newNotificationSettings);
}

export async function PUT(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get(SearchParams.Email);
  const notificationSettings: NotificationSettings = await request.json();

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

  const { newAction, streak, meetGoal, updateTime, timeZone } =
    notificationSettings;

  const newNotificationSettings = await prisma.notificationSettings.update({
    where: {
      userId: user.id,
    },
    data: {
      newAction,
      streak,
      meetGoal,
      updateTime,
      timeZone,
    },
  });

  return NextResponse.json(newNotificationSettings);
}
