"use client";

import { classNames } from "@/lib/utils";
import { MouseEvent, ReactNode } from "react";

type Props = {
  variant?: "primary" | "secondary" | "text";
  children: ReactNode;
  disabled?: boolean;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  type?: "button" | "submit" | "reset";
};

const VARIANTS: Record<string, string> = {
  primary:
    "text-black bg-light-blue active:bg-white active:bg-opacity-10 hover:bg-white hover:bg-opacity-10 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-base px-5 py-2.5 text-center w-[200px] md:w-[258px] md:text-lg lg:w-[300px] lg:text-xl disabled:text-white disabled:cursor-not-allowed disabled:bg-gray-400",
  secondary:
    "bg-white bg-opacity-5 font-medium rounded-3xl text-sm px-3 py-1.5 text-center",
  text: "disabled:pointer-events-none disabled:text-opacity-25 text-base md:text-lg lg:text-xl",
};

export const Button = ({
  children,
  disabled = false,
  variant = "primary",
  onClick,
  className = "",
  type = "button",
}: Props) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={classNames(VARIANTS[variant], className)}
      type={type}
    >
      {children}
    </button>
  );
};
