import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const clerk_api_uri = process.env.CLERK_API_URL;

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/api/streak_calculation_cron") {
    return NextResponse.next();
  }

  if (!clerk_api_uri) throw new Error("No Clerk API URL");

  const userId = request.headers.get("User-ID");
  const clerk_secret_key = request.headers.get("Authorization");

  if (!userId || !clerk_secret_key) {
    return new NextResponse(
      JSON.stringify({ success: false, message: "Bad Request" }),
      { status: 400, headers: { "content-type": "application/json" } }
    );
  }

  const response = await fetch(`${clerk_api_uri}/users/${userId}`, {
    headers: {
      Authorization: clerk_secret_key,
    },
  });

  if (!response.ok) {
    if (response.status === 404)
      return new NextResponse(
        JSON.stringify({ success: false, message: "User Not Found" }),
        { status: 404, headers: { "content-type": "application/json" } }
      );

    if (response.status === 401)
      return new NextResponse(
        JSON.stringify({ success: false, message: "Not Authorized" }),
        { status: 404, headers: { "content-type": "application/json" } }
      );

    return new NextResponse(
      JSON.stringify({ success: false, message: "Bad Request" }),
      { status: 400, headers: { "content-type": "application/json" } }
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/api/:path*",
};
