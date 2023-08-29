import { useActions } from "~/hooks/useActions";
import { Loading } from "./Loading";
import { View } from "react-native";
import { PastActions } from "./PastActions";
import { UpcomingActions } from "./UpcomingActions";
import { useContacts } from "~/hooks/useContacts";
import { ActionTypeConstants } from "@foundrymakes/validation";
import { NewDashboard } from "./NewDashboard";
import { EmptyDashboard } from "./EmptyDashboard";
import { Error } from "./Error";

export const ActionList = () => {
  const {
    data: pastActions,
    isLoading: isPastLoading,
    error: pastError,
  } = useActions(ActionTypeConstants.PAST);
  const {
    data: upcomingActions,
    isLoading: isUpcomingLoading,
    error: upcomingError,
  } = useActions(ActionTypeConstants.UPCOMING);
  const {
    data: contacts,
    isLoading: isContactsLoading,
    error: contactsError,
  } = useContacts();

  if (isContactsLoading || isPastLoading || isUpcomingLoading) {
    return <Loading />;
  }

  if (contactsError || pastError || upcomingError)
    return <Error error={contactsError || pastError || upcomingError} />;

  if (!contacts || !pastActions || !upcomingActions) return null;

  if (!contacts.length) return <NewDashboard />;

  if (!(pastActions.length || upcomingActions.length))
    return <EmptyDashboard />;

  return (
    <View>
      <PastActions actions={pastActions} />
      <UpcomingActions actions={upcomingActions} />
    </View>
  );
};
