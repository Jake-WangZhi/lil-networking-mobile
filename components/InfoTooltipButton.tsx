import { Tooltip, Typography } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import { Info, X } from "react-feather";
import { Button } from "./Button";

export const InfoTooltipButton = () => {
  const [open, setOpen] = useState(false);
  const tooltipRef = useRef<HTMLButtonElement>(null);

  const handleClick = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback((event: React.MouseEvent) => {
    event.stopPropagation();
    setOpen(false);
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event: any) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.body.addEventListener("click", handleOutsideClick);

    return () => {
      document.body.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const tooltipContent = (
    <div className="flex justify-between px-2 py-3">
      <div>
        <Typography variant="body1">
          Past due: Items that have been actionable for 10+ days
        </Typography>
        <br />
        <Typography variant="body1">
          New Actions: Items that have been actionable between 0-10 days.
        </Typography>
      </div>
      <div className="flex items-start">
        <Button variant="text" onClick={handleClose} sx={{ zIndex: 10 }}>
          <X size={24} className="md:w-7 md:h-7 lg:w-8 lg:h-8" />
        </Button>
      </div>
    </div>
  );

  return (
    <Button variant="text" onClick={handleClick} sx={{ p: "8px" }}>
      <Tooltip
        open={open}
        title={tooltipContent}
        arrow
        placement="bottom-start"
        ref={tooltipRef}
      >
        <Info
          size={32}
          fill="white"
          color="black"
          className="md:w-10 md:h-10 lg:w-12 lg:h-12"
        />
      </Tooltip>
    </Button>
  );
};
