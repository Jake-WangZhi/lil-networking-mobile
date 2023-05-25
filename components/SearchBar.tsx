import { Search, Mic } from "react-feather";

export const SearchBar = () => {
  return (
    <div className="w-full h-10 bg-white bg-opacity-5 my-6 rounded-lg flex">
      <Search
        size={16}
        className="mx-2 my-auto text-grey opacity-60 md:w-5 md:h-5 lg:w-6 lg:h-6"
      />
      <input
        type="text"
        placeholder="Search contact"
        className="flex-grow bg-transparent focus:outline-none text-base md:text-lg lg:text-xl"
      />
      <Mic
        size={16}
        className="mx-2 my-auto text-grey opacity-60 md:w-5 md:h-5 lg:w-6 lg:h-6"
      />
    </div>
  );
};
