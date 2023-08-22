import { authMiddleware } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export default authMiddleware({
  afterAuth(auth) {
    if (!auth.userId) {
      return NextResponse.json(
        { error: "authentication failed" },
        { status: 401 }
      );
    }
  },
  ignoredRoutes: ["/api/streak_calculation_cron"],
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api)(.*)"],
};
