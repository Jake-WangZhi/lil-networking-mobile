import { View, Text } from "react-native";

export const Error = ({ error }: { error: unknown }) => {
  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-error">{JSON.stringify(error, null, 2)}</Text>
    </View>
  );
};
