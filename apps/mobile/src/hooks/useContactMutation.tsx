import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@clerk/clerk-expo";

interface Args {
  onSuccess: () => void;
  onError: (error: unknown) => void;
  method: "POST" | "PUT";
}

const EXPO_PUBLIC_API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

if (!EXPO_PUBLIC_API_BASE_URL)
  throw new Error("Missing EXPO_PUBLIC_API_BASE_URL");

export const useContactMutation = ({ onSuccess, onError, method }: Args) => {
  const { getToken } = useAuth();

  async function headers() {
    const headers = new Map<string, string>();

    const token = await getToken();

    if (token) headers.set("Authorization", token);

    headers.set("Accept", "application/json");

    return Object.fromEntries(headers);
  }

  return useMutation({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mutationFn: async (formPayload: any) => {
      console.log("formPayload", formPayload);
      const response = await fetch(`${EXPO_PUBLIC_API_BASE_URL}/api/contacts`, {
        headers: await headers(),

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
