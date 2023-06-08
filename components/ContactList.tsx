import { ClipLoader } from "react-spinners";
import { ContactCard } from "./ContactCard";
import { Contact } from "@/types";
import { Typography } from "@mui/material";

interface Props {
  contacts?: Array<Contact>;
  isLoading: boolean;
  isError: boolean;
}

export const ContactList = ({ contacts, isLoading, isError }: Props) => {
  if (isError) {
    return (
      <Typography
        variant="h2"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "32px",
          color: "#F42010",
        }}
      >
        Something went wrong, please try again later
      </Typography>
    );
  }

  if (isLoading) {
    return (
      <div className="h-[50vh] flex items-center justify-center mt-5">
        <ClipLoader color="#38ACE2" size={150} />
      </div>
    );
  }

  if (!contacts) {
    return (
      <Typography
        variant="h2"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "32px",
          color: "#F42010",
        }}
      >
        No contacts available
      </Typography>
    );
  }

  return (
    <div className="w-full mb-20 mt-5">
      <div className="flex items-center space-x-2 mb-2">
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 600,
          }}
        >{`All Contacts (${contacts.length})`}</Typography>
      </div>
      <div className="space-y-4">
        {contacts.map((contact, index) => (
          <ContactCard key={index} contact={contact} />
        ))}
      </div>
    </div>
  );
};
