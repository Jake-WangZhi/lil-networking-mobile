import { Loading } from "./Loading";
import { PastActions } from "./PastActions";
import { UpcomingActions } from "./UpcomingActions";
import { useContacts } from "~/hooks/useContacts";
import { EmptyDashboard } from "./EmptyDashboard";
import { Error } from "./Error";
import { AllCardsComplete } from "./AllCardsComplete";
import { View } from "react-native";
import { usePastActions } from "~/hooks/usePastActions";
import { useUpcomingActions } from "~/hooks/useUpcomingActions";
import { useFocusEffect } from "expo-router";

export const ActionList = () => {
  const {
    data: pastActions,
    isLoading: isPastLoading,
    error: pastError,
    refetch: refetchPast,
  } = usePastActions();
  const {
    data: upcomingActions,
    isLoading: isUpcomingLoading,
    error: upcomingError,
    refetch: refetchUpcoming,
  } = useUpcomingActions();
  const {
    data: contacts,
    isLoading: isContactsLoading,
    error: contactsError,
    refetch: refetchContacts,
  } = useContacts();

  useFocusEffect(() => {
    const refetchData = async () => {
      await Promise.all([refetchPast(), refetchUpcoming(), refetchContacts()]);
    };

    void refetchData();
  });

  if (isContactsLoading || isPastLoading || isUpcomingLoading) {
    return <Loading />;
  }

  if (contactsError || pastError || upcomingError)
    return <Error error={contactsError || pastError || upcomingError} />;

  if (!contacts || !pastActions || !upcomingActions) return null;

  if (!contacts.length) return <EmptyDashboard />;

  if (!(pastActions.length || upcomingActions.length))
    return <AllCardsComplete />;

  return (
    <View>
      <PastActions actions={pastActions} />
      <UpcomingActions actions={upcomingActions} />
    </View>
  );
};
