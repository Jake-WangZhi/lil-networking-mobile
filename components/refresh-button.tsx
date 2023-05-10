"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Button } from "./button";

export default function RefreshButton() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      className={`${isPending ? "cursor-not-allowed" : ""}`}
      disabled={isPending}
      onClick={() => {
        startTransition(() => {
          router.refresh();
        });
      }}
      variant="text"
    >
      {isPending ? "Refreshing..." : "Refresh"}
    </Button>
  );
}
