import prisma from "@/lib/prisma";
import { timeAgo } from "@/lib/utils";
import Image from "next/image";
import placeholderProfileImage from "../public/images/placeholder_profile_image.svg";

type Props = {
  type: "users" | "contacts";
};

export default async function Table({ type }: Props) {
  const startTime = Date.now();
  const data =
    type === "users"
      ? await prisma.users.findMany()
      : await prisma.contacts.findMany();
  const duration = Date.now() - startTime;

  return (
    <div className="bg-white/30 p-12 shadow-xl ring-1 ring-gray-900/5 rounded-lg backdrop-blur-lg md:max-w-xl lg:max-w-2xl mx-auto w-full">
      <div className="flex justify-between items-center mb-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold">
            Recent {type === "users" ? "Users" : "Contacts"}
          </h2>
          <p className="text-sm">
            Fetched {data.length} {type === "users" ? "users" : "contacts"} in{" "}
            {duration}ms
          </p>
        </div>
        <RefreshButton />
      </div>
      <div className="divide-y divide-gray-900/5">
        {data.map((item) => (
          <div key={item.id} className="flex items-center justify-between py-3">
            <div className="flex items-center space-x-4">
              <Image
                src={item.picture ?? placeholderProfileImage}
                alt={item.name}
                width={48}
                height={48}
                className="rounded-full ring-1 ring-gray-900/5"
              />
              <div className="space-y-1">
                <p className="font-medium leading-none">{item.name}</p>
                <p className="text-sm">{item.email}</p>
              </div>
            </div>
            <p className="text-sm">{timeAgo(item.updatedAt)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
