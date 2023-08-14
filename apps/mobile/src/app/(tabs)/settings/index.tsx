import { useClerk } from "@clerk/clerk-expo";
import { View, Text } from "react-native";
import { Link } from "expo-router";
import { useCallback } from "react";

export default function Settings() {
  const { signOut } = useClerk();

  const pressOnSignOut = useCallback(async () => {
    await signOut();
  }, [signOut]);

  return (
    <>
      <View className="flex-1 justify-center items-center">
        <Text className="text-white">Hello, this is the settings</Text>
        <Link
          className="flex items-center justify-center bg-transparent"
          onPress={pressOnSignOut}
          href="/login"
        >
          <Text className="text-white">Sign out</Text>
        </Link>
      </View>
    </>
  );
}
