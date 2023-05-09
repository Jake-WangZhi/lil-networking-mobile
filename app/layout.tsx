import "./globals.css";
import { Inter } from "next/font/google";
import { Session } from "next-auth";
import { headers } from "next/headers";
import AuthContext from "./AuthContext";

export const metadata = {
  title: "Little Networking",
  description: "The app to help people form intentional networking habits ",
};

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

async function getSession(cookie: string): Promise<Session> {
  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/session`, {
    headers: {
      cookie,
    },
  });

  const session = await response.json();

  return Object.keys(session).length > 0 ? session : null;
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession(headers().get("cookie") ?? "");

  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={inter.variable}>
        <AuthContext session={session}>{children}</AuthContext>
      </body>
    </html>
  );
}
