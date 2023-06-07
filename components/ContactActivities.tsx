import { useActivityMutation } from "@/hooks/useActivityMutation";
import { Activity, ActivityType } from "@/types";
import { Circle, PlusCircle, Trash2 } from "react-feather";
import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Typography } from "@mui/material";
import { Button } from "./Button";

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
        <Typography variant="subtitle2" className="flex justify-center">
          {errorMessage}
        </Typography>
      )}
      <div className="flex items-center justify-between mb-3">
        <Typography variant="subtitle1">Activites</Typography>
        <Button
          onClick={() => {
            setIsActivityPageOpen(true);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          variant="text"
          customStyles={{
            display: "flex",
            alignItems: "center",
            gap: "4px",
            py: "12px",
          }}
        >
          <PlusCircle size={24} />
          <Typography variant="body1" className="font-semibold">
            Log Activity
          </Typography>
        </Button>
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
            <div className="bg-white bg-opacity-5 w-full ml-6 p-4 text-white rounded-lg overflow-hidden break-words">
              <div className="flex justify-between">
                <Typography variant="subtitle1" className="font-semibold">
                  {activity.title}
                </Typography>
                {activity.type === ActivityType.USER && (
                  <Button variant="text" onClick={() => handleDelete(activity)}>
                    <Trash2 size={24} />
                  </Button>
                )}
              </div>
              <Typography variant="body1" className="opacity-[0.7] mb-2">
                {activity.date}
              </Typography>
              <Typography variant="body1">{activity.description}</Typography>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};