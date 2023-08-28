import { ActivityIndicator, View } from "react-native";
import { colors } from "@foundrymakes/tailwind-config";

export const Loading = () => {
  return (
    <View className="flex-1  bg-dark-blue justify-center">
      <ActivityIndicator size="large" color={colors["light-blue"]} />
    </View>
  );
};
