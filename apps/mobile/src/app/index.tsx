import { View } from "react-native";
import { SignedIn, SignedOut } from "@clerk/clerk-expo";
import Login from "./login";
import Main from "./main";

export default function App() {
  return (
    <View className="flex-1">
      <SignedIn>
        <Main />
      </SignedIn>
      <SignedOut>
        <Login />
      </SignedOut>
    </View>
  );
}
