import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@clerk/clerk-expo";

const webUrl = process.env.EXPO_PUBLIC_WEB_URL;

interface Args {
  onSuccess: () => void;
  onError: (error: unknown) => void;
  method: "POST" | "PUT";
}

export const useContactMutation = ({ onSuccess, onError, method }: Args) => {
  const { userId } = useAuth();
  return useMutation({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mutationFn: async (formPayload: any) => {
      console.log("formPayload", formPayload);
      const response = await fetch(`${webUrl}/api/contacts`, {
        headers: {
          "Content-Type": "application/json",
          "User-ID": userId ?? "",
          Authorization: `Bearer ${process.env.EXPO_PUBLIC_CLERK_SECRET_KEY}`,
        },

        body: JSON.stringify(formPayload),
        method,
      });

      if (!response.ok) {
        throw new Error("Unable to create the contact");
      }
    },
    onSuccess,
    onError,
  });
};
