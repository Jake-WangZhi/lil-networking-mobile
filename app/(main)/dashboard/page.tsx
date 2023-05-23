"use client";

import { Header } from "@/components/Header";
import { ActionList } from "@/components/ActionList";
import { GoalSummary } from "@/components/GoalSummary";
import { useSession } from "next-auth/react";
import { useAction } from "@/hooks/useAction";

export default function DashboardPage() {
  const { data: session } = useSession();

  const { actions, isLoading, isError } = useAction({
    email: session?.user?.email,
  });

  return (
    <main className="relative min-h-screen flex flex-col items-center text-white px-4">
      <Header />
      <GoalSummary />
      <ActionList actions={actions} isLoading={isLoading} isError={isError} />
    </main>
  );
}
