import { Action, ActionType } from "@/types";
import { ArrowRight } from "react-feather";
import { Card, CardActionArea, CardContent, Typography } from "@mui/material";

interface Props {
  action: Action;
  actionType: ActionType;
}

export const ActionCard = ({ action, actionType }: Props) => {
  return (
    <Card
      sx={{
        backgroundColor: "rgba(255, 255, 255, 0.05)",
        borderRadius: "8px",
      }}
    >
      <CardActionArea>
        <CardContent>
          <div className="flex justify-between text-white">
            <Typography
              variant="subtitle1"
              className="font-semibold overflow-hidden break-words"
            >
              {action.contactFirstName} {action.contactLastName}
            </Typography>
            <ArrowRight
              size={24}
              className="md:w-6 md:h-6 lg:w-8 lg:h-8 flex-shrink-0"
            />
          </div>
          <Typography
            variant="body1"
            className="opacity-70 overflow-hidden break-words"
          >
            {action.contactIndustry && <>{action.contactIndustry} • </>}
            Goal: {action.goalDays} days
          </Typography>
          <Typography
            variant="body1"
            className={`font-semibold ${
              actionType === "past" ? "text-magenta" : "text-light-yellow"
            }`}
          >
            {action.days} Days ago
          </Typography>
          <Typography variant="body1" className="line-clamp-2 overflow-hidden">
            {action.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
