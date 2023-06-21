import { Goals, SearchParams } from "@/types";
import { useMutation } from "@tanstack/react-query";

type Args = {
  onSuccess: () => void;
  onError: (error: unknown) => void;
  method: "POST" | "PUT";
};

type HandleSetGoalsArgs = {
  email: string;
  goals: {
    networkingComfortLevel?: number;
    goalConnections: number;
    goalMessages: number;
  };
};

export const useGoalsMutation = ({ onSuccess, onError, method }: Args) =>
  useMutation({
    mutationFn: async ({ email, goals }: HandleSetGoalsArgs) => {
      const response = await fetch(
        `/settings/goals/api?${SearchParams.Email}=${email}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(goals),
          method,
        }
      );

      if (!response.ok) {
        throw new Error("Unable to set goals");
      }
    },
    onSuccess,
    onError,
  });
