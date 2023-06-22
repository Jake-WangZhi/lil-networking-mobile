"use client";

import { Typography } from "@mui/material";
import { ReactNode, useCallback, useMemo, useState } from "react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Button } from "@/components/Button";
import { ChevronRight, ChevronLeft } from "react-feather";
import { ProgressBar } from "@/components/ProgressBar";
import { useGoalsMutation } from "@/hooks/useGoalsMutation";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { GoalQuestions } from "@/components/GoalQuestions";
import { SearchParams } from "@/types";

import "swiper/css";

const SwiperButtonNext = ({
  children,
  onNext,
}: {
  children: ReactNode;
  onNext: () => void;
}) => {
  const swiper = useSwiper();

  const handleNextClick = useCallback(() => {
    swiper.slideNext();
    onNext();
  }, [onNext, swiper]);

  return (
    <Button variant="contained" onClick={handleNextClick}>
      {children}
    </Button>
  );
};

const SwiperButtonBefore = ({
  children,
  onPrev,
}: {
  children: ReactNode;
  onPrev: () => void;
}) => {
  const swiper = useSwiper();

  const handlePrevClick = useCallback(() => {
    swiper.slidePrev();
    onPrev();
  }, [onPrev, swiper]);

  return (
    <Button variant="text" sx={{ px: "12px" }} onClick={handlePrevClick}>
      {children}
    </Button>
  );
};

export default function GoalsPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const isFromSettings = searchParams?.get(SearchParams.IsFromSettings);

  const [progress, setProgress] = useState(0);
  const [networkingComfortLevel, setNetworkingComfortLevel] = useState(1);
  const [goalConnections, setGoalConnections] = useState(2);
  const [goalMessages, setGoalMessages] = useState(2);
  const [errorMessage, setErrorMessage] = useState("");

  const postGoalsMutation = useGoalsMutation({
    method: "POST",
    onSuccess: () => {
      setErrorMessage("");
      if (isFromSettings) return router.push("/settings/goals");
      router.push("/dashboard");
    },
    onError: (error) => {
      setErrorMessage("An error occurred. Please try again.");
      console.log(error);
    },
  });

  const handleClick = useCallback(
    () =>
      postGoalsMutation.mutate({
        goals: {
          networkingComfortLevel,
          goalConnections,
          goalMessages,
        },
        email: session?.user?.email || "",
      }),
    [
      goalConnections,
      goalMessages,
      networkingComfortLevel,
      postGoalsMutation,
      session?.user?.email,
    ]
  );

  const GOAL_QUESTIONS = useMemo(
    () => [
      {
        title: "How comfortable are you with networking?",
        setValue: setNetworkingComfortLevel,
        selectedValue: networkingComfortLevel,
        buttonContents: [
          {
            label: "Beginner",
            value: 1,
          },
          {
            label: "Advanced",
            value: 2,
          },
          {
            label: "Power networker",
            value: 3,
          },
        ],
      },
      {
        title: "How many new contacts do you want to make per month?",
        setValue: setGoalConnections,
        selectedValue: goalConnections,
        buttonContents: [
          {
            label: "2",
            value: 2,
          },
          {
            label: "5",
            value: 5,
          },
          {
            label: "10",
            value: 10,
          },
        ],
      },
      {
        title: "How many contacts do you want to reach out to per month?",
        setValue: setGoalMessages,
        selectedValue: goalMessages,
        buttonContents: [
          {
            label: "2",
            value: 2,
          },
          {
            label: "5",
            value: 5,
          },
          {
            label: "10",
            value: 10,
          },
        ],
      },
    ],
    [goalConnections, goalMessages, networkingComfortLevel]
  );

  return (
    <main className="relative px-8 py-8">
      <ProgressBar title={"Goal"} progress={progress} />
      <div className="px-4">
        <Swiper allowTouchMove={false} spaceBetween={48}>
          {GOAL_QUESTIONS.map(
            ({ title, selectedValue, setValue, buttonContents }, index) => {
              return (
                <SwiperSlide key={`question-${index}`}>
                  <GoalQuestions
                    title={title}
                    setValue={setValue}
                    selectedValue={selectedValue}
                    buttonContents={buttonContents}
                  />
                </SwiperSlide>
              );
            }
          )}
          <SwiperSlide>
            <div className="mt-60 flex flex-col justify-center items-center">
              {errorMessage && (
                <Typography variant="subtitle2">{errorMessage}</Typography>
              )}
              <div className="mb-6 space-y-2">
                <Typography
                  variant="h2"
                  sx={{ fontWeight: 600, textAlign: "center" }}
                >
                  You’re all set to connect!
                </Typography>
                <Typography variant="body1" sx={{ textAlign: "center" }}>
                  you can edit your goals at any time.
                </Typography>
              </div>
              <div className="space-y-4">
                <div className="flex justify-center">
                  <Button
                    variant="contained"
                    onClick={handleClick}
                    sx={{
                      width: isFromSettings && "124px",
                    }}
                  >
                    {isFromSettings ? "Done" : "Go to dashboard"}
                  </Button>
                </div>
                <div className="flex justify-center">
                  <SwiperButtonBefore onPrev={() => setProgress(progress - 1)}>
                    Back
                  </SwiperButtonBefore>
                </div>
              </div>
            </div>
          </SwiperSlide>
          {progress !== 3 && (
            <div className="flex justify-between items-center">
              <div>
                {progress !== 0 && (
                  <SwiperButtonBefore onPrev={() => setProgress(progress - 1)}>
                    <ChevronLeft
                      size={16}
                      className="md:w-5 md:h-5 lg:w-6 lg:h-6"
                    />
                    Back
                  </SwiperButtonBefore>
                )}
              </div>
              <div>
                <SwiperButtonNext onNext={() => setProgress(progress + 1)}>
                  Next
                  <ChevronRight
                    size={16}
                    className="md:w-5 md:h-5 lg:w-6 lg:h-6"
                  />
                </SwiperButtonNext>
              </div>
            </div>
          )}
        </Swiper>
      </div>
    </main>
  );
}
