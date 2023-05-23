import { Dialog } from "@headlessui/react";
import { ReactNode } from "react";
import { XCircle } from "react-feather";
import { Button } from "./Button";
interface ModalProps {
  title?: string | ReactNode;
  description?: string;
  isOpen: boolean;
  children: React.ReactNode;
  onClose: () => void;
}

export const Modal = ({
  children,
  isOpen,
  onClose,
  title,
  description,
}: ModalProps) => {
  return (
    <Dialog
      className="fixed inset-0 z-20 mx-auto max-w-xl"
      open={isOpen}
      onClose={onClose}
    >
      <div className="flex min-h-screen justify-center px-4 pt-4 pb-20 text-center">
        <Dialog.Overlay className="fixed inset-0 bg-neutral-800 bg-opacity-80 transition-opacity" />
        <div className="m-auto inline-block w-full transform rounded bg-white text-left align-bottom shadow-xl transition-all">
          <div className="bg-gray-900 px-4 pt-5 pb-7">
            <div className="flex flex-row content-start justify-between text-white">
              {title instanceof String ? (
                <Dialog.Title>{title}</Dialog.Title>
              ) : (
                title
              )}
              {description && (
                <Dialog.Description className="text-sm">
                  {description}
                </Dialog.Description>
              )}
            </div>
            <div className="mt-5">{children}</div>
            <Button
              variant="text"
              className="absolute -top-5 -right-4 m-2 rounded-full bg-black text-white"
              onClick={onClose}
            >
              <XCircle className="text-4xl" />
            </Button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};
