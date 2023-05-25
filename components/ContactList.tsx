import { ClipLoader } from "react-spinners";
import { ContactCard } from "./ContactCard";
import { Contact } from "@/types";

interface Props {
  contacts?: Array<Contact>;
  isLoading: boolean;
  isError: boolean;
}

export const ContactList = ({ contacts, isLoading, isError }: Props) => {
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
    <div className="w-full mb-20">
      <h6 className="mb-2 md:text-xl lg:text-2xl">{`All Contacts (${contacts?.length})`}</h6>
      {contacts?.map((contact, index) => (
        <ContactCard key={index} contact={contact} />
      ))}
    </div>
  );
};
