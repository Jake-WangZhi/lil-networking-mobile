import { Typography } from "@mui/material";
import { GoalStats } from "./GoalStats";
import { useSession } from "next-auth/react";
import { useGoals } from "@/hooks/useGoals";
import { Button } from "./Button";
import { PlusCircle } from "react-feather";
import { useRouter } from "next/navigation";
import { ClipLoader } from "react-spinners";
import { useCallback } from "react";

export const GoalSummary = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const { goals, isLoading, isError } = useGoals({
    email: session?.user?.email,
  });

  const handleClick = useCallback(() => router.push("/goals"), [router]);

  if (isError) {
    return (
      <Typography
        variant="body1"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#F42010",
          marginTop: "24px",
          marginBottom: "4px",
          width: "100%",
          backgroundColor: "rgba(255, 255, 255, 0.05) !important",
          borderRadius: "12px",
          height: "140px",
        }}
      >
        Something went wrong, please try again later
      </Typography>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center mt-6 mb-1 w-full bg-white bg-opacity-5 rounded-xl h-[140px]">
        <ClipLoader color="#38ACE2" size={50} />
      </div>
    );
  }

  return (
    <div className="mt-6 mb-1">
      {goals ? (
        <div className="w-full bg-white bg-opacity-5 rounded-xl p-[10px]">
          <Typography
            variant="subtitle2"
            sx={{ color: "white", fontWeight: 600 }}
          >
            {new Date().toLocaleString("default", { month: "long" })}{" "}
            {new Date().getFullYear()}
          </Typography>
          <div className="px-[6px] pt-[14px] pb-6">
            <GoalStats goals={goals} />
          </div>
        </div>
      ) : (
        <Button
          variant="text"
          onClick={handleClick}
          sx={{
            width: "100%",
            gap: "4px",
            border: "1px dashed rgba(255, 255, 255, 0.7)",
            borderRadius: "12px",
            height: "140px",
            backgroundColor: "rgba(255, 255, 255, 0.05) !important",
            "&:hover": {
              border: "1px dashed rgba(255, 255, 255, 0.7)",
              borderRadius: "12px",
            },
          }}
        >
          <PlusCircle />
          Add Goal
        </Button>
      )}
    </div>
  );
};
