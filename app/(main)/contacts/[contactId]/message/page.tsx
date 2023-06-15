"use client";

import { Button } from "@/components/Button";
import { useBackPath } from "@/contexts/BackPathContext";
import { useContact } from "@/hooks/useContact";
import { Grid, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { ChevronLeft, Check, Archive } from "react-feather";
import { ContactInterests } from "@/components/ContactInterests";
import { useContactMutation } from "@/hooks/useContactMutation";
import { SwipeableActivities } from "@/components/SwipeableActivities";
import { ClipLoader } from "react-spinners";
import { MessageCard } from "@/components/MessageCard";

import "../../styles.css";

export default function MessagePage({
  params,
}: {
  params: { contactId: string };
}) {
  const router = useRouter();
  const { setBackPath } = useBackPath();
  const { contact, isLoading, isError } = useContact({
    id: params.contactId,
  });

  const [errorMessage, setErrorMessage] = useState("");

  const updateContactMutation = useContactMutation({
    method: "PUT",
    onSuccess: () => {
      setErrorMessage("");
      router.push("/dashboard");
    },
    onError: (error) => {
      setErrorMessage("An error occurred. Please try again.");
      console.log(error);
    },
  });

  const handleArchive = useCallback(() => {
    if (contact)
      updateContactMutation.mutate({
        ...contact,
        isArchived: true,
      });
  }, [contact, updateContactMutation]);

  if (isError) {
    return (
      <Typography
        variant="h3"
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "32px",
          color: "#F42010",
        }}
      >
        Something went wrong, please try again later
      </Typography>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-8">
        <ClipLoader color="#38ACE2" size={150} />
      </div>
    );
  }

  if (!contact) {
    return (
      <Typography
        variant="h3"
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "32px",
          color: "#F42010",
        }}
      >
        No contact available
      </Typography>
    );
  }

  return (
    <main className="relative min-h-screen text-white py-8 flex flex-col justify-between">
      <div>
        <div className="px-4">
          <Grid container alignItems="center">
            <Grid item xs={2}>
              <Button
                variant="text"
                onClick={() => {
                  setBackPath("/dashboard");
                  router.push("/dashboard");
                }}
                sx={{ py: "6px" }}
              >
                <ChevronLeft
                  size={36}
                  className="md:w-11 md:h-11 lg:w-13 lg:h-13"
                />
              </Button>
            </Grid>
            <Grid
              item
              xs={8}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Typography
                variant="h3"
                sx={{ fontWeight: 600 }}
              >{`Connect with ${contact?.firstName}`}</Typography>
            </Grid>
            <Grid item xs={2}></Grid>
          </Grid>
          <div className="flex justify-center mb-5">
            <Button
              variant="text"
              onClick={() => {
                setBackPath(`/contacts/${params.contactId}/message`);
                router.push(`/contacts/${params.contactId}`);
              }}
              sx={{
                py: "12px",
              }}
            >
              <Typography variant="subtitle1" sx={{ opacity: 0.7 }}>
                View Profile
              </Typography>
            </Button>
          </div>
          <MessageCard contact={contact} />
        </div>
        <div className="my-6">
          <SwipeableActivities activities={contact.activities.slice(0, 3)} />
        </div>
        <ContactInterests interests={contact.interests} />
      </div>
      {errorMessage && (
        <Typography variant="subtitle2" sx={{ textAlign: "center" }}>
          {errorMessage}
        </Typography>
      )}
      <div className="flex justify-center space-x-12">
        <Button
          variant="text"
          sx={{
            flexDirection: "column",
            alignItems: "center",
            px: "24px",
            py: "10px",
          }}
        >
          <div className="w-12 h-12 bg-light-blue rounded-full flex justify-center items-center mb-1">
            <Check size={24} color="#0F1A24" />
          </div>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            Done
          </Typography>
        </Button>
        <Button
          variant="text"
          sx={{
            flexDirection: "column",
            alignItems: "center",
            px: "24px",
            py: "10px",
          }}
          onClick={handleArchive}
        >
          <div className="w-12 h-12 bg-white bg-opacity-5 rounded-full flex justify-center items-center mb-1">
            <Archive size={24} />
          </div>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            Archive
          </Typography>
        </Button>
      </div>
    </main>
  );
}
