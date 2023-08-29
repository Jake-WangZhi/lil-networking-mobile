import { useAuth } from "@clerk/clerk-expo";
import { actionArraySchema, ActionType } from "@foundrymakes/validation";
import { useQuery } from "@tanstack/react-query";
import { generateHeaders } from "~/utils/generateHeaders";

const EXPO_PUBLIC_API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

if (!EXPO_PUBLIC_API_BASE_URL)
  throw new Error("Missing EXPO_PUBLIC_API_BASE_URL");

export const useUpcomingActions = () => {
  const { getToken } = useAuth();

  return useQuery({
    queryKey: ["upcomingActions"],
    queryFn: async () => {
      const response = await fetch(
        `${EXPO_PUBLIC_API_BASE_URL}/api/actions?type=${ActionType.UPCOMING}`,
        {
          headers: await generateHeaders(getToken),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      return actionArraySchema.parse(await response.json());
    },
  });
};
