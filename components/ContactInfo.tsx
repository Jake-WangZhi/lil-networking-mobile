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
  const { name, title, company, industry, goalDays, email, phone, links } =
    contact;

  return (
    <div className="bg-white bg-opacity-5 w-full p-4 space-y-1 text-base mb-6 rounded-lg">
      <div className="flex justify-between items-center">
        <div className="text-2xl leading-6 font-semibold md:text-3xl lg:text-4xl">
          {name}
        </div>
      </div>
      <div className="text-base md:text-lg lg:text-xl">{title}</div>
      <div className="text-base md:text-lg lg:text-xl">{company}</div>
      <div className="text-base md:text-lg lg:text-xl">{industry}</div>
      {email && (
        <div className="flex items-center space-x-1">
          <Mail size={16} className="md:w-5 md:h-5 lg:w-6 lg:h-6" />
          <div className="text-base md:text-lg lg:text-xl">{email}</div>
        </div>
      )}
      {phone && (
        <div className="flex items-center space-x-1">
          <Phone size={16} className="md:w-5 md:h-5 lg:w-6 lg:h-6" />
          <div className="text-base md:text-lg lg:text-xl">
            {formatPhoneNumber(phone)}
          </div>
        </div>
      )}
      {links?.map((link, index) => (
        <div key={`link-${index}`} className="flex items-center space-x-1">
          <Link size={16} className="md:w-5 md:h-5 lg:w-6 lg:h-6" />
          <div className="text-base md:text-lg lg:text-xl">{link}</div>
        </div>
      ))}
      <div className="text-base md:text-lg lg:text-xl">
        Goal: Every {goalDays} days
      </div>
    </div>
  );
};
