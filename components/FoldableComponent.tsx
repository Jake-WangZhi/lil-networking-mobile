"use client";

import { useState } from "react";
import { ChevronUp, ChevronDown } from "react-feather";
import { ReactNode } from "react";

interface Props {
  title: ReactNode;
  content: ReactNode;
}

const FoldableComponent = ({ title, content }: Props) => {
  const [isFolded, setIsFolded] = useState(false);

  const toggleFold = () => {
    setIsFolded(!isFolded);
  };

  return (
    <div className="mb-8">
      <div className="flex justify-between">
        {title}
        <button onClick={toggleFold} className="text-white">
          {isFolded ? (
            <ChevronDown className="md:w-6 md:h-6 lg:w-8 lg:h-8" />
          ) : (
            <ChevronUp className="md:w-6 md:h-6 lg:w-8 lg:h-8" />
          )}
        </button>
      </div>
      {!isFolded && <div className="mt-4">{content}</div>}
    </div>
  );
};

export default FoldableComponent;
