"use client";

import { updateContact } from "@/app/_actions";
import { Button } from "@/components/Button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ChevronLeft, PlusCircle } from "react-feather";
import { useCallback, useEffect, useState } from "react";
// @ts-ignore
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";
import "../../styles.css";
import { useContact } from "@/hooks/useContact";

export default function EditPage({
  params,
}: {
  params: { contactId: string };
}) {
  const { data: session } = useSession();
  const { contact } = useContact({
    id: params.contactId,
  });

  const router = useRouter();
  const [firstName, setFirstName] = useState(contact?.firstName);
  const [lastName, setLastName] = useState(contact?.lastName);
  const [title, setTitle] = useState(contact?.title);
  const [company, setCompany] = useState(contact?.company);
  const [industry, setIndustry] = useState(contact?.industry);
  const [email, setEmail] = useState(contact?.email);
  const [phone, setPhone] = useState(contact?.phone);
  const [links, setLinks] = useState<string[]>([]);
  const [selectedGoalDays, setSelectedGoalDays] = useState(30);
  const [tags, setTags] = useState<string[]>([]);

  const handleChange = (tags: string[]) => {
    setTags(tags);
  };

  const handleAddLink = useCallback(() => {
    setLinks((prevLinks) => [...prevLinks, ""]);
  }, []);

  const handleLinkChange = useCallback((index: number, value: string) => {
    setLinks((prevLinks) => {
      const updatedLinks = [...prevLinks];
      updatedLinks[index] = value;
      return updatedLinks;
    });
  }, []);

  const handleButtonClick = useCallback((goalDays: number) => {
    setSelectedGoalDays(goalDays);
  }, []);

  useEffect(() => {
    if (contact) {
      const { links: curLinks, goalDays, interests } = contact;
      setLinks(curLinks ?? []);
      setSelectedGoalDays(goalDays ?? 30);
      setTags(interests ?? []);
    }
  }, [contact]);

  return (
    <main className="relative min-h-screen flex flex-col items-center text-white px-4">
      {/* @ts-expect-error Async Server Component */}
      <form action={updateContact} className="w-full pt-8">
        <div className="flex items-center justify-between mb-9">
          <button onClick={() => router.back()}>
            <ChevronLeft size={36} color="#737373" />
          </button>
          <h1 className="text-xl">Edit contact</h1>
          <button
            type="submit"
            className="text-light-blue text-base md:text-lg lg:text-xl"
          >
            Save
          </button>
        </div>

        <div className="mb-4 flex items-center justify-between">
          <label className="block text-base font-medium text-white md:text-lg lg:text-xl">
            First Name*
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="text-base rounded-[4px] block w-[260px] h-8 p-2.5 bg-white bg-opacity-5  placeholder-gray-400 text-white md:text-lg lg:text-xl focus:ring-1 focus:ring-white focus:bg-white focus:bg-opacity-[0.12] focus:outline-none appearance-none caret-white"
            required
          />
        </div>

        <div className="mb-4 flex items-center justify-between">
          <label className="block text-base font-medium text-white md:text-lg lg:text-xl">
            Last Name*
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="text-base rounded-[4px] block w-[260px] h-8 p-2.5 bg-white bg-opacity-5  placeholder-gray-400 text-white md:text-lg lg:text-xl focus:ring-1 focus:ring-white focus:bg-white focus:bg-opacity-[0.12] focus:outline-none appearance-none caret-white"
            required
          />
        </div>

        <div className="mb-4 flex items-center justify-between">
          <label className="block text-base font-medium text-white md:text-lg lg:text-xl">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-base rounded-[4px] block w-[260px] h-8 p-2.5 bg-white bg-opacity-5 placeholder-gray-400 text-white md:text-lg lg:text-xl focus:ring-1 focus:ring-white focus:bg-white focus:bg-opacity-[0.12] focus:outline-none appearance-none caret-white"
          />
        </div>

        <div className="mb-4 flex items-center justify-between">
          <label className="block text-base font-medium text-white md:text-lg lg:text-xl">
            Company
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="text-base rounded-[4px] block w-[260px] h-8 p-2.5 bg-white bg-opacity-5  placeholder-gray-400 text-white md:text-lg lg:text-xl focus:ring-1 focus:ring-white focus:bg-white focus:bg-opacity-[0.12] focus:outline-none appearance-none caret-white"
          />
        </div>

        <div className="mb-4 flex items-center justify-between">
          <label className="block text-base font-medium text-white md:text-lg lg:text-xl">
            Industry*
          </label>
          <input
            type="text"
            id="industry"
            name="industry"
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            className="text-base rounded-[4px] block w-[260px] h-8 p-2.5 bg-white bg-opacity-5  placeholder-gray-400 text-white md:text-lg lg:text-xl focus:ring-1 focus:ring-white focus:bg-white focus:bg-opacity-[0.12] focus:outline-none appearance-none caret-white"
            required
          />
        </div>

        <div className="mb-4 flex items-center justify-between">
          <div className="text-base md:text-lg lg:text-xl">Goal*</div>
          <div className="block w-[260px] h-8 space-x-1">
            <Button
              variant="secondary"
              type="button"
              className={`${
                selectedGoalDays === 30 &&
                "border border-1 border-light-blue text-light-blue"
              }`}
              onClick={() => handleButtonClick(30)}
            >
              30 days
            </Button>
            <Button
              variant="secondary"
              type="button"
              className={`${
                selectedGoalDays === 60 &&
                "border border-1 border-light-blue text-light-blue"
              }`}
              onClick={() => handleButtonClick(60)}
            >
              60 days
            </Button>
            <Button
              variant="secondary"
              type="button"
              className={`${
                selectedGoalDays === 90 &&
                "border border-1 border-light-blue text-light-blue"
              }`}
              onClick={() => handleButtonClick(90)}
            >
              90 days
            </Button>
          </div>
        </div>

        <div className="mb-4 flex items-center justify-between">
          <label className="block text-base font-medium text-white md:text-lg lg:text-xl">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="text-base rounded-[4px] block w-[260px] h-8 p-2.5 bg-white bg-opacity-5  placeholder-gray-400 text-white md:text-lg lg:text-xl focus:ring-1 focus:ring-white focus:bg-white focus:bg-opacity-[0.12] focus:outline-none appearance-none caret-white"
          />
        </div>

        <div className="mb-4 flex items-center justify-between">
          <label className="block text-base font-medium text-white md:text-lg lg:text-xl">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="text-base rounded-[4px] block w-[260px] h-8 p-2.5 bg-white bg-opacity-5  placeholder-gray-400 text-white md:text-lg lg:text-xl focus:ring-1 focus:ring-white focus:bg-white focus:bg-opacity-[0.12] focus:outline-none appearance-none caret-white"
            pattern="[0-9]{10}"
            title="Please enter a valid 10-digit U.S. phone number"
            autoComplete="tel"
          />
        </div>

        {links.map((link, index) => (
          <div key={index} className="mb-4 flex items-center justify-between">
            <label className="block text-base font-medium text-white md:text-lg lg:text-xl">
              {index === 0 && "Link"}
            </label>
            <input
              type="text"
              value={link}
              className="text-base rounded-[4px] block w-[260px] h-8 p-2.5 bg-white bg-opacity-5  placeholder-gray-400 text-white md:text-lg lg:text-xl focus:ring-1 focus:ring-white focus:bg-white focus:bg-opacity-[0.12] focus:outline-none appearance-none caret-white"
              onChange={(e) => handleLinkChange(index, e.target.value)}
            />
          </div>
        ))}
        <div className="flex justify-end">
          <button
            className="flex space-x-1 mb-5 items-center"
            onClick={handleAddLink}
          >
            <PlusCircle size={20} className="md:w-6 md:h-6 lg:w-8 lg:h-8" />
            <div className="text-sm md:text-base lg:text-lg">Add Link</div>
          </button>
        </div>

        <div className="mb-20 space-y-2">
          <label className="text-base md:text-lg lg:text-xl">Interests</label>
          <TagsInput
            value={tags}
            onChange={handleChange}
            inputProps={{ placeholder: "" }}
            focusedClassName="ring-1 ring-white outline-none appearance-none caret-white"
            className="rounded-xl block w-full h-[160px] p-2.5 bg-white bg-opacity-5 overflow-auto"
          />
        </div>

        <input id="id" name="id" type="hidden" defaultValue={contact?.id} />
        <input
          id="userEmail"
          name="userEmail"
          type="hidden"
          defaultValue={session?.user?.email || ""}
        />
        <input id="links" name="links" type="hidden" defaultValue={links} />
        <input
          id="goalDays"
          name="goalDays"
          type="hidden"
          defaultValue={selectedGoalDays}
        />
        <input
          id="interests"
          name="interests"
          type="hidden"
          defaultValue={tags}
        />
      </form>
    </main>
  );
}
