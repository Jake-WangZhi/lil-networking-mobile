"use client";

import { ChevronLeft } from "react-feather";

import { ContactDetails } from "@/components/ContactDetails";
import { useRouter } from "next/navigation";
import { useCurrentPath } from "@/contexts/CurrentPathContext";
import { Button } from "@/components/Button";
import { useSession } from "next-auth/react";
import { useContact } from "@/hooks/useContact";

export default function ContactPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { currentPath } = useCurrentPath();

  const { data: session } = useSession();

  const { contacts, isLoading, isError } = useContact({
    email: session?.user?.email,
    id: params.id,
  });

  return (
    <main className="relative min-h-screen flex flex-col items-center text-white px-4">
      <Button
        variant="text"
        className="pt-8 w-full mb-4"
        onClick={() => router.push(currentPath)}
      >
        <ChevronLeft size={36} />
      </Button>
      <ContactDetails
        contact={contacts?.[0]}
        isError={isError}
        isLoading={isLoading}
      />
    </main>
  );
}
