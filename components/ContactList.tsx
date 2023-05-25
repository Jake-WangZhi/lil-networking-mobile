import { ClipLoader } from "react-spinners";
import { ContactCard } from "./ContactCard";
import { Contact } from "@/types";
import { Info } from "react-feather";

interface Props {
  contacts?: Array<Contact>;
  isLoading: boolean;
  isError: boolean;
}

export const ContactList = ({ contacts, isLoading, isError }: Props) => {
  if (isError) {
    return (
      <div className="flex items-center justify-center text-base text-red-400 mt-5 md:text-lg lg:text-xl">
        Something went wrong, please try again later
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center mt-5">
        <ClipLoader color="#38ACE2" size={150} />
      </div>
    );
  }

  return (
    <div className="w-full mb-20 mt-5">
      <div className="flex items-center space-x-2 mb-2">
        <div className="text-base md:text-xl lg:text-2xl">{`All Contacts (${contacts?.length})`}</div>
        <Info size={18} opacity={0.7} className="md:w-5 md:h-5 lg:w-6 lg:h-6" />
      </div>
      {contacts?.map((contact, index) => (
        <ContactCard key={index} contact={contact} />
      ))}
    </div>
  );
};
