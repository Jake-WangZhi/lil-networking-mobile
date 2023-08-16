const logo = require("~/images/icon.png");

import { useOAuth } from "@clerk/clerk-expo";
import { Center, HStack, VStack } from "@gluestack-ui/react";
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
    <View className="flex-1 px-16 pt-40 pb-24 bg-dark-blue justify-between">
      <Center>
        <Image
          source={logo}
          alt="Logo"
          style={{
            height: 186,
            width: 186,
          }}
        />
        <Text className="text-white text-2xl font-semibold leading-8">
          Lil&apos; Networking App
        </Text>

        <View className="py-14">
          <VStack space="3xl">
            <HStack space="lg">
              <Notepad color="white" />
              <Text className="text-white text-xl">
                Build Networking Habits
              </Text>
            </HStack>
            <HStack space="lg">
              <UsersThree color="white" />
              <Text className="text-white text-xl">Maintain Relationships</Text>
            </HStack>
            <HStack space="lg">
              <ArrowsClockwise color="white" />
              <Text className="text-white text-xl">Stay Connected</Text>
            </HStack>
          </VStack>
        </View>
      </Center>

      <Center>
        <Ripple
          className="flex items-center justify-center rounded-[28px] bg-light-blue w-52 h-12"
          onPress={onSignInPress}
        >
          <Text className="text-black">Sign in with LinkedIn</Text>
        </Ripple>
      </Center>
    </View>
  );
}
