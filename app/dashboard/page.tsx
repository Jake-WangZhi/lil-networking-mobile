import ContactFormModal from "@/components/ContactFormModal";
import DashboardHeader from "@/components/DashboardHeader";
import { Divider } from "@/components/Divider";
import TablePlaceholder from "@/components/TablePlaceholder";
import Table from "@/components/Table";

import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

export default function DashboardPage() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-between text-white px-5">
      <DashboardHeader />
      <div className="w-full">
        <Suspense fallback={<TablePlaceholder />}>
          {/* @ts-expect-error Async Server Component */}
          <Table type="users" />
        </Suspense>

        <Divider />

        <Suspense fallback={<TablePlaceholder />}>
          {/* @ts-expect-error Async Server Component */}
          <Table type="contacts" />
        </Suspense>

        <ContactFormModal />
      </div>
      <div className="w-full px-20 py-10 flex justify-between">
        <Link href="https://vercel.com">
          <Image
            src="/vercel.svg"
            alt="Vercel Logo"
            width={100}
            height={24}
            priority
          />
        </Link>
        <Link
          href="https://github.com/vercel/examples/tree/main/storage/postgres-prisma"
          className="flex items-center space-x-2"
        >
          <Image
            src="/github.svg"
            alt="GitHub Logo"
            width={24}
            height={24}
            priority
          />
          <p className="font-light">Source</p>
        </Link>
      </div>
    </main>
  );
}
