import { Activity } from "@/types";
import { useMutation } from "@tanstack/react-query";

type ActivityResponse = {
  showQuote: boolean;
};

type Args = {
  onSuccess: (data: ActivityResponse) => void;
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

      const json = await response.json();

      if (!response.ok) {
        throw new Error("Unable to update");
      }

      return json;
    },
    onSuccess,
    onError,
  });
