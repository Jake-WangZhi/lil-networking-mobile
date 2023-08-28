import { Text, View } from "react-native";

export const Error = ({ error }: { error: unknown }) => {
  return (
    <View className="flex-1 bg-dark-blue  justify-center">
      <Text className="text-error px-4">{JSON.stringify(error, null, 2)}</Text>;
    </View>
  );
};
