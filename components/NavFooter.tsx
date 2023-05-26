"use client";

import { Home, Users, Settings } from "react-feather";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItemProps {
  href: string;
  text: string;
  Icon: React.ComponentType<any>;
}

export const NavFooter = () => {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path ? "text-white" : "text-gray-300";
  };

  const NavItem = ({ href, text, Icon }: NavItemProps) => (
    <Link href={href}>
      <div className={`text-xs flex flex-col items-center ${isActive(href)}`}>
        <Icon className="w-5 h-5 mx-auto mb-1" />
        {text}
      </div>
    </Link>
  );

  return (
    <div className="fixed left-1/2 transform -translate-x-1/2 bottom-0 max-w-lg bg-dark-blue p-4 text-center flex justify-between md:max-w-xl lg:max-w-3xl w-full">
      <NavItem href="/dashboard" text="Dashboard" Icon={Home} />
      <NavItem href="/contacts" text="Contacts" Icon={Users} />
      <NavItem href="/settings" text="Settings" Icon={Settings} />
    </div>
  );
};
