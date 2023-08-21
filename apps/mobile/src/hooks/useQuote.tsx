import { fetcher } from "~/lib/utils";
import { useQuery } from "@tanstack/react-query";

interface Quote {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  text: string;
  author: string | null;
  titles: string[];
}

const webUrl = process.env.EXPO_PUBLIC_WEB_URL;

export const useQuote = (userId: string) => {
  const {
    isError,
    data: quote,
    isLoading,
  } = useQuery<Quote>({
    queryKey: ["quote"],
    queryFn: () => fetcher(`${webUrl}/api/quote`, userId),
  });

  return {
    quote,
    isLoading,
    isError,
  };
};
