"use client";

import { classNames } from "@/lib/utils";
import { MouseEvent, ReactNode } from "react";
import Ripples from "react-ripples";

type Props = {
  variant?: "primary" | "secondary";
  children: ReactNode;
  disabled?: boolean;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  type?: "button" | "submit" | "reset";
};

const VARIANTS: Record<string, string> = {
  primary:
    "text-black bg-light-blue font-medium rounded-full text-base px-5 py-2.5 text-center w-[200px] md:w-[258px] md:text-lg lg:w-[300px] lg:text-xl disabled:text-white disabled:cursor-not-allowed disabled:bg-gray-400",
  secondary:
    "bg-white bg-opacity-5 font-medium rounded-full text-sm px-3 py-1.5 text-center w-[84px]",
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
    <Ripples
      color="rgba(255, 255, 255, 0.1)"
      className="rounded-full overflow-hidden"
    >
      <button
        onClick={onClick}
        disabled={disabled}
        className={classNames(VARIANTS[variant], className)}
        type={type}
      >
        {children}
      </button>
    </Ripples>
  );
};
