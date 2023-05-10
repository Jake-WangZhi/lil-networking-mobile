"use client";

import { createContact } from "@/app/_actions";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { Button } from "./Button";
import { Modal } from "./Modal";

export const ContactFormModal = () => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex justify-center m-8">
      <Button
        type="button"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        {"+ Add Contact"}
      </Button>
      <Modal
        title={"Create Contact"}
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
      >
        {/* @ts-expect-error Async Server Component */}
        <form action={createContact}>
          <div className="mb-6">
            <label className="block mb-2 text-md font-medium text-gray-900 dark:text-white">
              Name
            </label>
            <input
              type="name"
              id="name"
              name="name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Contact Name"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-md font-medium text-gray-900 dark:text-white">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="name@example.com"
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-md font-medium text-gray-900 dark:text-white">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="5555555555"
              pattern="[0-9]{10}"
              title="Please enter a valid 10-digit U.S. phone number"
              autoComplete="tel"
            />
          </div>
          <input
            id="userEmail"
            name="userEmail"
            type="hidden"
            defaultValue={session?.user?.email || ""}
          />
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-md px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-6"
          >
            Submit
          </button>
        </form>
      </Modal>
    </div>
  );
};
