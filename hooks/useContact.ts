import { fetcher } from "@/lib/utils";
import { Action, Contact } from "@/types";
import { useQuery } from "@tanstack/react-query";

type Args = {
  email?: string | null;
};

export const useContact = ({ email }: Args) => {
  const {
    isLoading,
    data: contacts,
    isError,
  } = useQuery<Contact[]>({
    queryKey: ["contact", email],
    queryFn: () => fetcher(`/contacts/api?email=${email}`),
    enabled: !!email,
  });

  return {
    contacts,
    isLoading,
    isError,
  };
};
