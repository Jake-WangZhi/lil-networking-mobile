import { Text, View } from "native-base";
import { useUserContext } from "~/contexts/userContext";

export default function Dashboard() {
  const { user } = useUserContext();

  return (
    <View className={`flex-1 justify-center items-center`}>
      <Text className="text-white">
        Hello, this is the dashboard, {user.firstName}
      </Text>
    </View>
  );
}
