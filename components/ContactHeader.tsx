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
import { Button } from "./Button";
import { Contact } from "@/types";

interface Props {
  contact: Contact;
}

export const ContactHeader = ({ contact }: Props) => {
  const router = useRouter();
  const { currentPath } = useCurrentPath();
  const queryClient = useQueryClient();
  const [showDropdown, setShowDropdown] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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
    deleteContactMutation.mutate({ ...contact, id: contact.id });
  }, [deleteContactMutation, contact]);

  const handleStatusChange = useCallback(
    (isArchived: boolean) => {
      updateContactMutation.mutate({ ...contact, isArchived: !isArchived });
      setShowDropdown(false);
    },
    [contact, updateContactMutation]
  );

  return (
    <div className="pt-8 mb-4">
      {errorMessage && (
        <div className="text-red-500 flex justify-center">{errorMessage}</div>
      )}
      <div className="flex justify-between items-center">
        <Button
          variant="text"
          className="relative -ml-3"
          onClick={() => router.push(currentPath)}
        >
          <ChevronLeft
            size={36}
            color="#737373"
            className="md:w-11 md:h-11 lg:w-13 lg:h-13"
          />
        </Button>
        <div className="relative">
          <div className="flex items-center space-x-5">
            {contact.isArchived && (
              <div className="text-sm md:text-base lg:text-lg">Archived</div>
            )}
            <Button
              variant="text"
              className="flex items-center"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <DotsThreeCircleVertical size={24} />
            </Button>
          </div>
          {showDropdown && (
            <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-[#3C3C43] divide-opacity-[0.36] rounded-md bg-[#EDEDED] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-2">
                <Button
                  variant="text"
                  onClick={() => {}}
                  className="w-full flex justify-between items-center px-4 py-2 text-black hover:bg-opacity-[0.08]"
                >
                  <div className="text-base md:text-lg lg:text-xl">Message</div>
                  <MessageSquare size={24} />
                </Button>
              </div>
              <div className="py-2">
                <Button
                  variant="text"
                  onClick={() => router.push(`/contacts/${contact.id}/edit`)}
                  className="w-full flex justify-between items-center px-4 py-2 text-black hover:bg-opacity-[0.08]"
                >
                  <div className="text-base md:text-lg lg:text-xl">Edit</div>
                  <Edit size={24} />
                </Button>
              </div>
              <div className="py-2">
                <Button
                  variant="text"
                  onClick={() => handleStatusChange(contact.isArchived)}
                  className="w-full flex justify-between items-center px-4 py-2 text-black hover:bg-opacity-[0.08]"
                >
                  <div className="text-base md:text-lg lg:text-xl">
                    {contact.isArchived ? "Activate" : "Archive"}
                  </div>
                  <Archive size={24} />
                </Button>
              </div>
              <div className="py-2">
                <Button
                  variant="text"
                  onClick={handleDelete}
                  className="w-full flex justify-between items-center px-4 py-2 text-black hover:bg-opacity-[0.08]"
                >
                  <div className="text-base md:text-lg lg:text-xl">Delete</div>
                  <Trash2 size={24} />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
