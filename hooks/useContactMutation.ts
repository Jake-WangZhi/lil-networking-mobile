import { Contact } from "@/types";
import { useMutation } from "@tanstack/react-query";

type Props = {
  onSuccess: () => void;
  onError: (error: unknown) => void;
  method: "POST" | "PUT" | "DELETE";
};

export const useContactMutation = ({ onSuccess, onError, method }: Props) =>
  useMutation({
    mutationFn: async (contact: Contact) => {
      let url = "/contacts/api";

      if (method === "DELETE") {
        url = `/contacts/api?id=${contact.id}`;
      }

      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contact),
        method,
      });

      if (!response.ok) {
        throw new Error("Unable to update");
      }
    },
    onSuccess,
    onError,
  });
