import { Link, Mail, Phone } from "react-feather";

import { Contact } from "@/types";
import { formatPhoneNumber } from "@/lib/utils";

interface Props {
  contact: Contact;
}

export const ContactInfo = ({ contact }: Props) => {
  const {
    firstName,
    lastName,
    title,
    company,
    industry,
    goalDays,
    email,
    phone,
    links,
  } = contact;

  return (
    <div className="bg-white bg-opacity-5 w-full p-4 space-y-1 text-base mb-6 rounded-lg overflow-hidden break-words">
      <div className="text-2xl leading-6 font-semibold md:text-3xl lg:text-4xl">
        {firstName} {lastName}
      </div>
      <div className="text-base md:text-lg lg:text-xl">{title}</div>
      <div className="text-base md:text-lg lg:text-xl">{company}</div>
      <div className="text-base md:text-lg lg:text-xl">{industry}</div>
      {email && (
        <div className="flex space-x-1">
          <Mail
            size={16}
            className="md:w-5 md:h-5 lg:w-6 lg:h-6 flex-shrink-0 mt-1"
          />
          <div className="text-base md:text-lg lg:text-xl overflow-hidden break-words">
            {email}
          </div>
        </div>
      )}
      {phone && (
        <div className="flex space-x-1">
          <Phone
            size={16}
            className="md:w-5 md:h-5 lg:w-6 lg:h-6 flex-shrink-0 mt-1"
          />
          <div className="text-base md:text-lg lg:text-xl overflow-hidden break-words">
            {formatPhoneNumber(phone)}
          </div>
        </div>
      )}
      {links?.map((link, index) => (
        <div key={`link-${index}`} className="flex space-x-1">
          <Link
            size={16}
            className="md:w-5 md:h-5 lg:w-6 lg:h-6 flex-shrink-0 mt-1"
          />
          <div className="text-base md:text-lg lg:text-xl overflow-hidden break-words">
            {link}
          </div>
        </div>
      ))}
      <div className="text-base md:text-lg lg:text-xl">
        Goal: Every {goalDays} days
      </div>
    </div>
  );
};
