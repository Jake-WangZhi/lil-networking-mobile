"use client";

import { Button } from "@/components/Button";
import { useQuote } from "@/hooks/useQuote";
import { Typography } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { ClipLoader } from "react-spinners";

export default function QuotePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { quote, isLoading, isError } = useQuote();

  if (isError) {
    return (
      <main className="relative min-h-screen flex flex-col items-center justify-center px-11">
        <Typography variant="body1">
          Something went wrong, please try again later
        </Typography>
        <div className="mt-40 w-full">
          <Button
            variant="contained"
            sx={{ width: "100%" }}
            onClick={() =>
              router.push(searchParams?.get("redirect_path") || "")
            }
          >
            Next
          </Button>
        </div>
      </main>
    );
  }

  if (isLoading) {
    return (
      <main className="relative min-h-screen flex flex-col items-center justify-center">
        <ClipLoader color="#38ACE2" size={150} />
      </main>
    );
  }

  return (
    <main className="relative min-h-screen flex flex-col justify-center items-center text-center px-11">
      {!quote ? (
        <>
          <Typography variant="body1">No Quote Available</Typography>
        </>
      ) : (
        <>
          <Typography variant="h2">{quote.text}</Typography>
          {quote.author && (
            <Typography variant="h2" sx={{ color: "#FFCF79", mt: "24px" }}>
              {`-${quote.author}`}
            </Typography>
          )}
          {quote.titles && (
            <Typography variant="h3" sx={{ color: "#38ACE2", mt: "16px" }}>
              {quote.titles}
            </Typography>
          )}
        </>
      )}
      <div className="mt-40 w-full">
        <Button
          variant="contained"
          sx={{ width: "100%" }}
          onClick={() => router.push(searchParams?.get("redirect_path") || "")}
        >
          Next
        </Button>
      </div>
    </main>
  );
}
