"use client";

import { createContact } from "@/app/_actions";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { Button } from "./Button";
import { Modal } from "./Modal";
import { PlusSquare } from "react-feather";

export const ContactFormModal = () => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex justify-center">
      <Button
        variant="text"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        <PlusSquare size={32} className="md:w-10 md:h-10 lg:w-12 lg:h-12" />
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
            <label className="block mb-2 text-md font-medium text-white">
              Name
            </label>
            <input
              type="name"
              id="name"
              name="name"
              className="border text-md rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
              placeholder="Add Contact Name Here"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-md font-medium text-white">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="border text-md rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
              placeholder="name@example.com"
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-md font-medium text-white">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className="border text-md rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
              placeholder="5555555555"
              pattern="[0-9]{10}"
              title="Please enter a valid 10-digit U.S. phone number"
              autoComplete="tel"
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-md font-medium text-white">
              Category
            </label>
            <input
              type="text"
              id="category"
              name="category"
              className="border text-md rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
              placeholder="Add Contact Category here"
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-md font-medium text-white">
              Reach Out Days
            </label>
            <input
              type="number"
              id="goalDays"
              name="goalDays"
              className="border text-md rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
              placeholder="Add Reach Out Days Here"
              defaultValue={30}
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-md font-medium text-white">
              Note
            </label>
            <input
              type="text"
              id="note"
              name="note"
              className="border text-md rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
              placeholder="Add Note here"
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
