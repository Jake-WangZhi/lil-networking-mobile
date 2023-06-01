"use client";

import { Button } from "@/components/Button";
import { signIn } from "next-auth/react";

export default function SignInPage() {
  return (
    <main className="relative flex min-h-screen flex-col justify-center px-8">
      <h1 className="flex flex-col mb-4 text-light-blue text-start text-5xl font-bold tracking-tight leading-72 md:text-7xl">
        <span className="text-3xl md:text-5xl leading-48">Lil</span>
        <span className="text-white">Networking</span>
        App
      </h1>
      <div className="mb-4 w-1/12 h-[202px] border-l-4 border-light-blue"></div>
      <p className="mb-32 text-white text-xl font-bold md:text-3xl">
        Build networking habits & <br />
        reach your goals
      </p>
      <div className="flex justify-center">
        <Button
          variant="primary"
          className="mx-auto"
          onClick={() => signIn("linkedin", { callbackUrl: "/dashboard" })}
        >
          Sign in with LinkedIn
        </Button>
      </div>
    </main>
  );
}
