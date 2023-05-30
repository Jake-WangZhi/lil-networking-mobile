"use client";

import { ContactList } from "@/components/ContactList";
import { Header } from "@/components/Header";
import { SearchBar } from "@/components/SearchBar";
import { useContacts } from "@/hooks/useContacts";
import { useSession } from "next-auth/react";

export default function ContactsPage() {
  const { data: session } = useSession();

  const { contacts, isLoading, isError } = useContacts({
    email: session?.user?.email,
  });

  return (
    <main className="relative min-h-screen flex flex-col items-center text-white px-4">
      <div className="sticky top-0 w-full bg-dark-blue z-10">
        <Header />
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
