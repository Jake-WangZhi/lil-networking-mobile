"use client";

import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { Grid, Switch, Typography } from "@mui/material";
import { Button } from "@/components/Button";
import { ChevronLeft } from "react-feather";
import { useRouter } from "next/navigation";
import { urlBase64ToUint8Array } from "@/lib/utils";
import { Subscription } from "@/types";
import { useSubscriptionMutation } from "@/hooks/useSubscription";
import { useSession } from "next-auth/react";

const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

export default function NotificationSettingPage() {
  const { data: session } = useSession();
  const router = useRouter();

  const [allNotificationsChecked, setAllNotificationsChecked] = useState(false);
  const [newActionChecked, setNewActionChecked] = useState(false);
  const [streakChecked, setStreakChecked] = useState(false);
  const [meetGoalChecked, setMeetGoalChecked] = useState(false);

  const postSubscriptionMutation = useSubscriptionMutation({
    method: "POST",
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

  const requestPermission = async () => {
    if ("Notification" in window) {
      const permission = window.Notification.permission;
      if (permission === "granted") {
        return true;
      } else if (permission !== "denied") {
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
            subscription: pushSubscription?.toJSON() as Subscription,
          });

          return true;
        }
      }
    }

    return false;
  };

  const switchAllNotifications = useCallback(
    async (event: ChangeEvent<HTMLInputElement>, checked: boolean) => {
      if (await requestPermission()) {
        setAllNotificationsChecked(checked);
        setNewActionChecked(checked);
        setStreakChecked(checked);
        setMeetGoalChecked(checked);
      }
    },
    []
  );

  const switchNewAction = useCallback(
    async (event: ChangeEvent<HTMLInputElement>, checked: boolean) => {
      if (await requestPermission()) setNewActionChecked(checked);
    },
    []
  );

  const switchStreak = useCallback(
    async (event: ChangeEvent<HTMLInputElement>, checked: boolean) => {
      if (await requestPermission()) setStreakChecked(checked);
    },
    []
  );

  const switchMeetGoal = useCallback(
    async (event: ChangeEvent<HTMLInputElement>, checked: boolean) => {
      if (await requestPermission()) setMeetGoalChecked(checked);
    },
    []
  );

  const handleBackClick = useCallback(() => {
    router.push("/settings");
  }, [router]);

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
              <Typography variant="subtitle1">Meet Goal Reminder</Typography>
              <Typography variant="body1">
                No activity in more than a week
              </Typography>
            </div>
            <Switch onChange={switchMeetGoal} checked={meetGoalChecked} />
          </div>
        </div>
      </div>
      <div className="mt-6 space-y-2">
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
          General
        </Typography>
        <div className="flex justify-between">
          <div>
            <Typography variant="subtitle1">Update time</Typography>
            <Typography variant="body1">
              Set time to receive nofitications
            </Typography>
          </div>
          {/* <input
            type="time"
            id="updateTime"
            name="updateTime"
            value={"18:00"}
          /> */}
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: 600, color: "#38ACE2" }}
          >
            6:00 PM
          </Typography>
        </div>
      </div>
    </main>
  );
}
