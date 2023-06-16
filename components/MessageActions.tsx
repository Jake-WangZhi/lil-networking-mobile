import { Button } from "@/components/Button";
import { Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { Check, Archive } from "react-feather";
import { useContactMutation } from "@/hooks/useContactMutation";
import { ActivityType, Contact } from "@/types";
import { AlertDialog } from "./AlertDialog";
import { useSession } from "next-auth/react";
import { useActivityMutation } from "@/hooks/useActivityMutation";

interface Props {
  contact: Contact;
}

export const MessageActions = ({ contact }: Props) => {
  const router = useRouter();
  const { data: session } = useSession();

  const [isArchiveAlertOpen, setIsArchiveAlertOpen] = useState(false);
  const [isEditAlertOpen, setIsEditAlertOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const postActivityMutation = useActivityMutation({
    method: "POST",
    onSuccess: () => {
      router.push("/dashboard");
    },
    onError: (error) => {
      console.log(error);
    },
  });

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
    setIsArchiveAlertOpen(true);
  }, []);

  const handleConfirmArchiveClick = useCallback(() => {
    updateContactMutation.mutate({
      ...contact,
      isArchived: true,
    });

    setIsArchiveAlertOpen(false);
  }, [contact, updateContactMutation]);

  const handleConfirmEditClick = useCallback(() => {
    setIsEditAlertOpen(false);

    const preFilledFormData = {
      title: "Messaged",
      description: `${session?.user?.name?.split(" ")[0]} reached out to ${
        contact.firstName
      }`,
      isFromMessage: "true",
    };

    const queryParams = new URLSearchParams(preFilledFormData);

    router.push(`/contacts/${contact.id}/activities/log?${queryParams}`);
  }, [contact, updateContactMutation]);

  const handleCancelArchiveClick = useCallback(() => {
    setIsArchiveAlertOpen(false);
  }, []);

  const handleCancelEditClick = useCallback(() => {
    postActivityMutation.mutate({
      title: "Messaged",
      date: new Date().toISOString().split("T")[0],
      description: `${session?.user?.name?.split(" ")[0]} reached out to ${
        contact.firstName
      }`,
      contactId: contact.id,
      type: ActivityType.USER,
    });

    setIsEditAlertOpen(false);
  }, []);

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
          onClick={() => setIsEditAlertOpen(true)}
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
        isOpen={isArchiveAlertOpen}
        setIsOpen={setIsArchiveAlertOpen}
        title={`Are you sure to you want to archive this contact?`}
        description={"Archiving this contact will remove them the dashboard."}
        actionButton={
          <Button
            variant="contained"
            onClick={handleConfirmArchiveClick}
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
        cancelButton={
          <Button
            variant="text"
            onClick={handleCancelArchiveClick}
            sx={{ zIndex: 10, width: "221px" }}
          >
            Cancel
          </Button>
        }
      />
      <AlertDialog
        isOpen={isEditAlertOpen}
        setIsOpen={setIsEditAlertOpen}
        title={"Edit Activity Log?"}
        description={
          "This activity has been logged. Would you like to edit the details"
        }
        actionButton={
          <Button
            variant="contained"
            onClick={handleConfirmEditClick}
            sx={{
              zIndex: 10,
              width: "221px",
              color: "#0F1A24 !important",
              backgroundColor: "#38ACE2 !important",
            }}
          >
            Edit
          </Button>
        }
        cancelButton={
          <Button
            variant="text"
            onClick={handleCancelEditClick}
            sx={{ zIndex: 10, width: "221px" }}
          >
            Not now
          </Button>
        }
      />
    </>
  );
};
