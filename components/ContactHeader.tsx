import { useCurrentPath } from "@/contexts/CurrentPathContext";
import { useContactMutation } from "@/hooks/useContactMutation";
import { DotsThreeCircleVertical } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { useState, useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  ChevronLeft,
  Edit,
  Archive,
  Trash2,
  MessageSquare,
} from "react-feather";
import { Contact } from "@/types";
import { Typography } from "@mui/material";
import { Button } from "./Button";
import { AlertDialog } from "./AlertDialog";

interface Props {
  contact: Contact;
}

export const ContactHeader = ({ contact }: Props) => {
  const router = useRouter();
  const { currentPath } = useCurrentPath();
  const queryClient = useQueryClient();
  const [showDropdown, setShowDropdown] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [action, setAction] = useState<"delete" | "archive">();
  const [alertDescription, setAlertDescription] = useState("");

  const deleteContactMutation = useContactMutation({
    method: "DELETE",
    onSuccess: () => {
      setErrorMessage("");
      router.push(currentPath);
    },
    onError: (error) => {
      setErrorMessage("An error occurred. Please try again.");
      console.log(error);
    },
  });

  const updateContactMutation = useContactMutation({
    method: "PUT",
    onSuccess: () => {
      setErrorMessage("");
      queryClient.refetchQueries(["contact", contact.id]);
    },
    onError: (error) => {
      setErrorMessage("An error occurred. Please try again.");
      console.log(error);
    },
  });

  const handleDelete = useCallback(() => {
    setShowDropdown(false);
    setAction("delete");
    setAlertDescription(
      "Deleting this contact will remove them from the app. This contact will need to be reentered."
    );
    setIsAlertOpen(true);
  }, []);

  const handleStatusChange = useCallback(
    (isActive: boolean) => {
      setShowDropdown(false);
      if (isActive) {
        setAction("archive");
        setAlertDescription(
          "Archiving this contact will remove them the dashboard."
        );
        setIsAlertOpen(true);
      } else {
        updateContactMutation.mutate({
          ...contact,
          isArchived: !contact.isArchived,
        });
      }
    },
    [contact, updateContactMutation]
  );

  const handleClick = useCallback(() => {
    if (action === "delete") {
      deleteContactMutation.mutate({ ...contact, id: contact.id });
    } else if (action === "archive") {
      updateContactMutation.mutate({
        ...contact,
        isArchived: !contact.isArchived,
      });
    }
    setIsAlertOpen(false);
  }, [action, contact, deleteContactMutation, updateContactMutation]);

  return (
    <div className="mb-2 mx-4">
      {errorMessage && (
        <Typography
          variant="subtitle2"
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          {errorMessage}
        </Typography>
      )}
      <div className="flex justify-between items-center">
        <Button
          variant="text"
          onClick={() => router.push(currentPath)}
          sx={{ py: "6px" }}
        >
          <ChevronLeft size={36} className="md:w-11 md:h-11 lg:w-13 lg:h-13" />
        </Button>
        <div className="relative">
          <div className="flex items-center space-x-5">
            {contact.isArchived && (
              <div className="bg-white bg-opacity-5 rounded-2xl px-4 py-[6px]">
                <Typography variant="body1">Archived</Typography>
              </div>
            )}
            <Button
              variant="text"
              sx={{ display: "flex", alignItems: "center" }}
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <DotsThreeCircleVertical
                size={24}
                className="md:w-7 md:h-7 lg:w-8 lg:h-8"
              />
            </Button>
          </div>
          {showDropdown && (
            <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-[#3C3C43] divide-opacity-[0.36] rounded-md bg-[#EDEDED] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-2">
                <Button
                  onClick={() => {}}
                  variant="text"
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    px: "16px",
                    py: "8px",
                    color: "black",
                    "&:hover": {
                      backgroundColor: "rgba(0, 0, 0, 0.08)",
                    },
                  }}
                >
                  <Typography variant="subtitle1" sx={{ color: "black" }}>
                    Message
                  </Typography>
                  <MessageSquare size={24} />
                </Button>
              </div>
              <div className="py-2">
                <Button
                  onClick={() => router.push(`/contacts/${contact.id}/edit`)}
                  variant="text"
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    px: "16px",
                    py: "8px",
                    color: "black",
                    "&:hover": {
                      backgroundColor: "rgba(0, 0, 0, 0.08)",
                    },
                  }}
                >
                  <Typography variant="subtitle1" sx={{ color: "black" }}>
                    Edit
                  </Typography>
                  <Edit size={24} />
                </Button>
              </div>
              <div className="py-2">
                <Button
                  onClick={() => handleStatusChange(!contact.isArchived)}
                  variant="text"
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    px: "16px",
                    py: "8px",
                    color: "black",
                    "&:hover": {
                      backgroundColor: "rgba(0, 0, 0, 0.08)",
                    },
                  }}
                >
                  <Typography variant="subtitle1" sx={{ color: "black" }}>
                    {contact.isArchived ? "Activate" : "Archive"}
                  </Typography>
                  <Archive size={24} />
                </Button>
              </div>
              <div className="py-2">
                <Button
                  onClick={handleDelete}
                  variant="text"
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    px: "16px",
                    py: "8px",
                    color: "black",
                    "&:hover": {
                      backgroundColor: "rgba(0, 0, 0, 0.08)",
                    },
                  }}
                >
                  <Typography variant="subtitle1" sx={{ color: "black" }}>
                    Delete
                  </Typography>
                  <Trash2 size={24} />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      <AlertDialog
        isOpen={isAlertOpen}
        setIsOpen={setIsAlertOpen}
        title={`Are you sure to you want to ${action} this contact?`}
        description={alertDescription}
        actionButton={
          <Button
            variant="contained"
            onClick={handleClick}
            sx={{
              zIndex: 10,
              width: "221px",
              ...(action === "delete"
                ? {
                    color: "white !important",
                    backgroundColor: "#F42010 !important",
                  }
                : {
                    color: "#0F1A24 !important",
                    backgroundColor: "#38ACE2 !important",
                  }),
            }}
          >
            {action === "delete" ? "Delete" : "Allow"}
          </Button>
        }
      />
    </div>
  );
};
