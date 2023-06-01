"use client";

import { useSession } from "next-auth/react";
import { PlusSquare } from "react-feather";
import { useRouter } from "next/navigation";

export const Header = () => {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <>
      <div className="pt-8 w-full">
        <div className="flex justify-between items-center">
          <div className="text-3xl font-semibold md:text-5xl">
            Hi, {session?.user?.name?.split(" ")[0]}!
          </div>
          <button
            type="button"
            onClick={() => router.push("/contacts/create")}
            className="text-white"
          >
            <PlusSquare size={32} className="md:w-10 md:h-10 lg:w-12 lg:h-12" />
          </button>
        </div>
      </div>
    </>
  );
};
