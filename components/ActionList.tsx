import { FoldableComponent } from "./FoldableComponent";
import { Action, ActionType } from "@/types";
import { ClipLoader } from "react-spinners";
import { ActionCard } from "./ActionCard";
import { Typography } from "@mui/material";
import Image from "next/image";
import icon from "@/public/images/empty_state_icon.svg";
import Lottie from "react-lottie";
import animationData from "../lottie/908-add-and-save.json";

interface Props {
  actions?: {
    pastActions: Array<Action>;
    upcomingActions: Array<Action>;
    hasContacts: boolean;
  };
  isLoading: boolean;
  isError: boolean;
}

export const ActionList = ({ actions, isLoading, isError }: Props) => {
  if (isError) {
    return (
      <Typography
        variant="h3"
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
      <div className="h-[50vh] flex items-center justify-center mt-5">
        <ClipLoader color="#38ACE2" size={150} />
      </div>
    );
  }

  if (!actions) {
    return (
      <Typography
        variant="h3"
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

  if (!actions.hasContacts) {
    return (
      <div className="h-[50vh] flex flex-col items-center justify-center px-8">
        <Lottie
          options={{
            loop: false,
            autoplay: true,
            animationData: animationData,
            rendererSettings: {
              preserveAspectRatio: "xMidYMid slice",
            },
          }}
          width={130}
          height={130}
        />
        <Typography variant="h2">Your Dashboard is empty</Typography>{" "}
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: 600, textAlign: "center" }}
        >
          Add contacts and all actionable items will show up here.
        </Typography>
      </div>
    );
  }

  if (actions.pastActions.length === 0 && actions.upcomingActions.length === 0)
    return (
      <div className="h-[50vh] flex flex-col items-center justify-center px-8">
        <Image src={icon} alt={"empty state"} />
        <Typography variant="h2">You Rock!</Typography>
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: 600, textAlign: "center" }}
        >
          Have you met anyone new? Add more contacts and continue growing your
          network.
        </Typography>
      </div>
    );

  return (
    <div className="w-full mb-20 mt-5 space-y-6">
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
