"use client";

import { Typography } from "@mui/material";
import { ReactNode, useCallback, useMemo, useState } from "react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";
import { Button } from "@/components/Button";
import { ChevronRight, ChevronLeft } from "react-feather";
import { ProgressBar } from "@/components/ProgressBar";
import { useGoalsMutation } from "@/hooks/useGoalsMutation";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { GoalQuestions } from "@/components/GoalQuestions";

const SwiperButtonNext = ({
  children,
  onNext,
}: {
  children: ReactNode;
  onNext: () => void;
}) => {
  const swiper = useSwiper();

  return (
    <Button
      variant="contained"
      onClick={() => {
        swiper.slideNext();
        onNext();
      }}
    >
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

  return (
    <Button
      variant="text"
      sx={{ p: "12px" }}
      onClick={() => {
        swiper.slidePrev();
        onPrev();
      }}
    >
      {children}
    </Button>
  );
};

export default function GoalsPage() {
  const router = useRouter();
  const { data: session } = useSession();

  const [progress, setProgress] = useState(0);
  const [networkingComfortLevel, setNetworkingComfortLevel] = useState(1);
  const [goalConnections, setGoalConnections] = useState(2);
  const [goalMessages, setGoalMessages] = useState(2);
  const [errorMessage, setErrorMessage] = useState("");

  const postGoalsMutation = useGoalsMutation({
    method: "POST",
    onSuccess: () => {
      setErrorMessage("");
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
                  <Button variant="contained" onClick={handleClick}>
                    Go to dashboard
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
                    <ChevronLeft />
                    Back
                  </SwiperButtonBefore>
                )}
              </div>
              <div>
                <SwiperButtonNext onNext={() => setProgress(progress + 1)}>
                  Next
                  <ChevronRight />
                </SwiperButtonNext>
              </div>
            </div>
          )}
        </Swiper>
      </div>
    </main>
  );
}
