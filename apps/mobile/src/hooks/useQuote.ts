import { useAuth } from "@clerk/clerk-expo";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

const quoteSchema = z.object({
  id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  text: z.string(),
  author: z.string().nullable(),
  titles: z.array(z.string()),
});

const EXPO_PUBLIC_API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

if (!EXPO_PUBLIC_API_BASE_URL)
  throw new Error("Missing EXPO_PUBLIC_API_BASE_URL");

export const useQuote = () => {
  const { getToken } = useAuth();

  async function headers() {
    const headers = new Map<string, string>();

    const token = await getToken();

    if (token) headers.set("Authorization", token);

    headers.set("Accept", "application/json");

    return Object.fromEntries(headers);
  }

  return useQuery({
    queryKey: ["quote"],
    queryFn: async () => {
      const response = await fetch(`${EXPO_PUBLIC_API_BASE_URL}/api/quote`, {
        headers: await headers(),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      return quoteSchema.parse(await response.json());
    },
  });
};
