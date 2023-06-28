import { NotificationSettings, SearchParams } from "@/types";
import { useMutation } from "@tanstack/react-query";

type Args = {
  onSuccess: () => void;
  onError: (error: unknown) => void;
  method: "POST" | "PUT";
};

type HandleSetNotificationsArgs = {
  email: string;
  notificationSettings: NotificationSettings;
};

export const useNotificationSettingsMutation = ({
  onSuccess,
  onError,
  method,
}: Args) =>
  useMutation({
    mutationFn: async ({
      email,
      notificationSettings,
    }: HandleSetNotificationsArgs) => {
      const response = await fetch(
        `/settings/notifications/api?${SearchParams.Email}=${email}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(notificationSettings),
          method,
        }
      );

      if (!response.ok) {
        throw new Error("Unable to set notifications");
      }
    },
    onSuccess,
    onError,
  });
