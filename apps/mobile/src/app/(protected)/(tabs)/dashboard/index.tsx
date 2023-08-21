import animationData from "~/lottie/add-and-save.json";

import { useUser } from "@clerk/clerk-expo";
import { View, Text } from "react-native";
import { PlusCircle } from "phosphor-react-native";
import LottieView from "lottie-react-native";
import Ripple from "react-native-material-ripple";
import { DashboardTutorialModal } from "~/components/DashboardTutorialModal";
import { Loading } from "~/components/Loading";
import { Tooltip } from "~/components/Tooltip";
import { useDashboardTutorial } from "~/hooks/useDashboardTutorial";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";

export default function Dashboard() {
  const { user } = useUser();

  const { hasViewedDashboardTutorial } = useDashboardTutorial();

  if (!user) {
    return <Loading />;
  }

  return (
    <>
      <View className="flex-row justify-between items-center">
        <Text className="text-white text-3xl font-semibold leading-10">
          Hi, {user.firstName}
        </Text>
        <View className="flex-row items-center space-x-4">
          <Tooltip
            content={
              <View className="space-y-4">
                <View>
                  <Text className="text-white font-bold text-sm">
                    Priority:{" "}
                    <Text className="text-white font-normal text-sm break-words">
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
          <Ripple onPress={() => router.push("/create_new_contact")}>
            <Feather name="plus-square" size={48} color="#38ACE2" />
          </Ripple>
        </View>
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
      <View className="px-14 flex-1 justify-center items-center">
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
      {!hasViewedDashboardTutorial && <DashboardTutorialModal />}
    </>
  );
}
