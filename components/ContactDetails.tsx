import { Contact } from "@/types";
import { ContactInfo } from "./ContactInfo";
import { ContactInterests } from "./ContactInterests";
import { ContactActivites } from "./ContactActivities";

interface Props {
  contact: Contact;
  isLoading: boolean;
  isError: boolean;
}

export const ContactDetails = ({ contact }: Props) => {
  const { interests, activities } = contact;

  return (
    <>
      <ContactInfo contact={contact} />
      {interests.length !== 0 && <ContactInterests interests={interests} />}
      <ContactActivites activities={activities} />
    </>
  );
};
