import { fetcher } from "@/lib/utils";
import { Action } from "@/types";
import { useQuery } from "@tanstack/react-query";

type Args = {
  email?: string | null;
};

export type ActionType = {
  pastActions: Array<Action>;
  upcomingActions: Array<Action>;
  hasContacts: boolean;
};

export const useActions = ({ email }: Args) => {
  const {
    isError,
    data: actions,
    isLoading,
  } = useQuery<ActionType>({
    queryKey: ["actions", email],
    queryFn: () => fetcher(`/dashboard/api?email=${email}`),
    enabled: !!email,
  });

  return {
    actions,
    isLoading,
    isError,
  };
};
