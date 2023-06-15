"use client";

import { Button } from "@/components/Button";
import { useBackPath } from "@/contexts/BackPathContext";
import { useContact } from "@/hooks/useContact";
import { Typography, Card, CardContent } from "@mui/material";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { ChevronLeft, Mail, Linkedin, Check, Archive } from "react-feather";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "../../styles.css";
import { ContactInterests } from "@/components/ContactInterests";
import { useContactMutation } from "@/hooks/useContactMutation";

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

  const handleLinkedInClick = useCallback(() => {
    const linkedInLink = contact?.links[0];

    window.open(linkedInLink);
  }, [contact?.links]);

  const handleEmailClick = useCallback(() => {
    const emailAddress = contact?.email;
    const mailtoLink = `mailto:${emailAddress}`;

    window.open(mailtoLink);
  }, [contact?.email]);

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
          <div className="flex justify-between items-center">
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
            <Typography
              variant="h3"
              sx={{ fontWeight: 600 }}
            >{`Connect with ${contact?.firstName}`}</Typography>
            <div></div>
          </div>
          <div className="flex justify-center mt-2 mb-5">
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
              <Typography variant="subtitle1">View Profile</Typography>
            </Button>
          </div>
          <Card
            sx={{
              backgroundColor: "rgba(255, 255, 255, 0.05)",
              borderRadius: "8px",
              boxShadow: "none",
            }}
          >
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Typography variant="h2">
                    {contact.firstName} {contact.lastName}
                  </Typography>
                  <div className="flex items-start">
                    <Button
                      variant="text"
                      sx={{ p: "12px" }}
                      onClick={handleEmailClick}
                    >
                      <Mail size={24} />
                    </Button>
                    <Button
                      variant="text"
                      sx={{ p: "12px" }}
                      onClick={handleLinkedInClick}
                    >
                      <Linkedin size={24} />
                    </Button>
                  </div>
                </div>
                <Typography variant="subtitle1">{contact.title}</Typography>
                <Typography variant="subtitle1">{contact.company}</Typography>
                <Typography variant="subtitle1">{contact.industry}</Typography>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="my-6 space-y-4 ml-4">
          <Typography variant="subtitle1">Most recent Activity</Typography>
          <Swiper
            slidesPerView={"auto"}
            spaceBetween={16}
            freeMode={true}
            pagination={{
              clickable: true,
            }}
            modules={[FreeMode, Pagination]}
            className="!pb-10"
          >
            {contact.activities.slice(0, 3).map((activity, index) => (
              <SwiperSlide key={`interest-${index}`}>
                <Card
                  sx={{
                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                    borderRadius: "8px",
                    boxShadow: "none",
                    height: "124px",
                  }}
                >
                  <CardContent>
                    <div className="flex justify-between">
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        {activity.title}
                      </Typography>
                    </div>
                    <Typography
                      variant="body1"
                      sx={{ opacity: 0.7, marginBottom: "8px" }}
                    >
                      {activity.date}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        overflow: "hidden",
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 2,
                      }}
                    >
                      {activity.description}
                    </Typography>
                  </CardContent>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <ContactInterests interests={contact.interests} />
      </div>
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
