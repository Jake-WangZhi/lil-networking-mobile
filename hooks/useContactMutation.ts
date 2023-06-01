import { Contact } from "@/types";
import { useMutation } from "@tanstack/react-query";

type Props = {
  onSuccess: () => void;
  onError: (error: unknown) => void;
  method: "PUT" | "DELETE";
};

export const useContactMutation = ({ onSuccess, onError, method }: Props) =>
  useMutation({
    mutationFn: async (contact: Contact) => {
      const response = await fetch(`/contacts/${contact.id}/api`, {
        headers: {
          "Content-Type": "application/json",
        },
        ...(method === "DELETE" ? {} : { body: JSON.stringify(contact) }),
        method,
      });

      if (!response.ok) {
        throw new Error("Unable to update");
      }
    },
    onSuccess,
    onError,
  });
