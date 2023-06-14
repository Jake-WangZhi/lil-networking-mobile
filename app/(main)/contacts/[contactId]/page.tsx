"use client";

import "../styles.css";
import { ContactDetails } from "@/components/ContactDetails";
import { useContact } from "@/hooks/useContact";
import { ActivityForm } from "@/components/ActivityForm";
import { useState } from "react";
import { ClipLoader } from "react-spinners";
import { ContactHeader } from "@/components/ContactHeader";
import { Typography } from "@mui/material";

export default function ContactPage({
  params,
}: {
  params: { contactId: string };
}) {
  const [isActivityPageOpen, setIsActivityPageOpen] = useState(false);

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
    <main className="relative min-h-screen py-8 overflow-hidden">
      <ContactHeader contact={contact} />
      <ContactDetails
        contact={contact}
        isError={isError}
        isLoading={isLoading}
        setIsActivityPageOpen={setIsActivityPageOpen}
      />
      <ActivityForm
        isOpen={isActivityPageOpen}
        setIsActivityPageOpen={setIsActivityPageOpen}
        contactId={params.contactId}
      />
    </main>
  );
}
