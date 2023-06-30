"use client";

import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { Grid, Switch, Typography } from "@mui/material";
import { Button } from "@/components/Button";
import { ChevronLeft } from "react-feather";
import { useRouter } from "next/navigation";
import { urlBase64ToUint8Array } from "@/lib/utils";
import { SubscriptionArgs } from "@/types";
import { useSubscriptionMutation } from "@/hooks/useSubscription";
import { useSession } from "next-auth/react";
import { useNotificationSettings } from "@/hooks/useNotificationSettings";
import { useNotificationSettingsMutation } from "@/hooks/useNotificationSettingsMutation";

export default function NotificationSettingPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [endpoint, setEndpoint] = useState(""); // State to hold the endpoint value
  const { notificationSettings } = useNotificationSettings({
    endpoint,
  });

  const [allNotificationsChecked, setAllNotificationsChecked] = useState(false);
  const [newActionChecked, setNewActionChecked] = useState(false);
  const [streakChecked, setStreakChecked] = useState(false);
  const [meetGoalChecked, setMeetGoalChecked] = useState(false);
  const [subscriptionId, setSubscriptionId] = useState("");

  useEffect(() => {
    if (notificationSettings) {
      const { newAction, streak, meetGoal, subscriptionId } =
        notificationSettings;

      setNewActionChecked(newAction);
      setStreakChecked(streak);
      setMeetGoalChecked(meetGoal);
      setSubscriptionId(subscriptionId);
    }
  }, [notificationSettings]);

  useEffect(() => {
    const fetchNotificationSettings = async () => {
      const registration = await navigator.serviceWorker.getRegistration();
      if (registration) {
        const subscription = await registration.pushManager.getSubscription();
        if (subscription) {
          const endpoint = subscription.endpoint;
          setEndpoint(endpoint);
        }
      }
    };

    fetchNotificationSettings();
  }, []);

  const postSubscriptionMutation = useSubscriptionMutation({
    method: "POST",
    onSuccess: ({ id }) => {
      setSubscriptionId(id);

      putNotificationSettingsMutation.mutate({
        newAction: newActionChecked,
        streak: streakChecked,
        meetGoal: meetGoalChecked,
        subscriptionId: id,
      });
    },
    onError: () => {},
  });

  const putNotificationSettingsMutation = useNotificationSettingsMutation({
    method: "PUT",
    onSuccess: () => {},
    onError: () => {},
  });

  useEffect(() => {
    if (newActionChecked && streakChecked && meetGoalChecked) {
      setAllNotificationsChecked(true);
    }

    if (!(newActionChecked && streakChecked && meetGoalChecked)) {
      setAllNotificationsChecked(false);
    }
  }, [newActionChecked, streakChecked, meetGoalChecked]);

  const isNotificationModificationAllowed = useCallback(async () => {
    if (
      "Notification" in window &&
      window.Notification.permission === "granted"
    )
      return true;
    if (window.Notification.permission !== "denied") {
      const result = await window.Notification.requestPermission();

      if (result === "granted") {
        const subscribeOptions = {
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(
            process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY ?? ""
          ),
        };

        const registration = await navigator.serviceWorker.getRegistration();

        const pushSubscription = await registration?.pushManager.subscribe(
          subscribeOptions
        );

        postSubscriptionMutation.mutate({
          email: session?.user?.email || "",
          subscription: pushSubscription?.toJSON() as SubscriptionArgs,
        });

        return true;
      }
    }

    return false;
  }, [postSubscriptionMutation, session?.user?.email]);

  const switchAllNotifications = useCallback(
    async (event: ChangeEvent<HTMLInputElement>, checked: boolean) => {
      if (await isNotificationModificationAllowed()) {
        setAllNotificationsChecked(checked);
        setNewActionChecked(checked);
        setStreakChecked(checked);
        setMeetGoalChecked(checked);
      }
    },
    [isNotificationModificationAllowed]
  );

  const switchNewAction = useCallback(
    async (event: ChangeEvent<HTMLInputElement>, checked: boolean) => {
      if (await isNotificationModificationAllowed())
        setNewActionChecked(checked);
    },
    [isNotificationModificationAllowed]
  );

  const switchStreak = useCallback(
    async (event: ChangeEvent<HTMLInputElement>, checked: boolean) => {
      if (await isNotificationModificationAllowed()) setStreakChecked(checked);
    },
    [isNotificationModificationAllowed]
  );

  const switchMeetGoal = useCallback(
    async (event: ChangeEvent<HTMLInputElement>, checked: boolean) => {
      if (await isNotificationModificationAllowed())
        setMeetGoalChecked(checked);
    },
    [isNotificationModificationAllowed]
  );

  const handleBackClick = useCallback(async () => {
    router.push("/settings");

    if (
      "Notification" in window &&
      window.Notification.permission === "granted"
    ) {
      if (subscriptionId)
        return putNotificationSettingsMutation.mutate({
          newAction: newActionChecked,
          streak: streakChecked,
          meetGoal: meetGoalChecked,
          subscriptionId,
        });

      const subscribeOptions = {
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(
          process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY ?? ""
        ),
      };

      const registration = await navigator.serviceWorker.getRegistration();

      const pushSubscription = await registration?.pushManager.subscribe(
        subscribeOptions
      );

      postSubscriptionMutation.mutate({
        email: session?.user?.email || "",
        subscription: pushSubscription?.toJSON() as SubscriptionArgs,
      });
    }
  }, [
    router,
    meetGoalChecked,
    newActionChecked,
    streakChecked,
    putNotificationSettingsMutation,
    subscriptionId,
  ]);

  return (
    <main className="relative min-h-screen py-8 px-4">
      <Grid container alignItems="center">
        <Grid item xs={2}>
          <Button
            variant="text"
            onClick={handleBackClick}
            sx={{ px: "6px", ml: "-6px" }}
          >
            <ChevronLeft
              size={36}
              className="md:w-11 md:h-11 lg:w-13 lg:h-13"
            />
          </Button>
        </Grid>
        <Grid item xs={8} sx={{ display: "flex", justifyContent: "center" }}>
          <Typography variant="h3" sx={{ fontWeight: 600 }}>
            Manage Notifications
          </Typography>
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
      <div className="flex justify-between mt-6">
        <div>
          <Typography variant="subtitle1">
            Enable all push notifications
          </Typography>
          <Typography variant="body1">
            All mobile notifications will be turned on
          </Typography>
        </div>
        <Switch
          onChange={switchAllNotifications}
          checked={allNotificationsChecked}
        />
      </div>
      <div className="mt-8 space-y-2">
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
          Push notifications
        </Typography>
        <div className="space-y-4">
          <div className="flex justify-between">
            <div>
              <Typography variant="subtitle1">New action alert</Typography>
              <Typography variant="body1">
                New actions on your dashboard
              </Typography>
            </div>
            <Switch onChange={switchNewAction} checked={newActionChecked} />
          </div>
          <div className="flex justify-between">
            <div>
              <Typography variant="subtitle1">Streak reminder</Typography>
              <Typography variant="body1">
                One week before losing streak
              </Typography>
            </div>
            <Switch onChange={switchStreak} checked={streakChecked} />
          </div>
          <div className="flex justify-between">
            <div>
              <Typography variant="subtitle1">Meet goal reminder</Typography>
              <Typography variant="body1">
                No activity in more than a week
              </Typography>
            </div>
            <Switch onChange={switchMeetGoal} checked={meetGoalChecked} />
          </div>
        </div>
      </div>
    </main>
  );
}
