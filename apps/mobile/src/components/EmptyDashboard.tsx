import empty_state_icon from "~/images/empty_state.png";

import { View, Image, Text } from "react-native";

export const EmptyDashboard = () => {
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
            Have you met anyone new? Add more contacts and continue growing your
            network.
          </Text>
        </View>
      </View>
    </View>
  );
};
