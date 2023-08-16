import { ActivityIndicator, View } from "react-native";

export const Loading = () => {
  return (
    <View className="flex-1  bg-dark-blue justify-center">
      <ActivityIndicator size="large" color="#38ACE2" />
    </View>
  );
};
