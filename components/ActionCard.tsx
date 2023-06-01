import { Action, ActionType } from "@/types";
import { ArrowRight } from "react-feather";
import Link from "next/link";
import Ripples from "react-ripples";

interface Props {
  action: Action;
  actionType: ActionType;
}

export const ActionCard = ({ action, actionType }: Props) => {
  return (
    <Ripples
      color="rgba(255, 255, 255, 0.1)"
      className="w-full rounded-lg overflow-hidden"
    >
      <Link href="/dashboard" className="w-full">
        <div className="bg-white bg-opacity-5 p-4 hover:bg-opacity-[0.08] rounded-lg">
          <div className="flex justify-between">
            <h2 className="md:text-xl lg:text-2xl overflow-hidden break-words">
              {action.contactFirstName} {action.contactLastName}
            </h2>
            <ArrowRight className="md:w-6 md:h-6 lg:w-8 lg:h-8 flex-shrink-0" />
          </div>
          <div className="text-sm font-normal text-white text-opacity-70 md:text-base lg:text-lg overflow-hidden break-words">
            {action.contactIndustry && <>{action.contactIndustry} • </>}
            Goal: {action.goalDays} days
          </div>
          <div
            className={`text-sm md:text-base lg:text-lg font-semibold
              ${actionType === "past" ? "text-magenta" : "text-light-yellow"}
              `}
          >
            {action.days} Days ago
          </div>
          <p className="text-sm md:text-base lg:text-lg line-clamp-2 overflow-hidden">
            {action.description}
          </p>
        </div>
      </Link>
    </Ripples>
  );
};
