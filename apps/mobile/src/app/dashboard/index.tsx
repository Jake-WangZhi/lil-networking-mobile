import { useClerk, useUser } from "@clerk/clerk-expo";
import { Button, Text } from "gluestack-ui";
import { View } from "react-native";

export default function Dashboard() {
  const { user } = useUser();
  const { signOut } = useClerk();

  return (
    <View className={`flex-1 justify-center items-center`}>
      <Text className="text-white">
        Hello, this is the dashboard, {user?.firstName}
      </Text>
      <Button
        className="flex items-center justify-center bg-transparent"
        onPress={() => signOut()}
      >
        <Text className="text-white">Sign out</Text>
      </Button>
    </View>
  );
}
