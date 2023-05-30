import { fetcher } from "@/lib/utils";
import { Contact } from "@/types";
import { useQuery } from "@tanstack/react-query";

type Args = {
  email?: string | null;
  id?: string;
};

export const useContact = ({ email, id }: Args) => {
  const {
    isLoading,
    data: contacts,
    isError,
  } = useQuery<Contact[]>({
    queryKey: ["contact", email, id],
    queryFn: () => fetcher(`/contacts/api?email=${email}&id=${id ? id : ""}`),
    enabled: !!email,
  });

  return {
    contacts,
    isLoading,
    isError,
  };
};
