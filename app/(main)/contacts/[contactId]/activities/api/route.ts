import { Activity } from "@/types";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: { contactId: string } }
) {
  const activity: Activity = await request.json();

  const { title, date, description, type } = activity;

  const newActivity = await prisma?.activity.create({
    data: {
      contactId: params.contactId,
      title,
      date,
      description,
      type,
    },
  });

  return NextResponse.json(newActivity);
}
