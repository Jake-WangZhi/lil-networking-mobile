import animationData from "~/lottie/add-and-save.json";

import { useUser } from "@clerk/clerk-expo";
import { View, Text } from "react-native";
import { PlusCircle } from "phosphor-react-native";
import LottieView from "lottie-react-native";
import Ripple from "react-native-material-ripple";
import { DashboardTutorialModal } from "~/components/DashboardTutorialModal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Loading } from "~/components/Loading";
import { Tooltip } from "~/components/Tooltip";

export default function Dashboard() {
  const { user } = useUser();
  const [viewedTutorial, setViewedTutorial] = useState(false);

  const checkTutorial = async () => {
    try {
      const value = await AsyncStorage.getItem("@viewedDashboardTutorial");
      if (value !== null) {
        setViewedTutorial(true);
      }
    } catch (err) {
      console.log("Error @checkDashboardTutorial");
    }
  };

  useEffect(() => {
    void checkTutorial();
  }, []);

  if (!user) {
    return <Loading />;
  }

  return (
    <>
      <View className="px-4">
        <View className="flex-row justify-between items-center pt-20">
          <Text className="text-white text-3xl font-semibold leading-10">
            Hi, {user.firstName}
          </Text>
          <Tooltip
            content={
              <View className="space-y-4">
                <View>
                  <Text className="text-white font-bold text-sm">
                    Priority:{" "}
                    <Text className="text-white font-normal text-sm">
                      Items that have been actionable for 10+ days
                    </Text>
                  </Text>
                </View>
                <View>
                  <Text className="text-white font-bold text-sm">
                    Upcoming:{" "}
                    <Text className="text-white font-normal text-sm">
                      Items that have been actionable between 0-10 days
                    </Text>
                  </Text>
                </View>
              </View>
            }
          />
        </View>
        <Ripple
          style={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
          className="flex justify-center items-center mt-6 border border-dashed border-white rounded-xl h-[140]"
        >
          <View className="flex flex-row items-center space-x-2">
            <PlusCircle color="white" size={32} />
            <Text className="text-white font-normal">Add Goals</Text>
          </View>
        </Ripple>
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
      {!viewedTutorial && <DashboardTutorialModal />}
    </>
  );
}
