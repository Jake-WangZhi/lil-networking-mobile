import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  const count = await prisma.quote.count();
  const skip = Math.floor(Math.random() * count);

  const quote = await prisma.quote.findFirst({
    skip,
  });

  return NextResponse.json(quote);
}
