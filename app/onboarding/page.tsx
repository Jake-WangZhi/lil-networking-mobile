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
import Link from "next/link";

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
    <button
      onClick={() => swiper.slideNext()}
      className="text-white text-sm md:text-base lg:text-lg"
    >
      {children}
    </button>
  );
};

export default function Page() {
  return (
    <main className="relative min-h-screen">
      <Link
        href={"/dashboard"}
        className="absolute right-4 top-4 z-10 text-white text-xl md:text-2xl"
      >
        Skip
      </Link>
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
              <Button variant="primary" onClick={() => {}}>
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
              <Button variant="primary" onClick={() => {}}>
                {"I'm ready"}
              </Button>
            }
            textButton={
              <Link
                href={"/dashboard"}
                className="text-white text-sm md:text-base lg:text-lg"
              >
                Go to Dashboard
              </Link>
            }
          />
        </SwiperSlide>
      </Swiper>
    </main>
  );
}
