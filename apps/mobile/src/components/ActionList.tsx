import animationData from "~/lottie/add-and-save.json";
import empty_state_icon from "~/images/empty_state.png";

import LottieView from "lottie-react-native";
import { useActions } from "~/hooks/useActions";
import { Loading } from "./Loading";
import { View, Text, ScrollView, Image } from "react-native";
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

  const { pastActions, upcomingActions, hasContacts } = actions;

  if (!hasContacts) {
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
          <View className="space-y-4">
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

  if (pastActions.length === 0 && upcomingActions.length === 0)
    return (
      <View className="px-10 flex-1 justify-center items-center">
        <View className="flex justify-center items-center space-y-6">
          <Image
            source={empty_state_icon}
            alt="empty_state"
            className="w-[82] h-[126]"
          />
          <View className="space-y-4">
            <Text className="text-2xl text-white text-center">You Rock!</Text>
            <Text className="text-base text-white text-center">
              Have you met anyone new? Add more contacts and continue growing
              your network.
            </Text>
          </View>
        </View>
      </View>
    );

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
          <Text className="text-white text-xl font-semibold">{`Priority (${pastActions.length})`}</Text>
        </View>
        {isPriorityCollapsed ? (
          <CaretDown size={24} color="white" />
        ) : (
          <CaretUp size={24} color="white" />
        )}
      </Ripple>
      <Collapsible collapsed={isPriorityCollapsed}>
        {pastActions.map((action, index) => (
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
          <Text className="text-white text-xl font-semibold">{`Upcoming (${upcomingActions.length})`}</Text>
        </View>
        {isUpcomingCollapsed ? (
          <CaretDown size={24} color="white" />
        ) : (
          <CaretUp size={24} color="white" />
        )}
      </Ripple>
      <Collapsible collapsed={isUpcomingCollapsed}>
        {upcomingActions.map((action, index) => (
          <ActionCard
            key={index}
            action={action}
            actionType={ActionType.Upcoming}
          />
        ))}
      </Collapsible>
    </ScrollView>
  );
};
