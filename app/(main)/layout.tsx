"use client";

import { NavFooter } from "@/components/NavFooter";
import { CurrentPathContext } from "@/contexts/CurrentPathContext";
import { usePathname } from "next/navigation";
import React from "react";
import { useState } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [currentPath, setCurrentPath] = useState(pathname);

  return (
    <section>
      <CurrentPathContext.Provider value={{ currentPath, setCurrentPath }}>
        {children}
        <NavFooter />
      </CurrentPathContext.Provider>
    </section>
  );
}
