import { fetcher } from "@/lib/utils";
import { Contact } from "@/types";
import { useQuery } from "@tanstack/react-query";

type Args = {
  userEmail?: string | null;
  name?: string | null;
};

export const useContacts = ({ userEmail, name }: Args) => {
  const {
    isLoading,
    data: contacts,
    isError,
  } = useQuery<Contact[]>({
    queryKey: ["contacts", userEmail, name],
    queryFn: () => fetcher(`/contacts/api?userEmail=${userEmail}&name=${name}`),
    enabled: !!userEmail,
  });

  return {
    contacts,
    isLoading,
    isError,
  };
};
