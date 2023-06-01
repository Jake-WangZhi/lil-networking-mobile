import { Contact } from "@/types";
import { ClipLoader } from "react-spinners";
import { ContactInfo } from "./ContactInfo";
import { ContactInterests } from "./ContactInterests";
import { ContactActivites } from "./ContactActivities";
import { Dispatch, SetStateAction } from "react";

interface Props {
  contact: Contact;
  isLoading: boolean;
  isError: boolean;
  setIsActivityPageOpen: Dispatch<SetStateAction<boolean>>;
}

export const ContactDetails = ({ contact, setIsActivityPageOpen }: Props) => {
  const { interests, activities } = contact;

  return (
    <div className="mb-20">
      <ContactInfo contact={contact} />
      {interests.length !== 0 && <ContactInterests interests={interests} />}
      <ContactActivites
        activities={activities}
        setIsActivityPageOpen={setIsActivityPageOpen}
      />
    </div>
  );
};
