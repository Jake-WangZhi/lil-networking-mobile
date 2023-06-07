import { Contact } from "@/types";
import { ArrowRight } from "react-feather";
import Link from "next/link";
import { Card, CardActionArea, CardContent, Typography } from "@mui/material";

interface Props {
  contact: Contact;
}

export const ContactCard = ({ contact }: Props) => {
  return (
    <Card
      sx={{
        backgroundColor: "rgba(255, 255, 255, 0.05)",
        borderRadius: "8px",
      }}
    >
      <CardActionArea>
        <CardContent>
          <Link href={`/contacts/${contact.id}`}>
            <div className="flex justify-between text-white">
              <Typography
                variant="subtitle1"
                className="font-semibold overflow-hidden break-words"
              >
                {contact.firstName} {contact.lastName}
              </Typography>
              <ArrowRight className="md:w-6 md:h-6 lg:w-8 lg:h-8 flex-shrink-0" />
            </div>
            <Typography
              variant="body1"
              className="text-white text-opacity-70 overflow-hidden break-words"
            >
              {`${contact?.industry}${
                contact?.isArchived ? " • Archived" : ""
              }`}
            </Typography>
            <Typography
              variant="body1"
              className="line-clamp-2 overflow-hidden"
            >
              {contact?.activities[0]?.description}
            </Typography>
          </Link>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
