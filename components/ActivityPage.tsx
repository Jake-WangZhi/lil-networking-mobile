import { Dispatch, SetStateAction } from "react";
import { X, Minus } from "react-feather";
import { Button } from "./Button";
import { createActivity } from "@/app/_actions";

interface Props {
  isOpen: boolean;
  setIsActivityPageOpen: Dispatch<SetStateAction<boolean>>;
  contactId: string;
}

export const ActivityPage = ({
  isOpen,
  setIsActivityPageOpen,
  contactId,
}: Props) => {
  return (
    <div
      className={`bg-dark-blue absolute inset-0 w-full h-full px-4 transition-transform duration-500 ${
        isOpen ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="flex justify-center">
        <Minus size={56} />
      </div>
      <div className="flex justify-between mb-2">
        <div className="text-2xl font-semibold">Log New Activity</div>
        <Button variant="text" onClick={() => setIsActivityPageOpen(false)}>
          <X size={32} />
        </Button>
      </div>
      <div className="text-sm">Track interactions</div>
      <div>
        {/* @ts-expect-error Async Server Component */}
        <form action={createActivity} className="w-full pt-8">
          <div className="mb-4 flex items-center justify-between">
            <label className="block text-md font-medium text-white">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="text-md rounded-[4px] block w-[260px] h-8 p-2.5 bg-white bg-opacity-5  placeholder-gray-400 text-white focus:ring-1 focus:ring-white focus:outline-none appearance-none caret-white"
              required
            />
          </div>

          <div className="mb-4 flex items-center justify-between">
            <label className="block text-md font-medium text-white">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              style={{ colorScheme: "dark" }}
              className="text-md rounded-[4px] block w-[260px] h-8 p-2.5 bg-white bg-opacity-5  placeholder-gray-400 text-white focus:ring-1 focus:ring-white focus:outline-none appearance-none caret-white"
              required
            />
          </div>
          <div className="space-y-1">
            <label className="block text-md font-medium text-white">
              Activity Details
            </label>
            <textarea
              id="description"
              name="description"
              className="text-md rounded-[4px] block p-2.5 w-full h-56 bg-white bg-opacity-5  placeholder-gray-400 text-white focus:ring-1 focus:ring-white focus:outline-none appearance-none caret-white"
            />
          </div>

          <input
            id="contactId"
            name="contactId"
            type="hidden"
            defaultValue={contactId}
          />

          <div className="flex justify-center mt-8">
            <Button type="submit" variant="primary">
              Log Activity
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
