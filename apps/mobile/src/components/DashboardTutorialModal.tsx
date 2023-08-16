import { TutorialModal } from "~/components/TutorialModal";

const img1 = require("~/images/onboarding/dashboard/add_contacts.png");
const img2 = require("~/images/onboarding/dashboard/stats.png");
const img3 = require("~/images/onboarding/dashboard/priority.png");

const data = [
  {
    id: "1",
    title: "Add Contacts",
    description:
      "Create new or easily import contacts from your phone to get started.",
    image: img1,
  },
  {
    id: "2",
    title: "Networking Goals",
    description: "Set monthly goals to build and sustain your network.",
    image: img2,
  },
  {
    id: "3",
    title: "Contact Reminders",
    description:
      "Automated and priority sorted reminders appear based on individual cadence.",
    image: img3,
  },
];

export const DashboardTutorialModal = () => {
  return <TutorialModal data={data} />;
};
