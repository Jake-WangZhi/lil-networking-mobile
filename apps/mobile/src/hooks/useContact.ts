import { useAuth } from "@clerk/clerk-expo";
import { contactSchema } from "@foundrymakes/validation";
import { useQuery } from "@tanstack/react-query";
import { generateHeaders } from "~/utils/generateHeaders";

const EXPO_PUBLIC_API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

if (!EXPO_PUBLIC_API_BASE_URL)
  throw new Error("Missing EXPO_PUBLIC_API_BASE_URL");

export const useContact = (id?: string) => {
  const { getToken } = useAuth();

  return useQuery({
    queryKey: ["contact", id],
    queryFn: async () => {
      const response = await fetch(
        `${EXPO_PUBLIC_API_BASE_URL}/api/contacts/${id}`,
        {
          headers: await generateHeaders(getToken),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      return contactSchema.parse(await response.json());
    },
    enabled: !!id,
  });
};
