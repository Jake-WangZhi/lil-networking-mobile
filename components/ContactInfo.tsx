import { Link, Mail, Phone } from "react-feather";
import { Contact } from "@/types";
import { formatPhoneNumber } from "@/lib/utils";
import { Typography } from "@mui/material";

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
    <div className="mx-4">
      <div className="bg-white bg-opacity-5 w-full p-4 space-y-2 text-base mb-6 rounded-lg overflow-hidden break-words">
        <Typography variant="h2">
          {firstName} {lastName}
        </Typography>
        <Typography variant="subtitle1">{title}</Typography>
        <Typography variant="subtitle1">{company}</Typography>
        <Typography variant="subtitle1">{industry}</Typography>
        {email && (
          <div className="flex space-x-1">
            <Mail
              size={16}
              className="md:w-5 md:h-5 lg:w-6 lg:h-6 flex-shrink-0 mt-1"
            />
            <Typography
              variant="subtitle1"
              sx={{
                overflow: "hidden",
                overflowWrap: "break-words",
              }}
            >
              {email}
            </Typography>
          </div>
        )}
        {phone && (
          <div className="flex space-x-1">
            <Phone
              size={16}
              className="md:w-5 md:h-5 lg:w-6 lg:h-6 flex-shrink-0 mt-1"
            />
            <Typography
              variant="subtitle1"
              sx={{
                overflow: "hidden",
                overflowWrap: "break-words",
              }}
            >
              {formatPhoneNumber(phone)}
            </Typography>
          </div>
        )}
        {links?.map((link, index) => (
          <div key={`link-${index}`} className="flex space-x-1">
            <Link
              size={16}
              className="md:w-5 md:h-5 lg:w-6 lg:h-6 flex-shrink-0 mt-1"
            />
            <Typography
              variant="subtitle1"
              sx={{
                overflow: "hidden",
                overflowWrap: "break-words",
              }}
            >
              {link}
            </Typography>
          </div>
        ))}
        <Typography variant="subtitle1">
          Cadence: Every {goalDays} days
        </Typography>
      </div>
    </div>
  );
};
