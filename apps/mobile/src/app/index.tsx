import { Button, Text, View, Image, Center, VStack, HStack } from "native-base";
import logo from "../../assets/icon.png";
import { Notepad, UsersThree, ArrowsClockwise } from "phosphor-react-native";

export default function App() {
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
          onPress={() => {}}
        >
          <Text className={`text-black`}>Sign in with LinkedIn</Text>
        </Button>
      </Center>
    </View>
  );
}
