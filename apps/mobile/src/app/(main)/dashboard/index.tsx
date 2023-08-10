import { useUser } from "@clerk/clerk-expo";
import { Button, Text, Tooltip } from "gluestack-ui";
import { View } from "react-native";
import { Info, PlusCircle } from "phosphor-react-native";
import LottieView from "lottie-react-native";
import { useEffect, useRef } from "react";
const data = require("../../../../lottie/animation_ll55eo2f.json");

export default function Dashboard() {
  const { user } = useUser();
  const animation = useRef(null);
  useEffect(() => {
    // You can control the ref programmatically, rather than using autoPlay
    // animation.current?.play();
  }, []);

  if (!user) {
    return (
      <View className={`flex-1 justify-center items-center`}>
        <Text className="text-white">No User Found</Text>
      </View>
    );
  }

  return (
    <View className="px-4 pt-20">
      <View className="flex-row justify-between items-center">
        <Text className="text-white text-3xl font-semibold leading-10">
          Hi, {user.firstName}
        </Text>
        <Tooltip
          placement="bottom left"
          trigger={(triggerProps) => {
            return <Info color="white" size={48} />;
          }}
        >
          <TooltipContent>
            <TooltipText></TooltipText>
          </TooltipContent>
        </Tooltip>
      </View>
      <Button className="mt-6 space-x-2 border border-dashed border-white border-opacity-[0.07] rounded-xl h-[140] bg-dark-blue hover:border-white">
        <PlusCircle color="white" />
        <Text className="text-white font-normal">Add Goals</Text>
      </Button>
      <View className="flex-1 justify-center items-center bg-transparent">
        <LottieView
          autoPlay
          ref={animation}
          style={{
            width: 200,
            height: 200,
            backgroundColor: "transparent",
          }}
          // Find more Lottie files at https://lottiefiles.com/featured
          source={data}
        />
      </View>
      {/* <Button
        onClick={() => {}}
        style={{
          width: "100%",
          gap: "4px",
          border: "1px dashed rgba(255, 255, 255, 0.7)",
          borderRadius: "12px",
          height: "140px",
          backgroundColor: "rgba(255, 255, 255, 0.05) !important",
          "&:hover": {
            border: "1px dashed rgba(255, 255, 255, 0.7)",
            borderRadius: "12px",
          },
        }}
      >
        <PlusCircle />
        Add Goal
      </Button> */}
      {/* <Button
        className="flex items-center justify-center bg-transparent"
        onPress={() => signOut()}
      >
        <Text className="text-white">Sign out</Text>
      </Button> */}
    </View>
  );
}
