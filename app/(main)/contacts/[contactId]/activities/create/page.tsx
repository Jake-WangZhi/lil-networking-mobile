"use client";

import { ActivityType, SearchParams } from "@/types";
import { Typography, Grid } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState, ChangeEvent, useCallback, useRef } from "react";
import { AlertTriangle } from "react-feather";
import { createActivity } from "../../../../../_actions";
import { Button } from "@/components/Button";
import { useActivityMutation } from "@/hooks/useActivityMutation";

import "../../../styles.css";

const CHARACTER_LIMIT = 300;

export default function CreateActivityPage({
  params,
}: {
  params: { contactId: string };
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const submitFormRef = useRef<HTMLButtonElement>(null);

  const prefilledTitle = searchParams?.get(SearchParams.Title) || "";
  const prefilledDate = searchParams?.get(SearchParams.Date) || "";
  const prefilledDescription =
    searchParams?.get(SearchParams.Description) || "";
  const isFromMessage = searchParams?.get(SearchParams.IsFromMessage) || "";

  const [description, setDescription] = useState(prefilledDescription);
  const [title, setTitle] = useState(prefilledTitle);
  const [date, setDate] = useState(prefilledDate);
  const [titleError, setTitleError] = useState("");
  const [dateError, setDateError] = useState("");
  const [isLogging, setIsLogging] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const postActivityMutation = useActivityMutation({
    method: "POST",
    onSuccess: ({ showQuote }) => {
      setErrorMessage("");
      if (showQuote)
        return router.push(`/quote?${SearchParams.RedirectPath}=/dashboard`);
      router.push("/dashboard");
    },
    onError: (error) => {
      setErrorMessage(
        "An error occurred. Cannot submit the form. Please try again."
      );
      console.log(error);
    },
  });

  const handleDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };

  const validateFields = useCallback(() => {
    setIsLogging(true);
    let hasError = false;

    setTitleError("");
    setDateError("");

    if (!title) {
      setTitleError("Title is required");
      hasError = true;
    }

    if (!date) {
      setDateError("Invalid entry");
      hasError = true;
    }

    if (!hasError) {
      submitFormRef.current?.click();
    } else {
      setIsLogging(false);
    }
  }, [date, title]);

  const handleCancelClick = useCallback(() => {
    if (isFromMessage) {
      postActivityMutation.mutate({
        title: prefilledTitle,
        date: prefilledDate,
        description: prefilledDescription,
        contactId: params.contactId,
        type: ActivityType.USER,
      });
    } else {
      router.back();
    }
  }, [
    isFromMessage,
    params.contactId,
    postActivityMutation,
    prefilledDate,
    prefilledDescription,
    prefilledTitle,
    router,
  ]);

  return (
    <main className="relative flex flex-col items-center text-white px-4 py-8">
      {/* @ts-expect-error Async Server Component */}
      <form action={createActivity}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sx={{ textAlign: "center" }}>
            <Typography variant="h2">Log Activity</Typography>
          </Grid>

          <Grid item xs={12}>
            <Grid container alignItems="center" rowSpacing={"4px"}>
              <Grid item xs={3}>
                <Typography variant="subtitle1">Title *</Typography>
              </Grid>
              <Grid item xs={9}>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Grid>

              <Grid item xs={3} />
              <Grid item xs={9}>
                {titleError && (
                  <div className=" flex items-center space-x-1">
                    <AlertTriangle
                      size={16}
                      fill="#F42010"
                      color="black"
                      className="md:w-5 md:h-5 lg:w-6 lg:h-6"
                    />
                    <Typography variant="subtitle2">{titleError}</Typography>
                  </div>
                )}
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Grid container alignItems="center" rowSpacing={"4px"}>
              <Grid item xs={3}>
                <Typography variant="subtitle1">Date *</Typography>
              </Grid>
              <Grid item xs={9}>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  style={{
                    colorScheme: "dark",
                  }}
                />
              </Grid>

              <Grid item xs={3} />
              <Grid item xs={9}>
                {dateError && (
                  <div className=" flex items-center space-x-1">
                    <AlertTriangle
                      size={16}
                      fill="#F42010"
                      color="black"
                      className="md:w-5 md:h-5 lg:w-6 lg:h-6"
                    />
                    <Typography variant="subtitle2">{dateError}</Typography>
                  </div>
                )}
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} sx={{ mt: "8px" }}>
            <Typography variant="subtitle1">Activity Details</Typography>
          </Grid>
          <Grid item xs={12}>
            <textarea
              id="description"
              name="description"
              value={description}
              onChange={handleDescriptionChange}
              placeholder="Describe this activity here..."
              maxLength={CHARACTER_LIMIT}
              className="text-base rounded-[4px] block p-2.5 w-full h-56 bg-white bg-opacity-5 placeholder-gray-400 text-white md:text-lg lg:text-xl focus:ring-1 focus:ring-white focus:bg-white focus:bg-opacity-[0.12] outline-none appearance-none caret-white"
            />
          </Grid>
          <Grid item xs={12} className="relative -mt-2 flex justify-end">
            <Typography variant="body1">
              {description.length}/{CHARACTER_LIMIT}
            </Typography>
          </Grid>

          <Grid item xs={12} className="flex justify-center mt-2">
            <Button
              variant="contained"
              onClick={validateFields}
              disabled={isLogging}
              sx={{
                "&:disabled": {
                  color: "#0F1A24",
                },
              }}
            >
              {isLogging ? "Logging..." : "Log Activity"}
            </Button>
          </Grid>
          <Grid item xs={12} className="flex justify-center mt-2">
            <Button
              variant="text"
              onClick={handleCancelClick}
              sx={{ px: "16px" }}
            >
              Cancel
            </Button>
          </Grid>
        </Grid>

        <input
          id="contactId"
          name="contactId"
          type="hidden"
          defaultValue={params.contactId}
        />
        <input
          id="isFromMessage"
          name="isFromMessage"
          type="hidden"
          defaultValue={isFromMessage}
        />
        <button ref={submitFormRef} className="hidden" type="submit"></button>
      </form>

      {errorMessage && (
        <Typography variant="subtitle2" sx={{ textAlign: "center" }}>
          {errorMessage}
        </Typography>
      )}
    </main>
  );
}