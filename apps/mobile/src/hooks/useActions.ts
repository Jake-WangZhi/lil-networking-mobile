import { useAuth } from "@clerk/clerk-expo";
import type { ActionType } from "@foundrymakes/validation";
import { ActionArraySchema } from "@foundrymakes/validation";
import { useQuery } from "@tanstack/react-query";

const EXPO_PUBLIC_API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

if (!EXPO_PUBLIC_API_BASE_URL)
  throw new Error("Missing EXPO_PUBLIC_API_BASE_URL");

export const useActions = (type: ActionType) => {
  const { getToken } = useAuth();

  async function headers() {
    const headers = new Map<string, string>();

    const token = await getToken();

    if (token) headers.set("Authorization", token);

    headers.set("Accept", "application/json");

    return Object.fromEntries(headers);
  }

  return useQuery({
    queryKey: ["actions", type],
    queryFn: async () => {
      const response = await fetch(
        `${EXPO_PUBLIC_API_BASE_URL}/api/actions?type=${type}`,
        {
          headers: await headers(),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      return ActionArraySchema.parse(await response.json());
    },
  });
};
