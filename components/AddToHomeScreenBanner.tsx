import { X } from "react-feather";
import icon from "@/public/icons/icon-512x512.png";
import Image from "next/image";
import { Button } from "./Button";
import { Typography } from "@mui/material";
import { useState, useCallback, useEffect } from "react";

interface Props {
  withPaddingBottom: boolean;
}

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: OutcomeType;
    platform: string;
  }>;
  prompt(): Promise<void>;
}

enum OutcomeType {
  Accepted = "accepted",
  Dismissed = "dismissed",
}

export const AddToHomeScreenBanner = ({ withPaddingBottom }: Props) => {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isModalOpened, setIsModalOpened] = useState(false);

  const handleBeforeInstallPrompt = useCallback((e: Event) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    setDeferredPrompt(e as BeforeInstallPromptEvent);
    // Update UI to notify the user they can add to home screen
    setIsModalOpened(true);
  }, []);

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, [handleBeforeInstallPrompt]);

  const handleA2HSClick = useCallback(() => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((e) => {
      setDeferredPrompt(null);
      if (e.outcome === OutcomeType.Accepted) {
        setIsModalOpened(false);
      }
    });
  }, [deferredPrompt]);

  const handleClose = useCallback(() => setIsModalOpened(false), []);

  return (
    <>
      {isModalOpened && (
        <div
          className={`fixed bottom-0 left-0 right-0 w-full z-10 mx-auto max-w-lg md:max-w-xl lg:max-w-3xl px-4 py-6 bg-[#2C353E] flex justify-between ${
            withPaddingBottom && "mb-14"
          }`}
        >
          <div className="flex items-center space-x-2">
            <Button variant="text" onClick={handleClose}>
              <X size={24} />
            </Button>
            <Image src={icon} height={48} width={48} alt={"icon"} />
            <div className="pl-2">
              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                The Little Networking App
              </Typography>
              <Typography variant="subtitle2" sx={{ color: "white" }}>
                Add to Home Screen
              </Typography>
            </div>
          </div>
          <Button
            variant="text"
            onClick={handleA2HSClick}
            sx={{ color: "#38ACE2" }}
          >
            Install
          </Button>
        </div>
      )}
    </>
  );
};
