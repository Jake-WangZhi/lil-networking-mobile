import { View } from "react-native";
import { SignedIn, SignedOut } from "@clerk/clerk-expo";
import Dashboard from "./dashboard";
import Login from "./login";
import Contacts from "./contacts";
import Settings from "./settings";

export default function App() {
  return (
    <View className="flex-1">
      <SignedIn>
        <Dashboard />
      </SignedIn>
      <SignedIn>
        <Contacts />
      </SignedIn>
      <SignedIn>
        <Settings />
      </SignedIn>
      <SignedOut>
        <Login />
      </SignedOut>
    </View>
  );
}
