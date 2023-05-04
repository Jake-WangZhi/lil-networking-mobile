"use client";

import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export interface AuthContextProps {
  children: React.ReactNode;
  session: Session;
}

export default function AuthContext({ children, session }: AuthContextProps) {
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/dashboard");
    } else {
      router.push("/signin");
    }
  }, [router, session]);

  return <SessionProvider session={session}>{children}</SessionProvider>;
}
