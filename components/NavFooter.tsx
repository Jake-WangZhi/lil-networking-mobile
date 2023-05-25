"use client";

import { Home, Users, Settings } from "react-feather";
import { useRouter } from "next/navigation";
import { Button } from "./Button";
import { useCurrentPath } from "@/contexts/CurrentPathContext";

interface NavItemProps {
  href: string;
  text: string;
  Icon: React.ComponentType<any>;
}

export const NavFooter = () => {
  const { currentPath, setCurrentPath } = useCurrentPath();

  const router = useRouter();

  const isActive = (path: string) => {
    return currentPath === path ? "text-white" : "text-grey-30";
  };

  const NavItem = ({ href, text, Icon }: NavItemProps) => (
    <Button
      variant="text"
      onClick={() => {
        setCurrentPath(href);
        router.push(href);
      }}
      className={`${isActive(href)}`}
    >
      <Icon size={20} className="mx-auto" />
      <div className={`text-xs leading-5`}>{text}</div>
    </Button>
  );

  return (
    <div className="fixed left-1/2 transform -translate-x-1/2 bottom-0 max-w-lg bg-dark-blue p-4 text-center flex justify-between md:max-w-xl lg:max-w-3xl w-full">
      <NavItem href="/dashboard" text="Dashboard" Icon={Home} />
      <NavItem href="/contacts" text="Contacts" Icon={Users} />
      <NavItem href="/settings" text="Settings" Icon={Settings} />
    </div>
  );
};
