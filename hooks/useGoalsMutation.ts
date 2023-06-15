import { GoalProgressType, Goals } from "@/types";
import { useMutation } from "@tanstack/react-query";

type Args = {
  onSuccess: () => void;
  onError: (error: unknown) => void;
  method: "POST" | "PUT";
};

type HandleSetGoalsArgs = {
  email: string;
  goals?: Goals;
  type?: GoalProgressType;
};

export const useGoalsMutation = ({ onSuccess, onError, method }: Args) =>
  useMutation({
    mutationFn: async ({ email, goals, type }: HandleSetGoalsArgs) => {
      const response = await fetch(
        `/settings/goals/api?email=${email}&type=${type}`,
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
