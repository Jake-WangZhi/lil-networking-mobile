"use client";

import { BackPathContext } from "@/contexts/BackPathContext";
import { usePathname } from "next/navigation";
import React from "react";
import { useState } from "react";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [backPath, setBackPath] = useState(`/${pathname?.split("/")[1]}`);

  return (
    <section>
      <BackPathContext.Provider value={{ backPath, setBackPath }}>
        {children}
      </BackPathContext.Provider>
    </section>
  );
}
