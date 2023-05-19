"use client";

import { useEffect, useState } from "react";
import FoldableComponent from "./FoldableComponent";
import { useSession } from "next-auth/react";
import { Action, ActionType } from "@/types";
import { ClipLoader } from "react-spinners";
import { ActionCard } from "./ActionCard";

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
      const response = await fetch(`/api/actions?email=${email}`);
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
    <>
      {pastActions.length > 0 || upcomingActions.length > 0 ? (
        <>
          <FoldableComponent
            title={
              <div className="flex items-center">
                <div className="mr-2 w-1 h-4 border-l-4 border-light-yellow"></div>
                <h2>{`Past Due (${pastActions.length})`}</h2>
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
          <div className="mb-20">
            <FoldableComponent
              title={
                <div className="flex items-center">
                  <div className="mr-2 w-1 h-4 border-l-4 border-light-blue"></div>
                  <h2>{`New Action Items (${upcomingActions.length})`}</h2>
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
        </>
      ) : (
        <div className="flex items-center justify-center text-xl md:text-3xl">
          No actions needed
        </div>
      )}
    </>
  );
};
