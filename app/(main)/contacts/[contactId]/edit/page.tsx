"use client";

import "react-tagsinput/react-tagsinput.css";
import "../../styles.css";
import { useSession } from "next-auth/react";
import { useContact } from "@/hooks/useContact";
import { ContactForm } from "@/components/ContactForm";
import { ClipLoader } from "react-spinners";
import { Typography } from "@mui/material";

export default function EditPage({
  params,
}: {
  params: { contactId: string };
}) {
  const { data: session } = useSession();
  const { contact, isLoading, isError } = useContact({
    id: params.contactId,
  });

  if (isError) {
    return (
      <Typography
        variant="h2"
        className="min-h-screen flex items-center justify-center p-8 !text-error"
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
        variant="h2"
        className="min-h-screen flex items-center justify-center p-8"
      >
        No contact available
      </Typography>
    );
  }

  return <ContactForm contact={contact} userEmail={session?.user?.email} />;
}