"use client";

import { useState } from "react";
import { Button } from "./Button";
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
    <div className="mb-4">
      <div className="flex justify-between">
        {title}
        <Button onClick={toggleFold} variant="text">
          {isFolded ? <ChevronDown /> : <ChevronUp />}
        </Button>
      </div>
      {!isFolded && <div className="mt-4">{content}</div>}
    </div>
  );
};

export default FoldableComponent;
