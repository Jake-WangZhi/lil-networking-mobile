export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/dashboard",
    "/onboarding",
    "/contacts/:path*",
    "/settings/:path*",
  ],
};
