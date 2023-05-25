import { Contact } from "@/types";
import { ClipLoader } from "react-spinners";
import {
  MoreVertical,
  Mail,
  Phone,
  Link,
  PlusCircle,
  Circle,
  Trash2,
  Activity,
} from "react-feather";

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

  return (
    <>
      <div className="bg-white bg-opacity-5 w-full p-4 space-y-1 text-base mb-6">
        <div className="flex justify-between items-center">
          <div className="text-2xl leading-6 font-semibold">{contact.name}</div>
          <MoreVertical />
        </div>
        <div>{contact.title}</div>
        <div>{contact.company}</div>
        <div>{contact.industry}</div>
        {contact.email && (
          <div className="flex items-center space-x-1">
            <Mail size={16} />
            <div>{contact.email}</div>
          </div>
        )}
        {contact.phone && (
          <div className="flex items-center space-x-1">
            <Phone size={16} />
            <div>{contact.phone}</div>
          </div>
        )}
        {contact.links?.map((link, index) => (
          <div key={`link-${index}`} className="flex items-center space-x-1">
            <Link size={16} />
            <div>{link}</div>
          </div>
        ))}
        <div>Goal: Every {contact.goalDays} days</div>
      </div>
      <div>
        <div className="text-base mb-2">Interests</div>
        <div className="bg-white bg-opacity-5 w-full p-4 space-x-2 text-base mb-6">
          {contact.interests?.map((interest, index) => (
            <span
              key={`interest-${index}`}
              className="inline-block bg-white bg-opacity-[0.12] text-white rounded-full px-4 py-[6px]"
            >
              {interest}
            </span>
          ))}
        </div>
      </div>
      <div>
        <div className="flex justify-between mb-3">
          <div>Activites</div>
          <div className="flex items-center space-x-1">
            <PlusCircle size={24} />
            <div>Log Activity</div>
          </div>
        </div>
        {contact.activities?.map((activity, index) => (
          <div key={`activity-${index}`} className="flex space-x-4 mb-4">
            <Circle className="pt-1" fill="#38ACE2" color="#38ACE2" />
            <div className="bg-white bg-opacity-5 w-full p-4 text-white">
              <div className="flex justify-between">
                <div className="text-base font-semibold">{activity.title}</div>
                <Trash2 size={24} />
              </div>
              <div className="text-sm opacity-[0.7] mb-2">{activity.date}</div>
              <div className="text-sm">{activity.description}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
