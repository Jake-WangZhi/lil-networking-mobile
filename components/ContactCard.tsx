import { Contact } from "@/types";
import { ArrowRight } from "react-feather";
import Link from "next/link";

interface Props {
  contact: Contact;
}

export const ContactCard = ({ contact }: Props) => {
  return (
    <Link href={`/contacts/${contact.id}`}>
      <div className="bg-white bg-opacity-5 p-4 mb-4 hover:bg-opacity-[0.08] active:bg-opacity-10 rounded-lg">
        <div className="flex flex-col">
          <div className="flex justify-between">
            <div className="text-base md:text-xl lg:text-2xl overflow-hidden break-words">
              {contact.name}
            </div>
            <ArrowRight className="md:w-6 md:h-6 lg:w-8 lg:h-8 flex-shrink-0" />
          </div>
          <div className="text-sm font-normal text-white text-opacity-70 mb-2 md:text-base lg:text-lg overflow-hidden break-words">
            {`${contact?.industry}${contact?.isArchived ? " • Archived" : ""}`}
          </div>
          <p className="text-sm md:text-base lg:text-lg line-clamp-2 overflow-hidden">
            {contact?.activities[0]?.description}
          </p>
        </div>
      </div>
    </Link>
  );
};
