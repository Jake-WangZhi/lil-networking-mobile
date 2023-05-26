import { Link, Mail, MoreVertical, Phone } from "react-feather";

interface Props {
  name: string;
  title: string;
  company: string;
  industry: string;
  goalDays: number;
  email: string | null;
  phone: string | null;
  links: string[] | null;
}

export const ContactInfo = ({
  name,
  title,
  company,
  industry,
  goalDays,
  email,
  phone,
  links,
}: Props) => {
  return (
    <div className="bg-white bg-opacity-5 w-full p-4 space-y-1 text-base mb-6 rounded-lg">
      <div className="flex justify-between items-center">
        <div className="text-2xl leading-6 font-semibold">{name}</div>
        <MoreVertical />
      </div>
      <div>{title}</div>
      <div>{company}</div>
      <div>{industry}</div>
      {email && (
        <div className="flex items-center space-x-1">
          <Mail size={16} />
          <div>{email}</div>
        </div>
      )}
      {phone && (
        <div className="flex items-center space-x-1">
          <Phone size={16} />
          <div>{phone}</div>
        </div>
      )}
      {links?.map((link, index) => (
        <div key={`link-${index}`} className="flex items-center space-x-1">
          <Link size={16} />
          <div>{link}</div>
        </div>
      ))}
      <div>Goal: Every {goalDays} days</div>
    </div>
  );
};
