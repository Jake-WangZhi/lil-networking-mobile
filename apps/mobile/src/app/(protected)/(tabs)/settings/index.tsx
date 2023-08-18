import { useAuth } from "@clerk/clerk-expo";
import { Text, TouchableOpacity, View } from "react-native";

export default function Settings() {
  const { signOut } = useAuth();

  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-white">Hello, this is the settings</Text>
      <TouchableOpacity onPress={() => signOut()}>
        <Text className="text-white">Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}
