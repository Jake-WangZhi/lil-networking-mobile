// import { clerkClient } from "@clerk/nextjs";

// const CLERK_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
// console.log("CLERK_PUBLISHABLE_KEY", CLERK_PUBLISHABLE_KEY);
// if (!CLERK_PUBLISHABLE_KEY) {
//   throw new Error("No Clerk Publishable Key Available");
// }

// export default authMiddleware({ secretKey: CLERK_PUBLISHABLE_KEY });

// export const config = {
//   matcher: "/api/:path*",
// };

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const clerk_uri = process.env.CLERK_API_URL;

const clerk_secret_key = process.env.CLERK_SECRET_KEY;

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/api/streak_calculation_cron") {
    return NextResponse.next();
  }

  if (!clerk_uri) throw new Error("No Clerk URL");
  if (!clerk_secret_key) throw new Error("No Clerk SECRET KEY");

  const userId = "user_2TpWatS7hGnXWMr4XkVcJbPSGwS";

  const response = await fetch(`${clerk_uri}/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${clerk_secret_key}`,
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

  const data = await response.json();

  console.log("data", data);

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/api/:path*",
};
