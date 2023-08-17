import { TutorialModal } from "~/components/TutorialModal";

import img1 from "~/images/tutorials/dashboard/add_contacts.png";
import img3 from "~/images/tutorials/dashboard/priority.png";
import img2 from "~/images/tutorials/dashboard/stats.png";

const data = [
  {
    id: "1",
    title: "Add Contacts",
    description:
      "Create new or easily import contacts from your phone to get started.",
    image: img1 as number,
  },
  {
    id: "2",
    title: "Networking Goals",
    description: "Set monthly goals to build and sustain your network.",
    image: img2 as number,
  },
  {
    id: "3",
    title: "Contact Reminders",
    description:
      "Automated and priority sorted reminders appear based on individual cadence.",
    image: img3 as number,
  },
];

export const DashboardTutorialModal = () => {
  return <TutorialModal data={data} />;
};
