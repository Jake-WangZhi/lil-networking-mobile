import { Contact } from "@/types";
import { ArrowRight } from "react-feather";
import Link from "next/link";
import Ripples from "react-ripples";

interface Props {
  contact: Contact;
}

export const ContactCard = ({ contact }: Props) => {
  return (
    <Ripples color="rgba(255, 255, 255, 0.1)" className="w-full">
      <div className="w-full bg-white bg-opacity-5 p-4 hover:bg-opacity-[0.08] rounded-lg">
        <Link href={`/contacts/${contact.id}`}>
          <div className="flex justify-between">
            <div className="text-left text-base md:text-xl lg:text-2xl overflow-hidden break-words">
              {contact.name}
            </div>
            <ArrowRight className="md:w-6 md:h-6 lg:w-8 lg:h-8 flex-shrink-0" />
          </div>
          <div className="flex justify-start text-sm font-normal text-white text-opacity-70 mb-2 md:text-base lg:text-lg overflow-hidden break-words">
            {`${contact?.industry}${contact?.isArchived ? " • Archived" : ""}`}
          </div>
          <p className="text-sm md:text-base lg:text-lg line-clamp-2 overflow-hidden">
            {contact?.activities[0]?.description}
          </p>
        </Link>
      </div>
    </Ripples>
  );
};
