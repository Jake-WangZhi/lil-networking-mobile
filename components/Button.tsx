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
    "text-white bg-light-blue hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-base px-5 py-2.5 text-center w-[200px] md:w-[258px] md:text-lg lg:w-[300px] lg:text-xl disabled:text-white disabled:cursor-not-allowed disabled:bg-gray-400",
  secondary:
    "w-full flex items-center justify-center py-2 bg-transparent border rounded text-tertiary border-tertiary hover:bg-tertiary hover:bg-opacity-5 focus:border-2 active:bg-tertiary active:bg-opacity-5 active:border disabled:text-white disabled:cursor-not-allowed disabled:bg-gray-400",
  text: "disabled:pointer-events-none disabled:text-opacity-25 text-white text-base md:text-base lg:text-lg",
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
