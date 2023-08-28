import { TutorialModal } from "~/components/TutorialModal";

import img1 from "~/images/tutorials/profile/reminder.png";
import img2 from "~/images/tutorials/profile/tags.png";
import img3 from "~/images/tutorials/profile/history.png";

const slides = [
  {
    id: "1",
    title: "Set Reminders",
    description: "Copy about reminder",
    image: img1,
  },
  {
    id: "2",
    title: "Add Tags",
    description: "Copy about tags",
    image: img2,
  },
  {
    id: "3",
    title: "Add Activity",
    description:
      "Log activities and keep track of your history with each contact.",
    image: img3,
  },
];

export const ProfileTutorialModal = () => {
  return <TutorialModal slides={slides} name="@hasViewedProfileTutorial" />;
};
