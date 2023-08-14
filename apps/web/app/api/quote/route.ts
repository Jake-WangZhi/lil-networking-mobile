import { NextResponse } from "next/server";
import prisma from "~/lib/prisma";
export const dynamic = "force-dynamic";

export async function GET() {
  const count = await prisma.quote.count();
  const skip = Math.floor(Math.random() * count);
  const quote = await prisma.quote.findFirst({
    skip,
  });

  return NextResponse.json(quote);
}
