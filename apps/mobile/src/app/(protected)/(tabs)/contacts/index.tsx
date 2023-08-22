import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Contacts() {
  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-white">Hello, this is the all contacts</Text>
      <Link href="/quote">
        <Text className="text-white">Quote</Text>
      </Link>
    </View>
  );
}
