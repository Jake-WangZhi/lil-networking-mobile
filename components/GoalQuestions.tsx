import { Typography } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import { Button } from "./Button";

interface ButtonContent {
  label: string;
  value: number;
}

interface Props {
  title: string;
  setValue: Dispatch<SetStateAction<number>>;
  selectedValue: number;
  buttonContents: ButtonContent[];
}

export const GoalQuestions = ({
  title,
  setValue,
  selectedValue,
  buttonContents,
}: Props) => {
  return (
    <div className="h-[70vh] flex flex-col justify-center items-center">
      <Typography
        variant="h3"
        sx={{ fontWeight: 600, textAlign: "center", mb: "24px" }}
      >
        {title}
      </Typography>
      <div className="space-y-4">
        {buttonContents.map(({ label, value }, index) => {
          return (
            <div key={`answer-${index}`} className="flex justify-center">
              <Button
                variant="outlined"
                sx={{
                  width: "294px",
                  border:
                    selectedValue === value ? "1px solid #38ACE2" : "none",
                  color: selectedValue === value ? "#38ACE2" : "white",
                }}
                onClick={() => setValue(value)}
              >
                {label}
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
