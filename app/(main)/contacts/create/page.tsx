"use client";

import "react-tagsinput/react-tagsinput.css";
import "../styles.css";
import { useSession } from "next-auth/react";
import { ContactForm } from "@/components/ContactForm";

export default function CreatePage() {
  const { data: session } = useSession();
  return <ContactForm userEmail={session?.user?.email} />;
}
