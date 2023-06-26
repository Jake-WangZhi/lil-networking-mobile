"use client";

import { ActionList } from "@/components/ActionList";
import { GoalSummary } from "@/components/GoalSummary";
import { useSession } from "next-auth/react";
import { useActions } from "@/hooks/useActions";
import { Typography } from "@mui/material";
import { PlusSquare } from "react-feather";
import { Button } from "@/components/Button";
import { InfoTooltipButton } from "@/components/InfoTooltipButton";
import { NavFooter } from "@/components/NavFooter";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import { useSubscriptionMutation } from "@/hooks/useSubscription";
import { Subscription } from "@/types";

export default function DashboardPage() {
  const { data: session } = useSession();
  const router = useRouter();

  const { actions, isLoading, isError } = useActions({
    email: session?.user?.email,
  });

  const handlePlusClick = useCallback(
    () => router.push("/contacts/create"),
    [router]
  );

  //const button = document.getElementById("notifications");
  // button?.addEventListener("click", () => {
  //   if ("Notification" in window) {
  //     Notification.requestPermission().then((result) => {
  //       if (result === "granted") {
  //         const options = {
  //           body: "body",
  //         };
  //         const notification = new Notification("Hi there!", options);
  //       } else {
  //         // Fallback for browsers that don't support notifications
  //         // Replace with an appropriate alternative, such as showing a message in the UI
  //         alert("Notifications not granted");
  //       }
  //     });
  //   } else {
  //     // Fallback for browsers that don't support the Notification API
  //     // Replace with an appropriate alternative, such as showing a message in the UI
  //     alert("Notifications not supported");
  //   }
  // });

  // if ("serviceWorker" in navigator) {
  //   const registration = await navigator.serviceWorker.register(
  //     "/serviceworker.js"
  //   );
  // }

  const postSubscriptionMutation = useSubscriptionMutation({
    method: "POST",
    onSuccess: () => {},
    onError: () => {},
  });

  function urlBase64ToUint8Array(base64String: string) {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, "+")
      .replace(/_/g, "/");

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }

    return outputArray;
  }

  useEffect(() => {
    const requestPermission = async () => {
      // A service worker must be registered in order to send notifications on iOS
      const registration = await navigator.serviceWorker.register(
        "serviceworker.js",
        {
          scope: "./",
        }
      );

      // registration.pushManager.getSubscription().then(function (subscription) {
      //   if (subscription) {
      //     subscription
      //       .unsubscribe()
      //       .then(function (successful) {
      //         // Unsubscription successful
      //       })
      //       .catch(function (error) {
      //         // Error occurred during unsubscription
      //       });
      //   }
      // });

      const button = document.getElementById("notifications");
      button?.addEventListener("click", async () => {
        // Triggers popup to request access to send notifications
        const result = await window.Notification.requestPermission();

        // If the user rejects the permission result will be "denied"
        if (result === "granted") {
          // You must use the service worker notification to show the notification
          // Using new Notification("Hello World", { body: "My first notification on iOS"}) does not work on iOS
          // despite working on other platforms
          const subscribeOptions = {
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(
              "BJwry9RH4YFm5VlomSOFS0hsKswCGGvOlvdvZRfNHv-UEjwk3lmJDPKdlKSPxwWvEgnkHPlH680563ppCeXQSBs"
            ),
          };

          registration.pushManager
            .subscribe(subscribeOptions)
            .then((pushSubscription) => {
              console.log(
                "Received PushSubscription: ",
                pushSubscription.toJSON()
              );

              return postSubscriptionMutation.mutate({
                email: session?.user?.email || "",
                subscription: pushSubscription.toJSON() as Subscription,
              });
            });
        }
      });
    };

    requestPermission();
  }, []);

  return (
    <main className="relative flex flex-col items-center text-white px-4">
      <div className="sticky top-0 w-full bg-dark-blue z-10 pt-8">
        <div className="flex justify-between items-center">
          <Button id="notifications">Test</Button>
          <Button
            onClick={async () => {
              await fetch("/api/notification", {
                method: "get",
                headers: {
                  "Content-Type": "application/json",
                },
              });
            }}
          >
            Get
          </Button>
          <Typography variant="h1">
            Hi, {session?.user?.name?.split(" ")[0]}!
          </Typography>
          <div className="flex items-center space-x-2">
            <InfoTooltipButton />
            <Button variant="text" onClick={handlePlusClick} sx={{ px: "8px" }}>
              <PlusSquare
                size={32}
                color={"#38ACE2"}
                className="md:w-10 md:h-10 lg:w-12 lg:h-12"
              />
            </Button>
          </div>
        </div>
        <GoalSummary />
      </div>
      <ActionList actions={actions} isLoading={isLoading} isError={isError} />
      <NavFooter />
    </main>
  );
}
