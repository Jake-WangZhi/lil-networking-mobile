import { Tabs } from "expo-router";
import { Gear, House, Users } from "phosphor-react-native";
import { colors } from "@foundrymakes/tailwind-config";

export default function ProtectedLayout() {
  return (
    <Tabs
      sceneContainerStyle={{
        backgroundColor: colors["dark-blue"],
      }}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="dashboard/index"
        options={{
          tabBarIcon: ({ focused }) => (
            <House
              color={focused ? colors.white : "rgba(255, 255, 255, 0.7)"}
              weight={focused ? "fill" : "bold"}
            />
          ),
          tabBarLabel: "Dashboard",
          tabBarStyle: {
            backgroundColor: colors["dark-blue"],
            borderTopWidth: 0,
          },
          tabBarActiveTintColor: colors.white,
          tabBarInactiveTintColor: "rgba(255, 255, 255, 0.7)",
          tabBarLabelStyle: { fontWeight: "600", fontSize: 11 },
        }}
      />
      <Tabs.Screen
        name="contacts/index"
        options={{
          tabBarIcon: ({ focused }) => (
            <Users
              color={focused ? colors.white : "rgba(255, 255, 255, 0.7)"}
              weight={focused ? "fill" : "bold"}
            />
          ),
          tabBarLabel: "Contacts",
          tabBarStyle: {
            backgroundColor: colors["dark-blue"],
            borderTopWidth: 0,
          },
          tabBarActiveTintColor: colors.white,
          tabBarInactiveTintColor: "rgba(255, 255, 255, 0.7)",
          tabBarLabelStyle: { fontWeight: "600", fontSize: 11 },
        }}
      />
      <Tabs.Screen
        name="settings/index"
        options={{
          tabBarIcon: ({ focused }) => (
            <Gear
              color={focused ? colors.white : "rgba(255, 255, 255, 0.7)"}
              weight={focused ? "fill" : "bold"}
            />
          ),
          tabBarLabel: "Settings",
          tabBarStyle: {
            backgroundColor: colors["dark-blue"],
            borderTopWidth: 0,
          },
          tabBarActiveTintColor: colors.white,
          tabBarInactiveTintColor: "rgba(255, 255, 255, 0.7)",
          tabBarLabelStyle: { fontWeight: "600", fontSize: 11 },
        }}
      />
    </Tabs>
  );
}
