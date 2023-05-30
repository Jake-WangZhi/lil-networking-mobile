import {
  Link,
  Mail,
  MoreVertical,
  Phone,
  Edit,
  Archive,
  Trash2,
} from "react-feather";
import { Button } from "./Button";
import { useCallback, useState } from "react";
import { useContactMutation } from "@/hooks/useContactMutation";
import { useRouter } from "next/navigation";
import { useCurrentPath } from "@/contexts/CurrentPathContext";
import { Contact } from "@/types";
import { formatPhoneNumber } from "@/lib/utils";

interface Props {
  contact: Contact;
}

export const ContactInfo = ({ contact }: Props) => {
  const {
    id,
    name,
    title,
    company,
    industry,
    goalDays,
    email,
    phone,
    links,
    isArchived,
  } = contact;

  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);
  const { currentPath } = useCurrentPath();

  const deleteContactMutation = useContactMutation({
    method: "DELETE",
    onSuccess: () => {
      router.push(currentPath);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const updateContactMutation = useContactMutation({
    method: "PUT",
    onSuccess: () => {
      router.push(currentPath);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleDelete = useCallback(() => {
    deleteContactMutation.mutate({ ...contact, id });
  }, [deleteContactMutation, contact, id]);

  const handleArchive = useCallback(() => {
    updateContactMutation.mutate({ ...contact, isArchived: true });
  }, [contact, updateContactMutation]);

  const handleActivate = useCallback(() => {
    updateContactMutation.mutate({ ...contact, isArchived: false });
  }, [contact, updateContactMutation]);

  return (
    <div className="bg-white bg-opacity-5 w-full p-4 space-y-1 text-base mb-6 rounded-lg">
      <div className="flex justify-between items-center">
        <div className="text-2xl leading-6 font-semibold">{name}</div>
        <div className="relative">
          <div>
            <Button
              variant="text"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <MoreVertical />
            </Button>
          </div>

          {showDropdown && (
            <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-[#3C3C43] divide-opacity-[0.36] rounded-md bg-[#EDEDED] bg-opacity-80 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-2">
                <Button
                  variant="text"
                  onClick={() => router.push(`/contacts/${id}/edit`)}
                  className="w-full flex justify-between items-center px-4 py-2 text-black hover:bg-opacity-[0.08]"
                >
                  <div className="text-base">Edit</div>
                  <Edit size={24} />
                </Button>
              </div>
              <div className="py-2">
                <Button
                  variant="text"
                  onClick={isArchived ? handleActivate : handleArchive}
                  className="w-full flex justify-between items-center px-4 py-2 text-black hover:bg-opacity-[0.08]"
                >
                  <div className="text-base">
                    {isArchived ? "Activate" : "Archive"}
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
                  <div className="text-base">Delete</div>
                  <Trash2 size={24} />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div>{title}</div>
      <div>{company}</div>
      <div>{industry}</div>
      {email && (
        <div className="flex items-center space-x-1">
          <Mail size={16} />
          <div>{email}</div>
        </div>
      )}
      {phone && (
        <div className="flex items-center space-x-1">
          <Phone size={16} />
          <div>{formatPhoneNumber(phone)}</div>
        </div>
      )}
      {links?.map((link, index) => (
        <div key={`link-${index}`} className="flex items-center space-x-1">
          <Link size={16} />
          <div>{link}</div>
        </div>
      ))}
      <div>Goal: Every {goalDays} days</div>
    </div>
  );
};
