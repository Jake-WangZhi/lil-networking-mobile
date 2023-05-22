"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Action } from "@/types";
import { ClipLoader } from "react-spinners";

export const ContactList = () => {
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
    <div className="w-full">
      {pastActions.length > 0 || upcomingActions.length > 0 ? (
        <>Contact List</>
      ) : (
        <div className="flex items-center justify-center text-xl md:text-3xl">
          No contacts
        </div>
      )}
    </div>
  );
};
