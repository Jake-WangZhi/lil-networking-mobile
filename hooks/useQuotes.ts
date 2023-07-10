import { fetcher } from "@/lib/utils";
import { Quote } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

export const useQuotes = () => {
  const {
    isError,
    data: quotes,
    isLoading,
  } = useQuery<Quote[]>({
    queryKey: ["quote"],
    queryFn: () => fetcher(`/quote/api`),
    cacheTime: 0, // Disable caching
  });

  return {
    quotes,
    isLoading,
    isError,
  };
};
