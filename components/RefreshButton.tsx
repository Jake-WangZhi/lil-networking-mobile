"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";

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
