import { useActivityMutation } from "@/hooks/useActivityMutation";
import { Activity, ActivityType } from "@/types";
import { Circle, PlusCircle, Trash2 } from "react-feather";
import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

interface Props {
  activities: Activity[];
  setIsActivityPageOpen: Dispatch<SetStateAction<boolean>>;
}

export const ContactActivites = ({
  activities,
  setIsActivityPageOpen,
}: Props) => {
  const queryClient = useQueryClient();
  const [errorMessage, setErrorMessage] = useState("");

  const deleteActivityMutation = useActivityMutation({
    method: "DELETE",
    onSuccess: () => {
      setErrorMessage("");
      queryClient.refetchQueries(["contact", activities?.[0].contactId]);
    },
    onError: (error) => {
      setErrorMessage("An error occurred. Please try again.");
      console.log(error);
    },
  });

  const handleDelete = useCallback(
    (activity: Activity) => {
      deleteActivityMutation.mutate(activity);
    },
    [deleteActivityMutation]
  );

  return (
    <div>
      {errorMessage && (
        <div className="text-red-500 flex justify-center">{errorMessage}</div>
      )}
      <div className="flex justify-between mb-3">
        <div className="text-base md:text-lg lg:text-xl">Activites</div>
        <button
          type="button"
          className="flex items-center space-x-1"
          onClick={() => {
            setIsActivityPageOpen(true);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <PlusCircle size={24} />
          <div className="text-sm md:text-base lg:text-lg">Log Activity</div>
        </button>
      </div>
      {activities?.map((activity, index) => (
        <div key={`activity-${index}`}>
          <Circle
            size={16}
            fill="#38ACE2"
            color="#38ACE2"
            className="absolute bg-dark-blue w-4 h-7 flex items-center -mt-2"
          />
          <div
            className={`flex pb-4 ml-[7px] bg-dark-blue ${
              index + 1 !== activities?.length &&
              "border-l-2 border-light-blue border-dashed"
            }`}
          >
            <div className="bg-white bg-opacity-5 w-full ml-6 p-4 text-white rounded-lg">
              <div className="flex justify-between">
                <div className="text-base md:text-lg lg:text-xl font-semibold">
                  {activity.title}
                </div>
                {activity.type === ActivityType.USER && (
                  <button type="button" onClick={() => handleDelete(activity)}>
                    <Trash2 size={24} />
                  </button>
                )}
              </div>
              <div className="text-sm md:text-base lg:text-lg opacity-[0.7] mb-2">
                {activity.date}
              </div>
              <div className="text-sm md:text-base lg:text-lg">
                {activity.description}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
