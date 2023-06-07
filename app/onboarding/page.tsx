"use client";

import { OnboardingIntroPage } from "@/components/OnboardingIntroPage";
import { OnboardingActionPage } from "@/components/OnboardingActionPage";
import pic1 from "@/public/images/onboarding_pic1.svg";
import pic2 from "@/public/images/onboarding_pic2.svg";
import pic3 from "@/public/images/onboarding_pic3.svg";

import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "./styles.css";

import { Button } from "@/components/Button";
import { ReactNode } from "react";
import { useRouter } from "next/navigation";

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

const SwiperButtonNext = ({ children }: { children: ReactNode }) => {
  const swiper = useSwiper();

  return (
    <Button
      variant="text"
      onClick={() => swiper.slideNext()}
      customStyles={{
        width: "172px",
        height: "48px",
        py: "12px",
      }}
    >
      {children}
    </Button>
  );
};

export default function Page() {
  const router = useRouter();

  return (
    <main className="relative min-h-screen">
      <Button
        variant="text"
        onClick={() => router.push("/dashboard")}
        customStyles={{
          position: "absolute",
          top: "16px",
          right: "16px",
          zIndex: "10",
          color: "white",
          fontSize: "19px",
          fontWeight: 400,
          "@media (min-width: 768px)": {
            fontSize: "22px",
          },
          "@media (min-width: 1024px)": {
            fontSize: "24px",
          },
        }}
      >
        Skip
      </Button>
      <Swiper pagination={{ clickable: true }} modules={[Pagination]}>
        {ONBOARDING_INTRO_PAGES.map((page, index) => (
          <SwiperSlide key={index}>
            <OnboardingIntroPage
              title={page.title}
              description={page.description}
              image={page.image}
              addImgPadding={index === 1}
            />
          </SwiperSlide>
        ))}
        <SwiperSlide>
          <OnboardingActionPage
            title="Stay Informed"
            actionButton={
              <Button variant="contained" onClick={() => {}}>
                Allow notifications
              </Button>
            }
            textButton={<SwiperButtonNext>Not now</SwiperButtonNext>}
          />
        </SwiperSlide>
        <SwiperSlide>
          <OnboardingActionPage
            title="Ready to set a goal?"
            actionButton={
              <Button
                variant="contained"
                onClick={() => {}}
                customStyles={{ width: "172px" }}
              >
                {"I'm ready"}
              </Button>
            }
            textButton={
              <Button
                variant="text"
                onClick={() => router.push("/dashboard")}
                customStyles={{
                  width: "172px",
                  height: "48px",
                  py: "12px",
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