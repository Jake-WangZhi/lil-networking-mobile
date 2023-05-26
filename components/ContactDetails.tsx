import { Contact } from "@/types";
import { ClipLoader } from "react-spinners";
import { ContactInfo } from "./ContactInfo";
import { ContactInterests } from "./ContactInterests";
import { ContactActivites } from "./ContactActivities";

interface Props {
  contact?: Contact;
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

  if (!contact) {
    return <p className="text-2xl font-semibold">No contact available</p>;
  }

  const {
    name,
    title,
    company,
    industry,
    goalDays,
    email,
    phone,
    links,
    interests,
    activities,
  } = contact;

  return (
    <div className="mb-20">
      <ContactInfo
        name={name}
        title={title}
        company={company}
        industry={industry}
        goalDays={goalDays}
        email={email}
        phone={phone}
        links={links}
      />
      <ContactInterests interests={interests} />
      <ContactActivites activities={activities} />
    </div>
  );
};
