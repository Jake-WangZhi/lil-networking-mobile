import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const quotes = await prisma.quote.findMany();

  const randomNum = Math.random();
  const randomIndex = Math.floor(randomNum * quotes.length);
  const randomQuote = quotes[randomIndex];

  return NextResponse.json(randomQuote);
}
