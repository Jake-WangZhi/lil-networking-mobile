import { useUser } from "@clerk/clerk-expo";
import { router } from "expo-router";
import { Text, View } from "react-native";
import Ripple from "react-native-material-ripple";
import { useQuote } from "~/hooks/useQuote";

export default function Quote() {
  const { user } = useUser();

  const { quote, isLoading, isError } = useQuote(user?.id ?? "");

  if (isError) {
    return null;
  }

  if (isLoading) {
    return null;
  }

  if (!quote) {
    return null;
  }

  return (
    <View className="flex-1 justify-center items-center bg-dark-blue">
      <Text className="text-white">{quote.text}</Text>
      <Ripple onPress={() => router.push("/contacts")}>
        <Text>Quote</Text>
      </Ripple>
    </View>
  );
}
