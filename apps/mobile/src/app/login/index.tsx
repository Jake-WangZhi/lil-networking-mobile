// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const logo = require("~/images/icon.png");

import { Center, VStack, HStack } from "@gluestack-ui/react";
import { Notepad, UsersThree, ArrowsClockwise } from "phosphor-react-native";
import { useOAuth } from "@clerk/clerk-expo";
import { View, Text, Image } from "react-native";
import { useWarmUpBrowser } from "~/hooks/useWarmUpBrowser";
import Ripple from "react-native-material-ripple";
import { router } from "expo-router";

export default function Login() {
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_linkedin" });

  const onSignInPress = async () => {
    try {
      const { createdSessionId, setActive } = await startOAuthFlow();

      if (createdSessionId && setActive) {
        await setActive({ session: createdSessionId });
        router.push("/dashboard");
      } else {
        console.log("failed to sign in");
      }
    } catch (err: unknown) {
      console.log(err);
    }
  };

  return (
    <View className="flex-1 px-16 pt-40 pb-24 bg-dark-blue justify-between">
      <Center>
        <Image
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          source={logo}
          alt="Alternate Text"
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
