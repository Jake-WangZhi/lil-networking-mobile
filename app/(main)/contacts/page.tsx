"use client";

import { Button } from "@/components/Button";
import { ContactList } from "@/components/ContactList";
import { SearchBar } from "@/components/SearchBar";
import { useContacts } from "@/hooks/useContacts";
import { Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { PlusSquare } from "react-feather";

export default function ContactsPage() {
  const { data: session } = useSession();
  const router = useRouter();

  const { contacts, isLoading, isError } = useContacts({
    email: session?.user?.email,
  });

  return (
    <main className="relative min-h-screen flex flex-col items-center text-white px-4">
      <div className="sticky top-0 w-full bg-dark-blue z-10">
        <div className="pt-8 w-full">
          <div className="flex justify-between items-center">
            <Typography variant="h1">All Contacts</Typography>
            <Button
              variant="text"
              onClick={() => router.push("/contacts/create")}
              customStyles={{ p: "8px" }}
            >
              <PlusSquare
                size={32}
                className="md:w-10 md:h-10 lg:w-12 lg:h-12"
              />
            </Button>
          </div>
        </div>
        <SearchBar />
      </div>
      <ContactList
        contacts={contacts}
        isLoading={isLoading}
        isError={isError}
      />
    </main>
  );
}
