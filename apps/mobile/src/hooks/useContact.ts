import { useAuth } from "@clerk/clerk-expo";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

const contactSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string().nullable(),
  title: z.string().nullable(),
  company: z.string().nullable(),
  goalDays: z.number(),
  email: z.string().nullable(),
  phone: z.string().nullable(),
  links: z.array(z.string()),
  tags: z.array(z.string()),
  linkedInUrl: z.string().nullable(),
  //   activities: z.array({
  //     id: z.string(),
  //     createdAt: z.date(),
  //     updatedAt: z.date(),
  //     title: z.string(),
  //     description: z.string().nullable(),
  //     date: z.date(),
  //     type: z.enum(["past", "upcoming"]),
  //     contactId: z.string(),
  //   }),
  isArchived: z.boolean(),
});

const EXPO_PUBLIC_API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

if (!EXPO_PUBLIC_API_BASE_URL)
  throw new Error("Missing EXPO_PUBLIC_API_BASE_URL");

export const useContact = (id: string) => {
  const { getToken } = useAuth();

  async function headers() {
    const headers = new Map<string, string>();

    const token = await getToken();

    if (token) headers.set("Authorization", token);

    headers.set("Accept", "application/json");

    return Object.fromEntries(headers);
  }

  return useQuery({
    queryKey: ["contact", id],
    queryFn: async () => {
      const response = await fetch(
        `${EXPO_PUBLIC_API_BASE_URL}/api/contacts/${id}`,
        {
          headers: await headers(),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      return contactSchema.parse(await response.json());
    },
  });
};
