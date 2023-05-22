"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { ClipLoader } from "react-spinners";
import { ContactCard } from "./ContactCard";
import { Contact } from "@/types";

export const ContactList = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const email = session?.user?.email;
    if (email) {
      fetchContactsBasedOnEmail(email);
    }
  }, [session]);

  const fetchContactsBasedOnEmail = async (email: string) => {
    try {
      const response = await fetch(`/contacts/api?email=${email}`);
      const data = await response.json();

      if (response.ok) {
        const contacts = data.contacts;
        setContacts(contacts);
      } else {
        throw new Error(response.statusText);
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (error) {
    return (
      <div className="flex items-center justify-center text-3xl text-red-400">
        {error}
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <ClipLoader color="#38ACE2" size={150} />
      </div>
    );
  }

  return (
    <div className="w-full mb-20">
      <h6 className="mb-2 md:text-xl lg:text-2xl">{`All Contacts (${contacts.length})`}</h6>
      {contacts.map((contact, index) => (
        <ContactCard key={index} contact={contact} />
      ))}
    </div>
  );
};
