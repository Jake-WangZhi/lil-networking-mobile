"use client";

import { useState } from "react";
import { ChevronUp, ChevronDown } from "react-feather";
import { ReactNode } from "react";

interface Props {
  title: ReactNode;
  content: ReactNode;
}

export const FoldableComponent = ({ title, content }: Props) => {
  const [isFolded, setIsFolded] = useState(false);

  const toggleFold = () => {
    setIsFolded(!isFolded);
  };

  return (
    <div className="mb-6">
      <div className="flex justify-between py-3">
        {title}
        <button type="button" onClick={toggleFold} className="text-white">
          {isFolded ? (
            <ChevronDown className="md:w-6 md:h-6 lg:w-8 lg:h-8" />
          ) : (
            <ChevronUp className="md:w-6 md:h-6 lg:w-8 lg:h-8" />
          )}
        </button>
      </div>
      {!isFolded && <div className="mt-2">{content}</div>}
    </div>
  );
};
