import { router } from "expo-router";
import { View, Text } from "react-native";
import Ripple from "react-native-material-ripple";

export default function Contacts() {
  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-white">Hello, this is the all contacts</Text>
      <Ripple onPress={() => router.push("/quote")}>
        <Text>Quote</Text>
      </Ripple>
    </View>
  );
}
