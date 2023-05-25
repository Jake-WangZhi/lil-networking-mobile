"use client";

import { ContactList } from "@/components/ContactList";
import { Header } from "@/components/Header";
import { SearchBar } from "@/components/SearchBar";
import { useContact } from "@/hooks/useContact";
import { useSession } from "next-auth/react";

export default function ContactsPage() {
  const { data: session } = useSession();

  const { contacts, isLoading, isError } = useContact({
    email: session?.user?.email,
  });

  return (
    <main className="relative min-h-screen flex flex-col items-center text-white px-4">
      <Header />
      <SearchBar />
      <ContactList
        contacts={contacts}
        isLoading={isLoading}
        isError={isError}
      />
    </main>
  );
}
