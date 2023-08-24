import animationData from "~/lottie/add-and-save.json";

import LottieView from "lottie-react-native";
import { useActions } from "~/hooks/useActions";
import { Loading } from "./Loading";
import { View, Text, ScrollView } from "react-native";
import Collapsible from "react-native-collapsible";
import { useState } from "react";
import Ripple from "react-native-material-ripple";
import { CaretUp, CaretDown } from "phosphor-react-native";
import { ActionCard } from "./ActionCard";
import { ActionType } from "~/types";

export const ActionList = () => {
  const { data: actions, isLoading, error } = useActions();
  const [isPriorityCollapsed, setIsPriorityCollapsed] = useState(false);
  const [isUpcomingCollapsed, setIsUpcomingCollapsed] = useState(false);

  if (isLoading) {
    return <Loading />;
  }

  if (!actions) {
    return null;
  }

  if (!actions.hasContacts) {
    return (
      <View className="px-10 flex-1 justify-center items-center">
        <View className="flex justify-center items-center space-y-6">
          <View>
            <LottieView
              autoPlay
              style={{
                width: 75,
                height: 75,
                backgroundColor: "transparent",
              }}
              source={animationData}
              loop={false}
            />
          </View>
          <View>
            <Text className="text-2xl text-white text-center">
              Your Dashboard is empty
            </Text>
            <Text className="text-base text-white text-center">
              Add contacts and your reminders will show up here.
            </Text>
          </View>
        </View>
      </View>
    );
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {!!error && (
        <Text className="text-white">{JSON.stringify(error, null, 2)}</Text>
      )}
      <Ripple
        onPress={() => setIsPriorityCollapsed((prev) => !prev)}
        className="py-3 mt-3 flex-row justify-between items-center"
      >
        <View className="flex-row items-center space-x-2">
          <View className="bg-magenta w-1 h-4"></View>
          <Text className="text-white text-xl font-semibold">{`Priority (${actions.pastActions.length})`}</Text>
        </View>
        {isPriorityCollapsed ? (
          <CaretDown size={24} color="white" />
        ) : (
          <CaretUp size={24} color="white" />
        )}
      </Ripple>
      <Collapsible collapsed={isPriorityCollapsed}>
        {actions.pastActions.map((action, index) => (
          <ActionCard
            key={index}
            action={action}
            actionType={ActionType.Past}
          />
        ))}
      </Collapsible>
      <Ripple
        onPress={() => setIsUpcomingCollapsed((prev) => !prev)}
        className="py-3 mt-3 flex-row justify-between items-center"
      >
        <View className="flex-row items-center space-x-2">
          <View className="bg-light-yellow w-1 h-4"></View>
          <Text className="text-white text-xl font-semibold">{`Upcoming (${actions.upcomingActions.length})`}</Text>
        </View>
        {isUpcomingCollapsed ? (
          <CaretDown size={24} color="white" />
        ) : (
          <CaretUp size={24} color="white" />
        )}
      </Ripple>
      <Collapsible collapsed={isUpcomingCollapsed}>
        {actions.upcomingActions.map((action, index) => (
          <ActionCard
            key={index}
            action={action}
            actionType={ActionType.Past}
          />
        ))}
      </Collapsible>
    </ScrollView>
  );
};
