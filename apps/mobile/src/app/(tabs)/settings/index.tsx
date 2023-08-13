import { useClerk } from "@clerk/clerk-expo";
import { Text } from "gluestack-ui";
import { View } from "react-native";
import { Link } from "expo-router";

export default function Settings() {
  const { signOut } = useClerk();

  return (
    <>
      <View className="flex-1 justify-center items-center">
        <Text className="text-white">Hello, this is the settings</Text>
        <Link
          className="flex items-center justify-center bg-transparent"
          onPress={() => {
            signOut();
          }}
          href="/login"
        >
          <Text className="text-white">Sign out</Text>
        </Link>
      </View>
    </>
  );
}
