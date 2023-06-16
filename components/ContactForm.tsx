import { Typography, Grid } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState, useCallback } from "react";
import { ChevronLeft, AlertTriangle, PlusCircle } from "react-feather";
import validator from "validator";
import { Button } from "./Button";
import { Contact, GoalProgressType } from "@/types";
import TagsInput from "react-tagsinput";
import { upsertContact } from "@/app/_actions";
import { useGoalsMutation } from "@/hooks/useGoalsMutation";

interface Props {
  contact?: Contact;
  userEmail?: string | null;
}

export const ContactForm = ({ contact, userEmail }: Props) => {
  const router = useRouter();

  const [firstName, setFirstName] = useState(contact?.firstName);
  const [lastName, setLastName] = useState(contact?.lastName);
  const [title, setTitle] = useState(contact?.title);
  const [company, setCompany] = useState(contact?.company);
  const [industry, setIndustry] = useState(contact?.industry);
  const [email, setEmail] = useState(contact?.email);
  const [phone, setPhone] = useState(contact?.phone);
  const [links, setLinks] = useState<string[]>(contact?.links ?? [""]);
  const [selectedGoalDays, setSelectedGoalDays] = useState(
    contact?.goalDays ?? 30
  );
  const [tags, setTags] = useState<string[]>(contact?.interests ?? []);

  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [industryError, setIndustryError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const putGoalsMutation = useGoalsMutation({
    method: "PUT",
    onSuccess: () => {},
    onError: (error) => {
      console.log(error);
    },
  });

  const handleChange = useCallback((tags: string[]) => {
    setTags(tags);
  }, []);

  const handleAddLink = useCallback(() => {
    setLinks((prevLinks) => [...prevLinks, ""]);
  }, []);

  const handleLinkChange = useCallback((index: number, value: string) => {
    setLinks((prevLinks) => {
      const updatedLinks = [...prevLinks];
      updatedLinks[index] = value;
      return updatedLinks;
    });
  }, []);

  const handleButtonClick = useCallback((goalDays: number) => {
    setSelectedGoalDays(goalDays);
  }, []);

  const validateFields = useCallback(() => {
    setIsSaving(true);
    let hasError = false;

    setFirstNameError("");
    setLastNameError("");
    setIndustryError("");
    setEmailError("");
    setPhoneError("");

    if (!firstName) {
      setFirstNameError("Required field");
      hasError = true;
    }

    if (!lastName) {
      setLastNameError("Required field");
      hasError = true;
    }

    if (!industry) {
      setIndustryError("Required field");
      hasError = true;
    }

    if (email && !validator.isEmail(email)) {
      setEmailError("Invalid entry");
      hasError = true;
    }

    if (
      phone &&
      (!validator.isLength(phone, { min: 10, max: 10 }) ||
        !validator.isMobilePhone(phone, "en-US"))
    ) {
      setPhoneError("Invalid entry");
      hasError = true;
    }

    if (!hasError) {
      !contact &&
        putGoalsMutation.mutate({
          email: userEmail ?? "",
          type: GoalProgressType.CONNECTIONS,
        });
      document.getElementById("submitContactForm")?.click();
    } else {
      setIsSaving(false);
    }
  }, [
    contact,
    email,
    firstName,
    putGoalsMutation,
    industry,
    lastName,
    phone,
    userEmail,
  ]);

  return (
    <main className="relative flex flex-col items-center text-white pb-8">
      {/* @ts-expect-error Async Server Component */}
      <form action={upsertContact}>
        <div className="flex items-center sticky top-0 w-full bg-dark-blue z-10 pt-8 mb-6 px-4">
          <Grid container alignItems="center">
            <Grid item xs={2}>
              <Button
                variant="text"
                onClick={() => router.back()}
                sx={{
                  py: "6px",
                }}
              >
                <ChevronLeft
                  size={36}
                  className="md:w-11 md:h-11 lg:w-13 lg:h-13"
                />
              </Button>
            </Grid>
            <Grid item xs={8}>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 600,
                  textAlign: "center",
                }}
              >
                {contact ? "Edit contact" : "Create contact"}
              </Typography>
            </Grid>
            <Grid item xs={2} sx={{ display: "flex", justifyContent: "end" }}>
              <Button
                variant="text"
                onClick={validateFields}
                sx={{
                  color: "#38ACE2",
                  fontSize: "16px",
                  fontWeight: 400,
                  "&:hover": {
                    color: "#38ACE2",
                  },
                  "@media (min-width: 768px)": {
                    fontSize: "18px",
                  },
                  "@media (min-width: 1024px)": {
                    fontSize: "20px",
                  },
                  "&:disabled": {
                    color: "#38ACE2",
                  },
                }}
                disabled={isSaving}
              >
                {isSaving ? "Saving..." : "Save"}
              </Button>
            </Grid>
          </Grid>
        </div>

        <Grid container spacing={2} alignItems="center" sx={{ px: "16px" }}>
          <Grid item xs={12}>
            <Grid container alignItems="center" rowSpacing={"4px"}>
              <Grid item xs={3}>
                <Typography variant="subtitle1">First *</Typography>
              </Grid>
              <Grid item xs={9}>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Grid>

              <Grid item xs={3} />
              <Grid item xs={9}>
                {firstNameError && (
                  <div className=" flex items-center space-x-1">
                    <AlertTriangle
                      size={16}
                      fill="#F42010"
                      color="black"
                      className="md:w-5 md:h-5 lg:w-6 lg:h-6"
                    />
                    <Typography variant="subtitle2">
                      {firstNameError}
                    </Typography>
                  </div>
                )}
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Grid container alignItems="center" rowSpacing={"4px"}>
              <Grid item xs={3}>
                <Typography variant="subtitle1">Last *</Typography>
              </Grid>
              <Grid item xs={9}>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Grid>

              <Grid item xs={3} />
              <Grid item xs={9}>
                {lastNameError && (
                  <div className=" flex items-center space-x-1">
                    <AlertTriangle
                      size={16}
                      fill="#F42010"
                      color="black"
                      className="md:w-5 md:h-5 lg:w-6 lg:h-6"
                    />
                    <Typography variant="subtitle2">{lastNameError}</Typography>
                  </div>
                )}
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Grid container alignItems="center" rowSpacing={"4px"}>
              <Grid item xs={3}>
                <Typography variant="subtitle1">Industry *</Typography>
              </Grid>
              <Grid item xs={9}>
                <input
                  type="text"
                  id="industry"
                  name="industry"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                />
              </Grid>

              <Grid item xs={3} />
              <Grid item xs={9}>
                {industryError && (
                  <div className=" flex items-center space-x-1">
                    <AlertTriangle
                      size={16}
                      fill="#F42010"
                      color="black"
                      className="md:w-5 md:h-5 lg:w-6 lg:h-6"
                    />
                    <Typography variant="subtitle2">{industryError}</Typography>
                  </div>
                )}
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={3}>
            <Typography variant="subtitle1">Title</Typography>
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

          <Grid item xs={3}>
            <Typography variant="subtitle1">Company</Typography>
          </Grid>
          <Grid item xs={9}>
            <input
              type="text"
              id="company"
              name="company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
          </Grid>

          <Grid item xs={3}>
            <Typography variant="subtitle1">Cadence *</Typography>
          </Grid>
          <Grid
            item
            xs={9}
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Button
              variant="outlined"
              sx={{
                border: selectedGoalDays === 30 ? "1px solid #38ACE2" : "none",
                color: selectedGoalDays === 30 ? "#38ACE2" : "white",
              }}
              onClick={() => handleButtonClick(30)}
            >
              30 days
            </Button>
            <Button
              variant="outlined"
              sx={{
                border: selectedGoalDays === 60 ? "1px solid #38ACE2" : "none",
                color: selectedGoalDays === 60 ? "#38ACE2" : "white",
              }}
              onClick={() => handleButtonClick(60)}
            >
              60 days
            </Button>
            <Button
              variant="outlined"
              sx={{
                border: selectedGoalDays === 90 ? "1px solid #38ACE2" : "none",
                color: selectedGoalDays === 90 ? "#38ACE2" : "white",
              }}
              onClick={() => handleButtonClick(90)}
            >
              90 days
            </Button>
          </Grid>

          <Grid item xs={12}>
            <Grid container alignItems="center" rowSpacing={"4px"}>
              <Grid item xs={3}>
                <Typography variant="subtitle1">Email</Typography>
              </Grid>
              <Grid item xs={9}>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>

              <Grid item xs={3} />
              <Grid item xs={9}>
                {emailError && (
                  <div className=" flex items-center space-x-1">
                    <AlertTriangle
                      size={16}
                      fill="#F42010"
                      color="black"
                      className="md:w-5 md:h-5 lg:w-6 lg:h-6"
                    />
                    <Typography variant="subtitle2">{emailError}</Typography>
                  </div>
                )}
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Grid container alignItems="center" rowSpacing={"4px"}>
              <Grid item xs={3}>
                <Typography variant="subtitle1">Phone</Typography>
              </Grid>
              <Grid item xs={9}>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  autoComplete="tel"
                />
              </Grid>

              <Grid item xs={3} />
              <Grid item xs={9}>
                {phoneError && (
                  <div className=" flex items-center space-x-1">
                    <AlertTriangle
                      size={16}
                      fill="#F42010"
                      color="black"
                      className="md:w-5 md:h-5 lg:w-6 lg:h-6"
                    />
                    <Typography variant="subtitle2">{phoneError}</Typography>
                  </div>
                )}
              </Grid>
            </Grid>
          </Grid>

          {links.map((link, index) => (
            <Grid item xs={12} key={`link-${index}`}>
              <Grid container alignItems="center">
                <Grid item xs={3}>
                  <Typography variant="subtitle1">
                    {index === 0 && "LinkedIn"}
                  </Typography>
                </Grid>
                <Grid item xs={9}>
                  <input
                    type="text"
                    value={link}
                    className="text-base rounded-[4px] block w-full h-12 px-2 py-3 bg-white bg-opacity-5  placeholder-gray-400 text-white md:text-lg lg:text-xl focus:ring-1 focus:ring-white focus:bg-white focus:bg-opacity-[0.12] focus:outline-none appearance-none caret-white"
                    onChange={(e) => handleLinkChange(index, e.target.value)}
                  />
                </Grid>
              </Grid>
            </Grid>
          ))}
          <Grid item xs={12} className="flex justify-end relative -mt-2">
            <Button
              variant="text"
              sx={{
                display: "flex",
                gap: "4px",
                alignItems: "center",
                py: "12px",
              }}
              onClick={handleAddLink}
            >
              <PlusCircle size={24} className="md:w-8 md:h-8 lg:w-10 lg:h-10" />
              <div>Add Link</div>
            </Button>
          </Grid>

          <Grid
            item
            xs={12}
            sx={{
              marginTop: "8px",
              position: "relative",
              marginBottom: "-8px",
            }}
          >
            <Typography variant="subtitle1">Interests</Typography>
          </Grid>

          <Grid item xs={12}>
            <TagsInput
              value={tags}
              onChange={handleChange}
              inputProps={{
                id: "tagsInput",
                placeholder: "Type interest here...",
              }}
              focusedClassName="ring-1 ring-white outline-none appearance-none caret-white"
              className="rounded-[4px] block w-full min-h-12 h-auto p-4 bg-white bg-opacity-5"
            />
          </Grid>
        </Grid>

        <input id="id" name="id" type="hidden" defaultValue={contact?.id} />
        <input
          id="userEmail"
          name="userEmail"
          type="hidden"
          defaultValue={userEmail || ""}
        />
        <input id="links" name="links" type="hidden" defaultValue={links} />
        <input
          id="goalDays"
          name="goalDays"
          type="hidden"
          defaultValue={selectedGoalDays}
        />
        <input
          id="interests"
          name="interests"
          type="hidden"
          defaultValue={tags}
        />
        <button
          id="submitContactForm"
          className="hidden"
          type="submit"
        ></button>
      </form>
    </main>
  );
};
