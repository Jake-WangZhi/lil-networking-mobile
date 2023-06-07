import {
  Dispatch,
  SetStateAction,
  useState,
  ChangeEvent,
  useCallback,
} from "react";
import { X, Minus, AlertTriangle } from "react-feather";
import { Button } from "./Button";
import { createActivity } from "@/app/_actions";
import { useSwipeable } from "react-swipeable";
import { Grid, Typography } from "@mui/material";

const characterLimit = 300;

interface Props {
  isOpen: boolean;
  setIsActivityPageOpen: Dispatch<SetStateAction<boolean>>;
  contactId: string;
}

export const ActivityForm = ({
  isOpen,
  setIsActivityPageOpen,
  contactId,
}: Props) => {
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");

  const [titleError, setTitleError] = useState("");
  const [dateError, setDateError] = useState("");

  const handleDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };

  const handlers = useSwipeable({
    onSwipedDown: () => {
      setIsActivityPageOpen(false);
    },
    swipeDuration: 500,
    preventScrollOnSwipe: true,
    trackMouse: true,
    trackTouch: true,
  });

  const validateFields = useCallback(() => {
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

    if (!hasError) document.getElementById("submitActivityForm")?.click();
  }, [date, title]);

  return (
    <div
      className={`bg-dark-blue absolute z-10 inset-0 w-full h-full px-4 transition-transform duration-500 ${
        isOpen ? "translate-y-0" : "translate-y-full"
      }`}
      {...handlers}
    >
      <div className="flex justify-center">
        <Minus size={56} />
      </div>

      {/* @ts-expect-error Async Server Component */}
      <form action={createActivity}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={10}>
            <Typography variant="h2">Log New Activity</Typography>
          </Grid>
          <Grid item xs={2} className="flex justify-end">
            <Button
              variant="text"
              onClick={() => setIsActivityPageOpen(false)}
              customStyles={{
                py: "8px",
              }}
            >
              <X size={32} className="md:w-11 md:h-11 lg:w-13 lg:h-13" />
            </Button>
          </Grid>
          <Grid item xs={12} className="-mt-4">
            <Typography variant="body1">Track interactions</Typography>
          </Grid>

          <Grid item xs={12}>
            <Grid container alignItems="center">
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
            <Grid container alignItems="center">
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
                  style={{ colorScheme: "dark" }}
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

          <Grid item xs={12} className="mt-2">
            <Typography variant="subtitle1">Activity Details</Typography>
          </Grid>
          <Grid item xs={12}>
            <textarea
              id="description"
              name="description"
              value={description}
              onChange={handleDescriptionChange}
              placeholder="Describe this activity here..."
              maxLength={characterLimit}
              className="text-base rounded-[4px] block p-2.5 w-full h-56 bg-white bg-opacity-5 placeholder-gray-400 text-white md:text-lg lg:text-xl focus:ring-1 focus:ring-white focus:bg-white focus:bg-opacity-[0.12] outline-none appearance-none caret-white"
            />
          </Grid>
          <Grid item xs={12} className="relative -mt-2 flex justify-end">
            <Typography variant="body1">
              {description.length}/{characterLimit}
            </Typography>
          </Grid>

          <Grid item xs={12} className="flex justify-center mt-2">
            <Button variant="contained" onClick={validateFields}>
              Log Activity
            </Button>
          </Grid>
        </Grid>

        <input
          id="contactId"
          name="contactId"
          type="hidden"
          defaultValue={contactId}
        />
        <button
          id="submitActivityForm"
          className="hidden"
          type="submit"
        ></button>
      </form>
    </div>
  );
};
