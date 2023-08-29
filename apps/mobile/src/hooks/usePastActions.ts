import { useAuth } from "@clerk/clerk-expo";
import { actionArraySchema, ActionType } from "@foundrymakes/validation";
import { useQuery } from "@tanstack/react-query";

const EXPO_PUBLIC_API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

if (!EXPO_PUBLIC_API_BASE_URL)
  throw new Error("Missing EXPO_PUBLIC_API_BASE_URL");

export const usePastActions = () => {
  const { getToken } = useAuth();

  async function headers() {
    const headers = new Map<string, string>();

    const token = await getToken();

    if (token) headers.set("Authorization", token);

    headers.set("Accept", "application/json");

    return Object.fromEntries(headers);
  }

  return useQuery({
    queryKey: ["pastActions"],
    queryFn: async () => {
      const response = await fetch(
        `${EXPO_PUBLIC_API_BASE_URL}/api/actions?type=${ActionType.PAST}`,
        {
          headers: await headers(),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      return actionArraySchema.parse(await response.json());
    },
  });
};
