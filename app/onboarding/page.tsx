"use client";

import { OnboardingIntroPage } from "@/components/OnboardingIntroPage";
import { OnboardingActionPage } from "@/components/OnboardingActionPage";
import pic1 from "@/public/images/onboarding_pic1.svg";
import pic2 from "@/public/images/onboarding_pic2.svg";
import pic3 from "@/public/images/onboarding_pic3.svg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperRef } from "swiper";
import { Button } from "@/components/Button";
import { useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { urlBase64ToUint8Array } from "@/lib/utils";
import { useSubscriptionMutation } from "@/hooks/useSubscription";
import { useSession } from "next-auth/react";
import { Subscription } from "@/types";

import "swiper/css";

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
      }

      nextButtonRef.current?.click();
    }
  }, [postSubscriptionMutation, session?.user?.email]);

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
              <Button variant="contained" onClick={handleNotificationClick}>
                Allow notifications
              </Button>
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
