import { fetcher } from "@/lib/utils";
import { Quote } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useQuotes = () => {
  const {
    isError,
    data: quotes,
    isLoading,
  } = useQuery<Quote[]>({
    queryKey: ["quote"],
    queryFn: () => fetcher(`/quote/api`),
  });

  return {
    quotes,
    isLoading,
    isError,
  };
};
