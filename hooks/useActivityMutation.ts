import { Activity } from "@/types";
import { useMutation } from "@tanstack/react-query";

type Args = {
  onSuccess: () => void;
  onError: (error: unknown) => void;
  method: "DELETE" | "POST";
};

export const useActivityMutation = ({ onSuccess, onError, method }: Args) =>
  useMutation({
    mutationFn: async (activity: Activity) => {
      let url = `/contacts/${activity.contactId}/activities/api`;

      if (method === "DELETE") {
        url = `/contacts/${activity.contactId}/activities/${activity.id}`;
      }

      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
        },
        ...(method === "DELETE" ? {} : { body: JSON.stringify(activity) }),
        method,
      });

      if (!response.ok) {
        throw new Error("Unable to update");
      }
    },
    onSuccess,
    onError,
  });
