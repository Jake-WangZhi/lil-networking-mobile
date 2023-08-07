import { Button, Text, View, Image, Center, VStack, HStack } from "native-base";
import logo from "../../../assets/icon.png";
import { Notepad, UsersThree, ArrowsClockwise } from "phosphor-react-native";
import { useOAuth } from "@clerk/clerk-expo";

export default function Login() {
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_linkedin" });

  const onSignInPress = async () => {
    try {
      const { createdSessionId, setActive, signIn } = await startOAuthFlow();

      if (createdSessionId && setActive) {
        setActive({ session: createdSessionId });
      } else {
        console.log("failed to sign in");
      }
    } catch (err: any) {
      console.log(err);
    }
  };

  return (
    <View className={`flex-1 px-16 pt-40 pb-24 bg-dark-blue justify-between`}>
      <Center>
        <Image source={logo} alt="Alternate Text" size={186} />
        <Text className={`text-white text-2xl font-semibold leading-8`}>
          Lil' Networking App
        </Text>

        <View className="py-14">
          <VStack space={7}>
            <HStack space={4}>
              <Notepad color="white" />
              <Text className="text-white text-xl">
                Build Networking Habits
              </Text>
            </HStack>
            <HStack space={4}>
              <UsersThree color="white" />
              <Text className="text-white text-xl">Maintain Relationships</Text>
            </HStack>
            <HStack space={4}>
              <ArrowsClockwise color="white" />
              <Text className="text-white text-xl">Stay Connected</Text>
            </HStack>
          </VStack>
        </View>
      </Center>

      <Center>
        <Button
          className={`flex items-center justify-center rounded-[28px] bg-light-blue w-48`}
          onPress={onSignInPress}
        >
          <Text className={`text-black`}>Sign in with LinkedIn</Text>
        </Button>
      </Center>
    </View>
  );
}
