"use client";

import { useSession } from "next-auth/react";
import { GoalSummary } from "./GoalSummary";
import { ContactFormModal } from "./ContactFormModal";

export const DashboardHeader = () => {
  const { data: session } = useSession();

  return (
    <>
      <div className="pt-8 w-full">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-semibold md:text-7xl">
            Hi, {session?.user?.name?.split(" ")[0]}!
          </h1>
          <ContactFormModal />
        </div>
        <GoalSummary />
      </div>
    </>
  );
};
