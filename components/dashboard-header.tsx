"use client";

import { signOut, useSession } from "next-auth/react";
import { Button } from "./button";

export default function DashboardHeader() {
  const { data: session } = useSession();

  return (
    <div className="p-8 flex items-center justify-between w-full">
      <h1 className="text-4xl font-medium tracking-tight md:text-7xl">
        Hi, {session?.user?.name?.split(" ")[0]}
      </h1>
      <Button onClick={() => signOut()}>Sign Out</Button>
    </div>
  );
}
