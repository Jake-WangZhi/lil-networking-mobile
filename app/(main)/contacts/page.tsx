"use client";

import { Button } from "@/components/Button";
import { ContactList } from "@/components/ContactList";
import { NavFooter } from "@/components/NavFooter";
import { SearchBar } from "@/components/SearchBar";
import { useContacts } from "@/hooks/useContacts";
import { Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PlusSquare } from "react-feather";

export default function ContactsPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [name, setName] = useState("");

  const { contacts, isLoading, isError } = useContacts({
    userEmail: session?.user?.email,
    name,
  });

  return (
    <main className="relative flex flex-col items-center text-white px-4">
      <div className="sticky top-0 w-full bg-dark-blue z-10 pt-8">
        <div className="flex justify-between items-center">
          <Typography variant="h1">All Contacts</Typography>
          <Button
            variant="text"
            onClick={() => router.push("/contacts/create")}
            sx={{ p: "8px" }}
          >
            <PlusSquare
              size={32}
              color={"#38ACE2"}
              className="md:w-10 md:h-10 lg:w-12 lg:h-12"
            />
          </Button>
        </div>
        {(name || (!isError && !isLoading && contacts?.length !== 0)) && (
          <SearchBar name={name} setName={setName} />
        )}
      </div>
      <ContactList
        contacts={contacts}
        isLoading={isLoading}
        isError={isError}
        name={name}
      />
      <NavFooter />
    </main>
  );
}
