"use client";

import { createContact } from "@/app/_actions";
import { Button } from "@/components/Button";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { ChevronLeft, PlusCircle } from "react-feather";
import { ReactNode, useState } from "react";

export default function Create() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const router = useRouter();
  const [links, setLinks] = useState([""]);

  const handleAddLink = () => {
    setLinks([...links, ""]); // Add an empty link to the array
  };

  const handleLinkChange = (index: number, value: string) => {
    const updatedLinks = [...links];
    updatedLinks[index] = value;
    setLinks(updatedLinks);
  };

  return (
    <main className="relative min-h-screen flex flex-col items-center text-white px-4">
      {/* @ts-expect-error Async Server Component */}
      <form action={createContact} className="w-full pt-8">
        <div className="flex items-center justify-between mb-9">
          <Button variant="text" onClick={() => router.back()}>
            <ChevronLeft size={36} />
          </Button>
          <h1 className="text-xl">Create contact</h1>
          <Button type="submit" variant="text" className="text-light-blue">
            Save
          </Button>
        </div>

        <div className="mb-4 flex items-center justify-between">
          <label className="block text-md font-medium text-white">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            className="border text-md rounded-[4px] block w-[260px] h-8 p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div className="mb-4 flex items-center justify-between">
          <label className="block text-md font-medium text-white">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            className="border text-md rounded-[4px] block w-[260px] h-8 p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div className="mb-4 flex items-center justify-between">
          <label className="block text-md font-medium text-white">
            Company
          </label>
          <input
            type="text"
            id="company"
            name="company"
            className="border text-md rounded-[4px] block w-[260px] h-8 p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4 flex items-center justify-between">
          <label className="block text-md font-medium text-white">
            Industry
          </label>
          <input
            type="text"
            id="industry"
            name="industry"
            className="border text-md rounded-[4px] block w-[260px] h-8 p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div className="mb-4 flex items-center justify-between">
          <label className="block text-md font-medium text-white">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className="border text-md rounded-[4px] block w-[260px] h-8 p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div className="mb-4 flex items-center justify-between">
          <label className="block text-md font-medium text-white">Phone</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className="border text-md rounded-[4px] block w-[260px] h-8 p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
            pattern="[0-9]{10}"
            title="Please enter a valid 10-digit U.S. phone number"
            autoComplete="tel"
          />
        </div>

        {links.map((link, index) => (
          <div key={index} className="mb-4 flex items-center justify-between">
            <label className="block text-md font-medium text-white">
              {index === 0 && "Link"}
            </label>
            <input
              type="text"
              className="border text-md rounded-[4px] block w-[260px] h-8 p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
              onChange={(e) => handleLinkChange(index, e.target.value)}
              required
            />
          </div>
        ))}
        <div className="flex justify-end">
          <Button
            variant="text"
            className="flex space-x-1"
            onClick={handleAddLink}
          >
            <PlusCircle size={20} />
            <div className="text-sm">Add Link</div>
          </Button>
        </div>

        <input
          id="userEmail"
          name="userEmail"
          type="hidden"
          defaultValue={session?.user?.email || ""}
        />
        <input id="links" name="links" type="hidden" defaultValue={links} />
      </form>
    </main>
  );
}
