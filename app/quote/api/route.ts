import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url); //to make sure Math.random() is revoked on every request

  const count = await prisma.quote.count();
  const skip = Math.floor(Math.random() * count);
  const quote = await prisma.quote.findFirst({
    skip,
  });

  return NextResponse.json(quote);
}
