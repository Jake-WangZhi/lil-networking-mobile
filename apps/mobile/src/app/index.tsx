import { View } from "react-native";
import { SignedIn, SignedOut } from "@clerk/clerk-expo";
import Dashboard from "./dashboard";
import Login from "./login";

export default function App() {
  return (
    <View className="bg-dark-blue flex-1">
      <SignedIn>
        <Dashboard />
      </SignedIn>
      <SignedOut>
        <Login />
      </SignedOut>
    </View>
  );
}
