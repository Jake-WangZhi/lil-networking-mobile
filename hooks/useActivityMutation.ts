import { Activity } from "@/types";
import { useMutation } from "@tanstack/react-query";

type Props = {
  onSuccess: () => void;
  onError: (error: unknown) => void;
  method: "POST" | "DELETE";
};

export const useActivityMutation = ({ onSuccess, onError, method }: Props) =>
  useMutation({
    mutationFn: async (activity: Activity) => {
      let url = `/contacts/${activity.contactId}/activities`;

      if (method === "DELETE") {
        url = `/contacts/${activity.contactId}/activities/${activity.id}`;
      }

      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(activity),
        method,
      });

      if (!response.ok) {
        throw new Error("Unable to update");
      }
    },
    onSuccess,
    onError,
  });
