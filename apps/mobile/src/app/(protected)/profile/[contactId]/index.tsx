import { router } from "expo-router";
import { Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import Ripple from "react-native-material-ripple";

export default function Profile() {
  const { contactId } = useLocalSearchParams<{ contactId: string }>();

  if (!contactId) return null;

  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-white">{`Hello, ${contactId}`}</Text>
      <Ripple onPress={() => router.back()}>
        <Text className="text-white">Dashboard</Text>
      </Ripple>
    </View>
  );
}
