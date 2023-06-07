import { FoldableComponent } from "./FoldableComponent";
import { Action, ActionType } from "@/types";
import { ClipLoader } from "react-spinners";
import { ActionCard } from "./ActionCard";
import { Typography } from "@mui/material";

interface Props {
  actions?: {
    pastActions: Array<Action>;
    upcomingActions: Array<Action>;
  };
  isLoading: boolean;
  isError: boolean;
}

export const ActionList = ({ actions, isLoading, isError }: Props) => {
  if (isError) {
    return (
      <Typography
        variant="h2"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "32px",
          color: "#F42010",
        }}
      >
        Something went wrong, please try again later
      </Typography>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center mt-5">
        <ClipLoader color="#38ACE2" size={150} />
      </div>
    );
  }

  if (!actions) {
    return (
      <Typography
        variant="h2"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "32px",
          color: "#F42010",
        }}
      >
        No actions available
      </Typography>
    );
  }

  return (
    <div className="w-full mb-20 mt-5">
      <FoldableComponent
        title={
          <div className="flex items-center space-x-2">
            <div className="w-1 h-4 border-l-4 border-magenta md:border-l-5 md:h-5 lg:border-l-6 lg:h-6"></div>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 600,
              }}
            >{`Past Due (${actions.pastActions.length})`}</Typography>
          </div>
        }
        content={
          <div className="space-y-4">
            {actions.pastActions?.map((action, index) => (
              <ActionCard
                key={index}
                action={action}
                actionType={ActionType.Past}
              />
            ))}
          </div>
        }
      />
      <FoldableComponent
        title={
          <div className="flex items-center space-x-2">
            <div className="w-1 h-4 border-l-4 border-light-yellow md:border-l-5 md:h-5 lg:border-l-6 lg:h-6"></div>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 600,
              }}
            >{`New Action Items (${actions.upcomingActions?.length})`}</Typography>
          </div>
        }
        content={
          <div className="space-y-4">
            {actions.upcomingActions?.map((action, index) => (
              <ActionCard
                key={index}
                action={action}
                actionType={ActionType.Upcoming}
              />
            ))}
          </div>
        }
      />
    </div>
  );
};
