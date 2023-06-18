import { useActivityMutation } from "@/hooks/useActivityMutation";
import { Activity, ActivityType } from "@/types";
import { Circle, PlusCircle, Trash2 } from "react-feather";
import { useCallback, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, Typography } from "@mui/material";
import { Button } from "./Button";
import { useRouter } from "next/navigation";

interface Props {
  activities: Activity[];
}

export const ContactActivites = ({ activities }: Props) => {
  const queryClient = useQueryClient();
  const router = useRouter();
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

  const handleDeleteClick = useCallback(
    (activity: Activity) => () => {
      deleteActivityMutation.mutate(activity);
    },
    [deleteActivityMutation]
  );

  const handlePlusClick = useCallback(
    () => router.push(`/contacts/${activities[0].contactId}/activities/create`),
    [activities, router]
  );

  return (
    <div className="mb-12 mx-4">
      {errorMessage && (
        <Typography
          variant="subtitle2"
          sx={{ display: "flex", justifyContent: "center" }}
        >
          {errorMessage}
        </Typography>
      )}
      <div className="flex items-center justify-between mb-3">
        <Typography variant="subtitle1">Activites</Typography>
        <Button
          onClick={handlePlusClick}
          variant="text"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "4px",
            py: "12px",
            px: "8px",
          }}
        >
          <PlusCircle size={24} />
          <Typography variant="body1" sx={{ fontWeight: 600 }}>
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
            <Card sx={{ ml: "24px" }}>
              <CardContent>
                <div className="flex justify-between">
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: 600,
                    }}
                  >
                    {activity.title}
                  </Typography>
                  {activity.type === ActivityType.USER && (
                    <div className="flex items-start">
                      <Button
                        variant="text"
                        onClick={handleDeleteClick(activity)}
                      >
                        <Trash2 size={24} />
                      </Button>
                    </div>
                  )}
                </div>
                <Typography
                  variant="body1"
                  sx={{ opacity: 0.7, marginBottom: "8px" }}
                >
                  {activity.date}
                </Typography>
                <Typography variant="body1">{activity.description}</Typography>
              </CardContent>
            </Card>
          </div>
        </div>
      ))}
    </div>
  );
};
