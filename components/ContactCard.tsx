import { Contact } from "@/types";
import { ArrowRight, Archive } from "react-feather";
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
        boxShadow: "none",
      }}
    >
      <CardActionArea>
        <CardContent>
          <Link href={`/contacts/${contact.id}`} className="text-white">
            <div className="flex justify-between">
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 600,
                }}
              >
                {contact.firstName} {contact.lastName}
              </Typography>
              <ArrowRight className="md:w-6 md:h-6 lg:w-8 lg:h-8 flex-shrink-0" />
            </div>
            <div className="flex items-center space-x-2">
              <Typography
                variant="body1"
                sx={{
                  opacity: 0.7,
                }}
              >
                {contact?.industry}
              </Typography>
              {contact?.isArchived && (
                <Archive size={16} className="opacity-70 flex-shrink-0" />
              )}
            </div>
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
