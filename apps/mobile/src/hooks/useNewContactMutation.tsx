import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@clerk/clerk-expo";

interface Args {
  onSuccess: () => void;
  onError: (error: unknown) => void;
}

const EXPO_PUBLIC_API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

if (!EXPO_PUBLIC_API_BASE_URL)
  throw new Error("Missing EXPO_PUBLIC_API_BASE_URL");

export const useNewContactMutation = ({ onSuccess, onError }: Args) => {
  const { getToken } = useAuth();

  async function headers() {
    const headers = new Map<string, string>();

    const token = await getToken();

    if (token) headers.set("Authorization", token);

    headers.set("Accept", "application/json");

    return Object.fromEntries(headers);
  }

  return useMutation({
    mutationFn: async (contactPayload: any) => {
      const response = await fetch(
        `${EXPO_PUBLIC_API_BASE_URL}/api/contacts/new`,
        {
          headers: await headers(),

          body: JSON.stringify(contactPayload),
          method: "POST",
        }
      );

      if (!response.ok) {
        throw new Error("Unable to create the contact");
      }
    },
    onSuccess,
    onError,
  });
};
