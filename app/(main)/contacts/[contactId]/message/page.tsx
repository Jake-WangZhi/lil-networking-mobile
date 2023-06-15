"use client";

import { useContact } from "@/hooks/useContact";
import { Typography } from "@mui/material";
import { ContactInterests } from "@/components/ContactInterests";
import { SwipeableActivities } from "@/components/SwipeableActivities";
import { ClipLoader } from "react-spinners";
import { MessageCard } from "@/components/MessageCard";
import { MessageHeader } from "@/components/MessageHeader";
import { MessageActions } from "@/components/MessageActions";

import "../../styles.css";

export default function MessagePage({
  params,
}: {
  params: { contactId: string };
}) {
  const { contact, isLoading, isError } = useContact({
    id: params.contactId,
  });

  if (isError) {
    return (
      <Typography
        variant="h3"
        sx={{
          minHeight: "100vh",
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
      <div className="min-h-screen flex items-center justify-center pt-8">
        <ClipLoader color="#38ACE2" size={150} />
      </div>
    );
  }

  if (!contact) {
    return (
      <Typography
        variant="h3"
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "32px",
          color: "#F42010",
        }}
      >
        No contact available
      </Typography>
    );
  }

  return (
    <main className="relative min-h-screen text-white py-8 flex flex-col justify-between">
      <div>
        <div className="px-4">
          <MessageHeader
            firstName={contact.firstName}
            contactId={params.contactId}
          />
          <MessageCard contact={contact} />
        </div>
        <div className="my-6">
          <SwipeableActivities activities={contact.activities.slice(0, 3)} />
        </div>
        <ContactInterests interests={contact.interests} />
      </div>
      <MessageActions contact={contact} />
    </main>
  );
}
