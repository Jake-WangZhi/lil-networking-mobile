export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/dashboard",
    "/onboarding",
    "/quote",
    "/contacts/:path*",
    "/settings/:path*",
  ],
};
