import { Link } from "expo-router";
import { SafeAreaView, Text } from "react-native";
import { Loading } from "~/components/Loading";
import { useQuote } from "~/hooks/useQuote";

export default function Quote() {
  const { data: quote, isLoading, error } = useQuote();

  if (isLoading) return <Loading />;

  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-dark-blue">
      {!!quote && <Text className="text-white">{quote.text}</Text>}
      {!!error && (
        <Text className="text-white">{JSON.stringify(error, null, 2)}</Text>
      )}
      <Link href=".." className="text-white">
        Back
      </Link>
    </SafeAreaView>
  );
}
