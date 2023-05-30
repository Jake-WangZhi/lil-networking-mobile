import { Activity } from "@/types";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const activity: Activity = await request.json();

  const { contactId, title, description, date } = activity;

  const newActivity = await prisma?.activity.create({
    data: {
      contactId,
      title,
      description,
      date,
    },
  });

  return NextResponse.json(newActivity);
}

export async function DELETE(
  request: Request,
  { params }: { params: { activityId: string } }
) {
  const activity = await prisma?.activity.delete({
    where: { id: params.activityId },
  });

  return NextResponse.json(activity);
}
