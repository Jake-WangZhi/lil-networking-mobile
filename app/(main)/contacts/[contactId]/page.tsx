"use client";

import { ChevronLeft } from "react-feather";
import { ContactDetails } from "@/components/ContactDetails";
import { useRouter } from "next/navigation";
import { useCurrentPath } from "@/contexts/CurrentPathContext";
import { Button } from "@/components/Button";
import { useContact } from "@/hooks/useContact";
import { ActivityPage } from "@/components/ActivityPage";
import { useState } from "react";

export default function ContactPage({
  params,
}: {
  params: { contactId: string };
}) {
  const router = useRouter();
  const { currentPath } = useCurrentPath();

  const { contact, isLoading, isError } = useContact({
    id: params.contactId,
  });

  const [isActivityPageOpen, setIsActivityPageOpen] = useState(false);

  return (
    <main className="relative min-h-screen text-white px-4 overflow-hidden">
      <Button
        variant="text"
        className="relative pt-8 w-full mb-4 -ml-3"
        onClick={() => router.push(currentPath)}
      >
        <ChevronLeft
          size={36}
          color="#737373"
          className="md:w-11 md:h-11 lg:w-13 lg:h-13"
        />
      </Button>

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
