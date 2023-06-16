import { Grid, Typography } from "@mui/material";
import { Button } from "@/components/Button";
import { ChevronLeft } from "react-feather";
import { useBackPath } from "@/contexts/BackPathContext";
import { useRouter } from "next/navigation";

interface Props {
  firstName: string;
  contactId: string;
}

export const MessageHeader = ({ firstName, contactId }: Props) => {
  const router = useRouter();
  const { setBackPath } = useBackPath();

  return (
    <>
      <Grid container alignItems="center">
        <Grid item xs={2}>
          <Button
            variant="text"
            onClick={() => {
              router.back();
            }}
            sx={{ py: "6px" }}
          >
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
      <div className="flex justify-center mb-5">
        <Button
          variant="text"
          onClick={() => {
            router.push(`/contacts/${contactId}`);
          }}
          sx={{
            py: "12px",
          }}
        >
          <Typography variant="subtitle1" sx={{ opacity: 0.7 }}>
            View profile
          </Typography>
        </Button>
      </div>
    </>
  );
};
