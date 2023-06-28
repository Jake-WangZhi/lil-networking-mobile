import { fetcher } from "@/lib/utils";
import { SearchParams } from "@/types";
import { NotificationSettings } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

type Args = {
  email?: string | null;
};

export const useNotificationSettings = ({ email }: Args) => {
  const {
    isError,
    data: notificationSettings,
    isLoading,
  } = useQuery<NotificationSettings>({
    queryKey: ["notificationSettings", email],
    queryFn: () =>
      fetcher(`/settings/notifications/api?${SearchParams.Email}=${email}`),
    enabled: !!email,
  });

  return {
    notificationSettings,
    isLoading,
    isError,
  };
};
