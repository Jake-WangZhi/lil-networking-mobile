import { fetcher } from "@/lib/utils";
import { Action } from "@/types";
import { useQuery } from "@tanstack/react-query";

type Args = {
  email?: string | null;
};

export type ActionType = {
  pastActions: Array<Action>;
  upcomingActions: Array<Action>;
};

export const useAction = ({ email }: Args) => {
  const {
    isError,
    data: actions,
    isLoading,
  } = useQuery({
    queryKey: ["action", email],
    queryFn: () => fetcher(`/dashboard/api?email=${email}`),
    enabled: !!email,
  });

  return {
    actions: actions as ActionType,
    isLoading,
    isError,
  };
};
