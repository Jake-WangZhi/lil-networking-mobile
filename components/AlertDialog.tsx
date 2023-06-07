import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import { Dispatch, ReactNode, SetStateAction } from "react";
import { Button } from "./Button";

interface Props {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  title: string;
  description?: string;
  actionButton: ReactNode;
}

export const AlertDialog = ({
  isOpen,
  setIsOpen,
  title,
  description,
  actionButton,
}: Props) => {
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title" className="text-white text-center">
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          id="alert-dialog-description"
          className="text-white text-center"
        >
          {description}
        </DialogContentText>
      </DialogContent>
      <DialogActions className="justify-center">
        <div className="flex flex-col items-center justify-center space-y-4">
          {actionButton}
          <Button
            variant="text"
            onClick={handleClose}
            customStyles={{ zIndex: 10, py: "14px", width: "221px" }}
          >
            Cancel
          </Button>
        </div>
      </DialogActions>
    </Dialog>
  );
};
