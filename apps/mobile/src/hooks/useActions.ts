import { useAuth } from "@clerk/clerk-expo";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

const actionSchema = z.object({
  hasContacts: z.boolean(),
  pastActions: z.array(
    z.object({
      contactId: z.string(),
      contactFirstName: z.string(),
      contactLastName: z.string(),
      days: z.number(),
      goalDays: z.number(),
      title: z.string(),
      contactCreatedAt: z.string().optional(),
    })
  ),
  upcomingActions: z.array(
    z.object({
      contactId: z.string(),
      contactFirstName: z.string(),
      contactLastName: z.string(),
      days: z.number(),
      goalDays: z.number(),
      title: z.string(),
      contactCreatedAt: z.string().optional(),
    })
  ),
});

export enum ActionType {
  Past = "past",
  Upcoming = "upcoming",
}

const EXPO_PUBLIC_API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

if (!EXPO_PUBLIC_API_BASE_URL)
  throw new Error("Missing EXPO_PUBLIC_API_BASE_URL");

export const useActions = () => {
  const { getToken } = useAuth();

  async function headers() {
    const headers = new Map<string, string>();

    const token = await getToken();

    if (token) headers.set("Authorization", token);

    headers.set("Accept", "application/json");

    return Object.fromEntries(headers);
  }

  return useQuery({
    queryKey: ["actions"],
    queryFn: async () => {
      const response = await fetch(`${EXPO_PUBLIC_API_BASE_URL}/api/actions`, {
        headers: await headers(),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      return actionSchema.parse(await response.json());
    },
  });
};
