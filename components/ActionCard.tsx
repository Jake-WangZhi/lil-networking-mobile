import { Action, ActionType } from "@/types";
import { ArrowRight } from "react-feather";
import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import Link from "next/link";

interface Props {
  action: Action;
  actionType: ActionType;
}

export const ActionCard = ({ action, actionType }: Props) => {
  return (
    <Card>
      <CardActionArea>
        <CardContent>
          <Link href={`/contacts/${action.contactId}/message`}>
            <div className="flex justify-between text-white">
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 600,
                }}
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
              sx={{
                opacity: 0.7,
              }}
            >
              {action.contactIndustry && <>{action.contactIndustry} • </>}
              Goal: {action.goalDays} days
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontWeight: 600,
                color: actionType === "past" ? "#ED3293" : "#FFCF79",
              }}
            >
              {`${action.days} Days ago`}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                overflow: "hidden",
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 2,
              }}
            >
              {action.description}
            </Typography>
          </Link>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
