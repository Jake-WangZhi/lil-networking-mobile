import { Button } from "@/components/Button";
import { Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { Check, Archive } from "react-feather";
import { useContactMutation } from "@/hooks/useContactMutation";
import { Contact } from "@/types";
import { AlertDialog } from "./AlertDialog";

interface Props {
  contact: Contact;
}

export const MessageActions = ({ contact }: Props) => {
  const router = useRouter();

  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const updateContactMutation = useContactMutation({
    method: "PUT",
    onSuccess: () => {
      setErrorMessage("");
      router.push("/dashboard");
    },
    onError: (error) => {
      setErrorMessage("An error occurred. Please try again.");
      console.log(error);
    },
  });

  const handleArchiveClick = useCallback(() => {
    setIsAlertOpen(true);
  }, []);

  const handleClick = useCallback(() => {
    updateContactMutation.mutate({
      ...contact,
      isArchived: true,
    });

    setIsAlertOpen(false);
  }, [contact, updateContactMutation]);

  return (
    <>
      {errorMessage && (
        <Typography variant="subtitle2" sx={{ textAlign: "center" }}>
          {errorMessage}
        </Typography>
      )}
      <div className="flex justify-center space-x-12">
        <Button
          variant="text"
          sx={{
            flexDirection: "column",
            alignItems: "center",
            px: "24px",
            py: "10px",
          }}
        >
          <div className="w-12 h-12 bg-light-blue rounded-full flex justify-center items-center mb-1">
            <Check size={24} color="#0F1A24" />
          </div>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            Done
          </Typography>
        </Button>
        <Button
          variant="text"
          sx={{
            flexDirection: "column",
            alignItems: "center",
            px: "24px",
            py: "10px",
          }}
          onClick={handleArchiveClick}
        >
          <div className="w-12 h-12 bg-white bg-opacity-5 rounded-full flex justify-center items-center mb-1">
            <Archive size={24} />
          </div>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            Archive
          </Typography>
        </Button>
      </div>
      <AlertDialog
        isOpen={isAlertOpen}
        setIsOpen={setIsAlertOpen}
        title={`Are you sure to you want to archive this contact?`}
        description={"Archiving this contact will remove them the dashboard."}
        actionButton={
          <Button
            variant="contained"
            onClick={handleClick}
            sx={{
              zIndex: 10,
              width: "221px",
              color: "#0F1A24 !important",
              backgroundColor: "#38ACE2 !important",
            }}
          >
            Allow
          </Button>
        }
      />
    </>
  );
};
