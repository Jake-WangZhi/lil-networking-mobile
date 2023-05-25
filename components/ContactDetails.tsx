import { Contact } from "@/types";
import { ClipLoader } from "react-spinners";
import { MoreVertical } from "react-feather";

interface Props {
  contact: Contact;
  isLoading: boolean;
  isError: boolean;
}

export const ContactDetails = ({ contact, isLoading, isError }: Props) => {
  if (isError) {
    return (
      <div className="flex items-center justify-center text-base text-red-400 md:text-lg lg:text-xl">
        Something went wrong, please try again later
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <ClipLoader color="#38ACE2" size={150} />
      </div>
    );
  }

  return (
    <div className="bg-white bg-opacity-5 w-full p-4">
      <div className="flex justify-between items-center">
        <div className="text-2xl leading-6 font-semibold">{contact.name}</div>
        <MoreVertical />
      </div>
      <div>{contact.title}</div>
      <div>{contact.company}</div>
      <div>{contact.industry}</div>
      <div>{contact.email}</div>
      <div>{contact.phone}</div>
      <div>{contact.links}</div>
      <div>{contact.goalDays}</div>
    </div>
  );
};
