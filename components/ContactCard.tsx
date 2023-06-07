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
                sx={{
                  fontWeight: 600,
                  overflow: "hidden",
                  overflowWrap: "break-word",
                }}
              >
                {contact.firstName} {contact.lastName}
              </Typography>
              <ArrowRight className="md:w-6 md:h-6 lg:w-8 lg:h-8 flex-shrink-0" />
            </div>
            <Typography
              variant="body1"
              sx={{
                opacity: 0.7,
                overflow: "hidden",
                overflowWrap: "break-word",
              }}
            >
              {`${contact?.industry}${
                contact?.isArchived ? " • Archived" : ""
              }`}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                overflow: "hidden",
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 2,
              }}
            >
              {contact?.activities[0]?.description}
            </Typography>
          </Link>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
