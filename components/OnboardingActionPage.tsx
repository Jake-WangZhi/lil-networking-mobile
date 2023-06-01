import { ReactNode } from "react";

interface Props {
  title: string;
  actionButton?: ReactNode;
  textButton?: ReactNode;
}

export const OnboardingActionPage = ({
  title,
  actionButton,
  textButton,
}: Props) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-dark-blue">
      <h1 className="mb-12 font-semibold text-3xl text-white md:text-5xl">
        {title}
      </h1>
      <div className="flex flex-col items-center space-y-5">
        {actionButton}
        {textButton}
      </div>
    </div>
  );
};
