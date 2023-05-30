"use client";

import { ContactDetails } from "@/components/ContactDetails";
import { useContact } from "@/hooks/useContact";
import { ActivityPage } from "@/components/ActivityPage";
import { useState } from "react";
import { ClipLoader } from "react-spinners";
import { ContactHeader } from "@/components/ContactHeader";

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
      <div className="flex items-center justify-center pt-8 text-base text-red-400 md:text-lg lg:text-xl">
        Something went wrong, please try again later
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center pt-8">
        <ClipLoader color="#38ACE2" size={150} />
      </div>
    );
  }

  if (!contact) {
    return <p className="text-2xl font-semibold">No contact available</p>;
  }

  return (
    <main className="relative min-h-screen text-white px-4 overflow-hidden">
      <ContactHeader contact={contact} />
      <ContactDetails
        contact={contact}
        isError={isError}
        isLoading={isLoading}
        setIsActivityPageOpen={setIsActivityPageOpen}
      />
      <ActivityPage
        isOpen={isActivityPageOpen}
        setIsActivityPageOpen={setIsActivityPageOpen}
        contactId={params.contactId}
      />
    </main>
  );
}
