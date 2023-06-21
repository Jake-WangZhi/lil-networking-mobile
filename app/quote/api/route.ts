import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  const quotes = await prisma.quote.findMany();

  return NextResponse.json(quotes);
}
