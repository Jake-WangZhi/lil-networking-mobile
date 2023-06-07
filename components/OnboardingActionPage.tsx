import { Typography } from "@mui/material";
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-dark-blue space-y-6">
      <Typography variant="h2">{title}</Typography>
      <div className="flex flex-col items-center space-y-4">
        {actionButton}
        {textButton}
      </div>
    </div>
  );
};
