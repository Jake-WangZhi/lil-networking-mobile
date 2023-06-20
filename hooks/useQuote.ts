import { Quote } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useQuote = () => {
  const {
    isError,
    data: quote,
    isLoading,
  } = useQuery<Quote>({
    queryKey: ["quote"],
    queryFn: () =>
      fetch("/quote/api", {
        headers: {
          "Cache-Control": "no-cache",
        },
      }).then((response) => {
        if (response.ok) return response.json();
        else throw new Error(response.statusText);
      }),
  });

  return {
    quote,
    isLoading,
    isError,
  };
};
