import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  const quotes = await prisma.quote.findMany();
  console.log("quotes", quotes);
  const randomIndex = Math.floor(Math.random() * quotes.length);
  console.log("randomIndex", randomIndex);

  const randomQuote = quotes[randomIndex];

  return NextResponse.json(randomQuote);
}
