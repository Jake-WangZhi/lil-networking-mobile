import { Contact } from "@/types";
import { ArrowRight } from "react-feather";
import Link from "next/link";

interface Props {
  contact: Contact;
}

export const ContactCard = ({ contact }: Props) => {
  return (
    <Link href="/contacts">
      <div className="bg-white bg-opacity-5 p-4 mb-4 hover:bg-opacity-[0.08] active:bg-opacity-10 rounded-lg">
        <div className="flex flex-col">
          <div className="flex justify-between">
            <h2 className="md:text-xl lg:text-2xl">{contact.name}</h2>
            <ArrowRight className="md:w-6 md:h-6 lg:w-8 lg:h-8" />
          </div>
          <div className="text-sm font-normal text-white text-opacity-70 md:text-base lg:text-lg">
            {contact?.industry}
          </div>
          <p className="text-sm md:text-base lg:text-lg line-clamp-2 overflow-hidden">
            {contact?.activities?.[0]?.note}
          </p>
        </div>
      </div>
    </Link>
  );
};
