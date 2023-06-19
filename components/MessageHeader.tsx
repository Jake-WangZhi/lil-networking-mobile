import { Grid, Typography } from "@mui/material";
import { Button } from "@/components/Button";
import { ChevronLeft } from "react-feather";
import { useRouter } from "next/navigation";
import { useBackPath } from "@/contexts/BackPathContext";
import { useCallback } from "react";

interface Props {
  firstName: string;
  contactId: string;
}

export const MessageHeader = ({ firstName, contactId }: Props) => {
  const router = useRouter();
  const { backPath } = useBackPath();

  const handleBackClick = useCallback(() => {
    if (backPath === "/contacts") {
      router.back();
    } else {
      router.push("/dashboard");
    }
  }, [router, backPath]);

  const handleViewProfileClick = useCallback(() => {
    router.push(`/contacts/${contactId}`);
  }, [contactId, router]);

  return (
    <div className="mb-4">
      <Grid container alignItems="center">
        <Grid item xs={2}>
          <Button variant="text" onClick={handleBackClick} sx={{ py: "6px" }}>
            <ChevronLeft
              size={36}
              className="md:w-11 md:h-11 lg:w-13 lg:h-13"
            />
          </Button>
        </Grid>
        <Grid item xs={8} sx={{ display: "flex", justifyContent: "center" }}>
          <Typography
            variant="h3"
            sx={{ fontWeight: 600 }}
          >{`Connect with ${firstName}`}</Typography>
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
      {backPath !== "/contacts" && (
        <div className="flex justify-center">
          <Button
            variant="text"
            onClick={handleViewProfileClick}
            sx={{
              py: "12px",
            }}
          >
            <Typography variant="subtitle1" sx={{ opacity: 0.7 }}>
              View profile
            </Typography>
          </Button>
        </div>
      )}
    </div>
  );
};
