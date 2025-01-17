import logo from "~/images/icon.png";
import colors from "tailwindcss/colors";

import { useOAuth } from "@clerk/clerk-expo";
import * as WebBrowser from "expo-web-browser";
import { ArrowsClockwise, Notepad, UsersThree } from "phosphor-react-native";
import { Image, Text, View } from "react-native";
import Ripple from "react-native-material-ripple";
import { useWarmUpBrowser } from "~/hooks/useWarmUpBrowser";

WebBrowser.maybeCompleteAuthSession();

export default function Login() {
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_linkedin" });

  const onSignInPress = async () => {
    try {
      const { createdSessionId, setActive } = await startOAuthFlow();

      if (createdSessionId && setActive) {
        await setActive({ session: createdSessionId });
      }
    } catch (err: unknown) {
      console.log(err);
    }
  };

  return (
    <View className="flex-1 px-16 pt-40 pb-24 bg-dark-blue justify-center items-center">
      <Image source={logo} alt="Logo" className="w-[186] h-[186]" />
      <Text className="text-white text-2xl font-semibold leading-8">
        Lil&apos; Networking App
      </Text>

      <View className="my-14 space-y-6">
        <View className="flex-row space-x-4">
          <Notepad color={colors.white} />
          <Text className="text-white text-xl">Build Networking Habits</Text>
        </View>
        <View className="flex-row space-x-4">
          <UsersThree color={colors.white} />
          <Text className="text-white text-xl">Maintain Relationships</Text>
        </View>
        <View className="flex-row space-x-4">
          <ArrowsClockwise color={colors.white} />
          <Text className="text-white text-xl">Stay Connected</Text>
        </View>
      </View>

      <Ripple
        className="flex items-center justify-center rounded-[28px] bg-light-blue w-52 h-12 mt-16"
        onPress={onSignInPress}
      >
        <Text className="text-black text-base font-semibold">
          Sign in with LinkedIn
        </Text>
      </Ripple>
    </View>
  );
}
