import { useUser } from "@clerk/clerk-expo";
import { View, Text } from "react-native";
import { PlusCircle } from "phosphor-react-native";
import Ripple from "react-native-material-ripple";
import { DashboardTutorialModal } from "~/components/DashboardTutorialModal";
import { Loading } from "~/components/Loading";
import { Tooltip } from "~/components/Tooltip";
import { useDashboardTutorial } from "~/hooks/useDashboardTutorial";
import { Feather } from "@expo/vector-icons";
import { Link } from "expo-router";
import { ActionList } from "~/components/ActionList";
import { colors } from "@foundrymakes/tailwind-config";

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
          <Link href="/create_new_contact" asChild>
            <Ripple>
              <Feather
                name="plus-square"
                size={48}
                color={colors["light-blue"]}
              />
            </Ripple>
          </Link>
        </View>
      </View>
      <Ripple
        style={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
        className="flex justify-center items-center mt-6 border border-dashed border-white rounded-xl h-[140]"
      >
        <View className="flex flex-row items-center space-x-2">
          <PlusCircle color={colors.white} size={32} />
          <Text className="text-white font-normal">Add Goals</Text>
        </View>
      </Ripple>
      <ActionList />
      {!hasViewedDashboardTutorial && <DashboardTutorialModal />}
    </>
  );
}
