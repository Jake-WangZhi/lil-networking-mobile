import { fetcher } from "@/lib/utils";
import { Quote } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

type Args = {
  randomNum: number;
};

export const useQuote = ({ randomNum }: Args) => {
  const {
    isError,
    data: quote,
    isLoading,
  } = useQuery<Quote>({
    queryKey: ["quote"],
    queryFn: () => fetcher(`/quote/api`),
  });

  return {
    quote,
    isLoading,
    isError,
  };
};
