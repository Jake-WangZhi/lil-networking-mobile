import { Action, ActionType } from "@/types";
import { ArrowRight } from "react-feather";
import Link from "next/link";

interface Props {
  action: Action;
  actionType: ActionType;
}

export const ActionCard = ({ action, actionType }: Props) => {
  return (
    <Link href="/dashboard">
      <div className="bg-white bg-opacity-5 p-4 mb-4 hover:bg-opacity-[0.08] active:bg-opacity-10 rounded-lg">
        <div className="flex flex-col">
          <div className="flex justify-between">
            <h2>{action.contactName}</h2>
            <ArrowRight />
          </div>
          <div className="text-sm font-normal text-white text-opacity-70">
            {action?.contactCategory} • Goal: {action?.goalDays} days
          </div>
          <div
            className={`text-sm font-semibold
              ${actionType === "past" ? "text-light-yellow" : "text-light-blue"}
              `}
          >
            {action.days} Days ago
          </div>
          <p className="line-clamp-2 overflow-hidden">{action.note}</p>
        </div>
      </div>
    </Link>
  );
};
