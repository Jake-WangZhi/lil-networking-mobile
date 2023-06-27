"use client";

import { OnboardingIntroPage } from "@/components/OnboardingIntroPage";
import { OnboardingActionPage } from "@/components/OnboardingActionPage";
import pic1 from "@/public/images/onboarding_pic1.svg";
import pic2 from "@/public/images/onboarding_pic2.svg";
import pic3 from "@/public/images/onboarding_pic3.svg";

import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperRef } from "swiper";

import "swiper/css";

import { Button } from "@/components/Button";
import { useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { urlBase64ToUint8Array } from "@/lib/utils";
import { useSubscriptionMutation } from "@/hooks/useSubscription";
import { useSession } from "next-auth/react";
import { Subscription } from "@/types";

const ONBOARDING_INTRO_PAGES = [
  {
    title: "Set Goals",
    description:
      "The Lil Networking app will help you set goals that best fit your needs when it comes to your career.",
    image: pic1,
  },
  {
    title: "Build Relationships",
    description:
      "Build new and existing relationships by staying up to date on their work and interests.",
    image: pic2,
  },
  {
    title: "Stay Connected",
    description:
      "Set notifications to help remind you when to reach out to connections.",
    image: pic3,
  },
];

export default function OnboardingPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const swiperRef = useRef<SwiperRef>();
  const nextButtonRef = useRef<HTMLButtonElement>(null);

  const postSubscriptionMutation = useSubscriptionMutation({
    method: "POST",
    onSuccess: () => {},
    onError: () => {},
  });

  let registration: ServiceWorkerRegistration;

  useEffect(() => {
    const requestPermission = async () => {
      if ("serviceWorker" in navigator) {
        registration = await navigator.serviceWorker.register(
          "serviceworker.js",
          {
            scope: "./",
          }
        );
      }
    };

    requestPermission();
  }, []);

  const handleSetGoalsClick = useCallback(
    () => router.push("/goals"),
    [router]
  );

  const handleSkipClick = useCallback(
    () => router.push("/dashboard"),
    [router]
  );

  const handleNextClick = useCallback(() => swiperRef.current?.slideNext(), []);

  const handleNotificationClick = useCallback(async () => {
    if ("Notification" in window) {
      // Triggers popup to request access to send notifications
      const result = await window.Notification.requestPermission();

      // If the user rejects the permission result will be "denied"
      if (result === "granted") {
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

            postSubscriptionMutation.mutate({
              email: session?.user?.email || "",
              subscription: pushSubscription.toJSON() as Subscription,
            });
          });
      }

      nextButtonRef.current?.click();
    }
  }, []);

  return (
    <main className="relative">
      <Swiper
        allowTouchMove={false}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
      >
        {ONBOARDING_INTRO_PAGES.map((page, index) => (
          <SwiperSlide key={index}>
            <OnboardingIntroPage
              title={page.title}
              description={page.description}
              image={page.image}
              addImgPadding={index === 1}
              handleNextClick={handleNextClick}
            />
          </SwiperSlide>
        ))}
        <SwiperSlide>
          <OnboardingActionPage
            title="Stay Informed"
            actionButton={
              <>
                <Button
                  variant="contained"
                  id="notifications"
                  onClick={handleNotificationClick}
                >
                  Allow notifications
                </Button>
              </>
            }
            textButton={
              <Button
                variant="text"
                onClick={handleNextClick}
                sx={{
                  width: "172px",
                }}
              >
                Not now
              </Button>
            }
          />
          <button ref={nextButtonRef} onClick={handleNextClick} />;
        </SwiperSlide>
        <SwiperSlide>
          <OnboardingActionPage
            title="Ready to set a goal?"
            actionButton={
              <Button
                variant="contained"
                onClick={handleSetGoalsClick}
                sx={{ width: "172px" }}
              >
                {"I'm ready"}
              </Button>
            }
            textButton={
              <Button
                variant="text"
                onClick={handleSkipClick}
                sx={{
                  width: "172px",
                }}
              >
                Go to Dashboard
              </Button>
            }
          />
        </SwiperSlide>
      </Swiper>
    </main>
  );
}
