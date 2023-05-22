import { ContactList } from "@/components/ContactList";
import { Header } from "@/components/Header";
import { SearchBar } from "@/components/SearchBar";

export default function ContactsPage() {
  return (
    <main className="relative min-h-screen flex flex-col items-center text-white px-4">
      <Header />
      <SearchBar />
      <ContactList />
    </main>
  );
}
