"use client";

import { useEffect, useState } from "react";
import FoldableComponent from "./FoldableComponent";
import { useSession } from "next-auth/react";
import { Action, ActionType } from "@/types";
import { ClipLoader } from "react-spinners";
import { ActionCard } from "./ActionCard";
import { Info } from "react-feather";

export const ActionList = () => {
  const [pastActions, setPastActions] = useState<Action[]>([]);
  const [upcomingActions, setUpcomingActions] = useState<Action[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const email = session?.user?.email;
    if (email) {
      fetchActionsBasedOnEmail(email);
    }
  }, [session]);

  const fetchActionsBasedOnEmail = async (email: string) => {
    try {
      const response = await fetch(`/dashboard/api?email=${email}`);
      const data = await response.json();

      if (response.ok) {
        const { pastActions, upcomingActions } = data.actions;
        setPastActions(pastActions as Action[]);
        setUpcomingActions(upcomingActions as Action[]);
      } else {
        throw new Error(response.statusText);
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (error) {
    return (
      <div className="flex items-center justify-center text-3xl text-red-400">
        {error}
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <ClipLoader color="#38ACE2" size={150} />
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-20">
        <FoldableComponent
          title={
            <div className="flex items-center space-x-2">
              <div className="w-1 h-4 border-l-4 border-light-yellow md:border-l-5 md:h-5 lg:border-l-6 lg:h-6"></div>
              <h2 className="md:text-xl lg:text-2xl">{`Past Due (${pastActions.length})`}</h2>
              <Info
                size={16}
                opacity={0.7}
                className="md:w-5 md:h-5 lg:w-6 lg:h-6"
              />
            </div>
          }
          content={
            <>
              {pastActions.map((action, index) => (
                <ActionCard
                  key={index}
                  action={action}
                  actionType={ActionType.Past}
                />
              ))}
            </>
          }
        />
        <FoldableComponent
          title={
            <div className="flex items-center space-x-2">
              <div className="w-1 h-4 border-l-4 border-light-blue md:border-l-5 md:h-5 lg:border-l-6 lg:h-6"></div>
              <h2 className="md:text-xl lg:text-2xl">{`New Action Items (${upcomingActions.length})`}</h2>
              <Info
                size={18}
                opacity={0.7}
                className="md:w-5 md:h-5 lg:w-6 lg:h-6"
              />
            </div>
          }
          content={
            <>
              {upcomingActions.map((action, index) => (
                <ActionCard
                  key={index}
                  action={action}
                  actionType={ActionType.Upcoming}
                />
              ))}
            </>
          }
        />
      </div>
    </div>
  );
};
