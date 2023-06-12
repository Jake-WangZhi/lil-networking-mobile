import { Goals } from "@/types";
import { useMutation } from "@tanstack/react-query";

type Props = {
  onSuccess: () => void;
  onError: (error: unknown) => void;
  method: "POST";
};

type HandleSetGoalsArgs = {
  goals: Goals;
  email: string;
};

export const useGoalsMutation = ({ onSuccess, onError, method }: Props) =>
  useMutation({
    mutationFn: async ({ goals, email }: HandleSetGoalsArgs) => {
      const response = await fetch(`/settings/goals/api?email=${email}`, {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(goals),
        method,
      });

      if (!response.ok) {
        throw new Error("Unable to set goals");
      }
    },
    onSuccess,
    onError,
  });
