import { SearchParams, Subscription } from "@/types";
import { useMutation } from "@tanstack/react-query";

type Args = {
  onSuccess: () => void;
  onError: (error: unknown) => void;
  method: "POST";
};

type HandleSetSubscriptionArgs = {
  email: string;
  subscription: Subscription;
};

export const useSubscriptionMutation = ({ onSuccess, onError, method }: Args) =>
  useMutation({
    mutationFn: async ({ email, subscription }: HandleSetSubscriptionArgs) => {
      const response = await fetch(
        `/api/subscription?${SearchParams.Email}=${email}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(subscription),
          method,
        }
      );

      if (!response.ok) {
        throw new Error("Unable to set subscription");
      }
    },
    onSuccess,
    onError,
  });
