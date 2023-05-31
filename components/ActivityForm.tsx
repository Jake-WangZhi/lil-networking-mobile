import { Dispatch, SetStateAction } from "react";
import { X, Minus } from "react-feather";
import { Button } from "./Button";
import { createActivity } from "@/app/_actions";
import { useSwipeable } from "react-swipeable";

interface Props {
  isOpen: boolean;
  setIsActivityPageOpen: Dispatch<SetStateAction<boolean>>;
  contactId: string;
}

export const ActivityForm = ({
  isOpen,
  setIsActivityPageOpen,
  contactId,
}: Props) => {
  const handlers = useSwipeable({
    onSwipedDown: () => {
      setIsActivityPageOpen(false);
    },
    swipeDuration: 500,
    preventScrollOnSwipe: true,
    trackMouse: true,
    trackTouch: true,
  });

  return (
    <div
      className={`bg-dark-blue absolute z-10 inset-0 w-full h-full px-4 transition-transform duration-500 ${
        isOpen ? "translate-y-0" : "translate-y-full"
      }`}
      {...handlers}
    >
      <div className="flex justify-center">
        <Minus size={56} />
      </div>
      <div className="flex justify-between mb-2">
        <div className="text-2xl font-semibold md:text-3xl lg:text-4xl">
          Log New Activity
        </div>
        <Button variant="text" onClick={() => setIsActivityPageOpen(false)}>
          <X size={32} className="md:w-11 md:h-11 lg:w-13 lg:h-13" />
        </Button>
      </div>
      <div className="text-sm md:text-base lg:text-lg">Track interactions</div>
      <div>
        {/* @ts-expect-error Async Server Component */}
        <form action={createActivity} className="w-full pt-8">
          <div className="mb-4 flex items-center justify-between">
            <label className="block text-base font-medium text-white md:text-lg lg:text-xl">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="text-base rounded-[4px] block w-[260px] h-8 p-2.5 bg-white bg-opacity-5  placeholder-gray-400 text-white md:text-lg lg:text-xl focus:ring-1 focus:ring-white focus:bg-white focus:bg-opacity-[0.12] focus:outline-none appearance-none caret-white"
              required
            />
          </div>

          <div className="mb-4 flex items-center justify-between">
            <label className="block text-base font-medium text-white md:text-lg lg:text-xl">
              Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              style={{ colorScheme: "dark" }}
              className="text-base rounded-[4px] w-[260px] h-8 p-2.5 bg-white bg-opacity-5 placeholder-gray-400 text-white md:text-lg lg:text-xl focus:ring-1 focus:ring-white focus:bg-white focus:bg-opacity-[0.12] focus:outline-none appearance-none caret-white"
              required
            />
          </div>
          <div className="space-y-1">
            <label className="block text-base font-medium text-white md:text-lg lg:text-xl">
              Activity Details
            </label>
            <textarea
              id="description"
              name="description"
              className="text-base rounded-[4px] block p-2.5 w-full h-56 bg-white bg-opacity-5 placeholder-gray-400 text-white md:text-lg lg:text-xl focus:ring-1 focus:ring-white focus:bg-white focus:bg-opacity-[0.12] focus:outline-none appearance-none caret-white"
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
