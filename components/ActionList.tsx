import FoldableComponent from "./FoldableComponent";
import { Action, ActionType } from "@/types";
import { ClipLoader } from "react-spinners";
import { ActionCard } from "./ActionCard";
import { Info } from "react-feather";

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
      <div className="flex items-center justify-center text-base text-red-400 mt-5 md:text-lg lg:text-xl">
        Something went wrong, please try again later
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center mt-5">
        <ClipLoader color="#38ACE2" size={150} />
      </div>
    );
  }

  return (
    <div className="w-full mb-20 mt-5">
      <FoldableComponent
        title={
          <div className="flex items-center space-x-2">
            <div className="w-1 h-4 border-l-4 border-magenta md:border-l-5 md:h-5 lg:border-l-6 lg:h-6"></div>
            <h2 className="md:text-xl lg:text-2xl">{`Past Due (${actions?.pastActions?.length})`}</h2>
            <Info
              size={16}
              opacity={0.7}
              className="md:w-5 md:h-5 lg:w-6 lg:h-6"
            />
          </div>
        }
        content={
          <div className="space-y-4">
            {actions?.pastActions?.map((action, index) => (
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
            <h2 className="md:text-xl lg:text-2xl">{`New Action Items (${actions?.upcomingActions?.length})`}</h2>
            <Info
              size={18}
              opacity={0.7}
              className="md:w-5 md:h-5 lg:w-6 lg:h-6"
            />
          </div>
        }
        content={
          <div className="space-y-4">
            {actions?.upcomingActions?.map((action, index) => (
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
