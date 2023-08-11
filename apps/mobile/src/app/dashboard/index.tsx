const animationData = require("~/lottie/add-and-save.json");

import { useUser } from "@clerk/clerk-expo";
import { Button, Text } from "gluestack-ui";
import { TouchableOpacity, View } from "react-native";
import { Info, PlusCircle } from "phosphor-react-native";
import LottieView from "lottie-react-native";
import Tooltip from "react-native-walkthrough-tooltip";
import { useState } from "react";

export default function Dashboard() {
  const { user } = useUser();
  const [showTip, setTip] = useState(false);

  if (!user) {
    return (
      <View className={`flex-1 justify-center items-center`}>
        <Text className="text-white">No User Found</Text>
      </View>
    );
  }

  return (
    <>
      <View className="px-4">
        <View className="flex-row justify-between items-center pt-20">
          <Text className="text-white text-3xl font-semibold leading-10">
            Hi, {user.firstName}
          </Text>
          <Tooltip
            backgroundColor="transparent"
            contentStyle={{ backgroundColor: "#0F1A24", padding: 0 }}
            arrowStyle={{
              backgroundColor: "#0F1A24",
              borderTopColor: "rgba(255, 255, 255, 0.16)",
            }}
            isVisible={showTip}
            content={
              <View
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.16)",
                  padding: 16,
                  gap: 16,
                }}
              >
                <View>
                  <Text className="text-white font-bold text-sm">
                    Priority:{" "}
                    <Text className="text-white text-sm">
                      Items that have been actionable for 10+ days
                    </Text>
                  </Text>
                </View>
                <View>
                  <Text className="text-white font-bold text-sm">
                    Upcoming:{" "}
                    <Text className="text-white text-sm">
                      Items that have been actionable between 0-10 days
                    </Text>
                  </Text>
                </View>
              </View>
            }
            onClose={() => setTip(false)}
            placement="bottom"
          >
            <TouchableOpacity onPress={() => setTip(true)}>
              <Info color="white" size={48} />
            </TouchableOpacity>
          </Tooltip>
        </View>
        <Button
          style={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
          className="mt-6 space-x-2 border border-dashed border-white border-opacity-[0.07] rounded-xl h-[140] bg-dark-blue hover:border-white"
        >
          <PlusCircle color="white" />
          <Text className="text-white font-normal">Add Goals</Text>
        </Button>
      </View>
      <View className="px-14 pt-28">
        <View className="flex justify-center items-center space-y-6">
          <View>
            <LottieView
              autoPlay
              style={{
                width: 75,
                height: 75,
                backgroundColor: "transparent",
              }}
              source={animationData}
              loop={false}
            />
          </View>
          <View>
            <Text className="text-2xl text-white text-center">
              Your Dashboard is empty
            </Text>
            <Text className="text-base text-white text-center">
              Add contacts and your reminders will show up here.
            </Text>
          </View>
        </View>
      </View>
    </>
  );
}
