import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  const quotes = await prisma.quote.findMany();

  const seed = Date.now(); // Dynamic seed based on current timestamp
  const randomIndex = Math.floor(seed * quotes.length);

  const randomQuote = quotes[randomIndex];

  return NextResponse.json(randomQuote);
}
