import animationData from "~/lottie/add-and-save.json";

import { View, Text } from "react-native";
import LottieView from "lottie-react-native";

export const EmptyDashboard = () => {
  return (
    <View className="px-10 mt-24">
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
};
