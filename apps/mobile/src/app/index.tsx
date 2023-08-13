import { View } from "react-native";
import { SignedIn, SignedOut } from "@clerk/clerk-expo";
import Login from "./login";
import { Redirect } from "expo-router";

export default function App() {
  return (
    <View className="flex-1">
      <SignedIn>
        <Redirect href="/dashboard" />
      </SignedIn>
      <SignedOut>
        <Login />
      </SignedOut>
    </View>
  );
}
