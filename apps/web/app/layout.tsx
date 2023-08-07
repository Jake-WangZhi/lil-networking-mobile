import "tailwindcss/tailwind.css";
import "@fontsource/metropolis";
import { Session } from "next-auth";

export const metadata = {
  title: "Lil Networking",
  description: "The app to help people form intentional networking habits ",
};

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
  return (
    <html lang="en">
      <head>
        <link
          rel="manifest"
          crossOrigin="use-credentials"
          href="/manifest.json"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
