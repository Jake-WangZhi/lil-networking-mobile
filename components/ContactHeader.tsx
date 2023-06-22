import { useBackPath } from "@/contexts/BackPathContext";
import { useContactMutation } from "@/hooks/useContactMutation";
import { DotsThreeCircleVertical } from "@phosphor-icons/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  ChevronLeft,
  Edit,
  Archive,
  Trash2,
  MessageSquare,
  X,
} from "react-feather";
import { Contact, SearchParams } from "@/types";
import { Typography } from "@mui/material";
import { Button } from "./Button";
import { AlertDialog } from "./AlertDialog";

interface Props {
  contact: Contact;
}

export const ContactHeader = ({ contact }: Props) => {
  const router = useRouter();
  const { backPath } = useBackPath();
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const isChanged = searchParams?.get(SearchParams.IsChanged);
  const isFromMessage = searchParams?.get(SearchParams.IsFromMessage);

  const [showDropdown, setShowDropdown] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [action, setAction] = useState<"delete" | "archive">();
  const [alertDescription, setAlertDescription] = useState("");

  const deleteContactMutation = useContactMutation({
    method: "DELETE",
    onSuccess: () => {
      setErrorMessage("");
      router.push(backPath);
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

  const handleDeleteClick = useCallback(() => {
    setShowDropdown(false);
    setAction("delete");
    setAlertDescription(
      "Deleting this contact will remove them from the app. This contact will need to be reentered."
    );
    setIsAlertOpen(true);
  }, []);

  const handleStatusChange = useCallback(
    (isActive: boolean) => () => {
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

  const handleConfirmClick = useCallback(() => {
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

  const handleCancelClick = useCallback(() => {
    setIsAlertOpen(false);
  }, []);

  const handleBackClick = useCallback(() => {
    if (isChanged) {
      router.push(backPath);
    } else {
      router.back();
    }
  }, [backPath, isChanged, router]);

  const handleDropdownClick = useCallback(
    () => setShowDropdown((prev) => !prev),
    []
  );

  const handleMessageClick = useCallback(
    () =>
      router.push(
        `/contacts/${contact.id}/message?${SearchParams.IsFromProfile}=true`
      ),
    [contact.id, router]
  );

  const handleEditClick = useCallback(
    () => router.push(`/contacts/${contact.id}/edit`),
    [contact.id, router]
  );

  return (
    <div className="flex items-center sticky top-0 w-full bg-dark-blue z-10 pt-8 pb-2 px-4">
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
      <div className="w-full flex justify-between items-center">
        <Button
          variant="text"
          onClick={handleBackClick}
          sx={{
            p: isChanged ? "12px !important" : "6px !important",
            ml: isChanged ? "-12px" : "-6px",
          }}
        >
          {isChanged ? (
            <X size={24} className="md:w-7 md:h-7 lg:w-8 lg:h-8" />
          ) : (
            <ChevronLeft
              size={36}
              className="md:w-10 md:h-10 lg:w-11 lg:h-11"
            />
          )}
        </Button>
        {!isFromMessage && (
          <div className="relative">
            <div className="flex items-center">
              {contact.isArchived && (
                <div className="bg-white bg-opacity-5 rounded-2xl px-4 py-[6px]">
                  <Typography variant="body1">Archived</Typography>
                </div>
              )}
              <Button
                variant="text"
                sx={{
                  mr: "-12px !important",
                  p: "12px !important",
                }}
                onClick={handleDropdownClick}
              >
                <DotsThreeCircleVertical
                  size={24}
                  className="md:w-7 md:h-7 lg:w-8 lg:h-8"
                />
              </Button>
            </div>
            {showDropdown && (
              <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-[#3C3C43] divide-opacity-[0.36] rounded-md bg-[#EDEDED] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                {!contact.isArchived && (
                  <div>
                    <Button
                      onClick={handleMessageClick}
                      variant="text"
                      sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        px: "16px",
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
                )}
                <div>
                  <Button
                    onClick={handleEditClick}
                    variant="text"
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      px: "16px",
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
                <div>
                  <Button
                    onClick={handleStatusChange(!contact.isArchived)}
                    variant="text"
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      px: "16px",
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
                <div>
                  <Button
                    onClick={handleDeleteClick}
                    variant="text"
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      px: "16px",
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
        )}
      </div>
      <AlertDialog
        isOpen={isAlertOpen}
        setIsOpen={setIsAlertOpen}
        title={`Are you sure to you want to ${action} this contact?`}
        description={alertDescription}
        actionButton={
          <Button
            variant="contained"
            onClick={handleConfirmClick}
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
        cancelButton={
          <Button
            variant="text"
            onClick={handleCancelClick}
            sx={{ zIndex: 10, width: "221px" }}
          >
            Cancel
          </Button>
        }
      />
    </div>
  );
};
