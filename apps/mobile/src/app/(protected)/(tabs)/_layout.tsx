import { Tabs } from "expo-router";
import { Gear, House, Users } from "phosphor-react-native";

export default function ProtectedLayout() {
  return (
    <Tabs
      sceneContainerStyle={{
        backgroundColor: "#0F1A24",
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
              color={focused ? "white" : "rgba(255, 255, 255, 0.7)"}
              weight={focused ? "fill" : "bold"}
            />
          ),
          tabBarLabel: "Dashboard",
          tabBarStyle: { backgroundColor: "#0F1A24", borderTopWidth: 0 },
          tabBarActiveTintColor: "white",
          tabBarInactiveTintColor: "rgba(255, 255, 255, 0.7)",
          tabBarLabelStyle: { fontWeight: "600", fontSize: 11 },
        }}
      />
      <Tabs.Screen
        name="contacts/index"
        options={{
          tabBarIcon: ({ focused }) => (
            <Users
              color={focused ? "white" : "rgba(255, 255, 255, 0.7)"}
              weight={focused ? "fill" : "bold"}
            />
          ),
          tabBarLabel: "Contacts",
          tabBarStyle: { backgroundColor: "#0F1A24", borderTopWidth: 0 },
          tabBarActiveTintColor: "white",
          tabBarInactiveTintColor: "rgba(255, 255, 255, 0.7)",
          tabBarLabelStyle: { fontWeight: "600", fontSize: 11 },
        }}
      />
      <Tabs.Screen
        name="settings/index"
        options={{
          tabBarIcon: ({ focused }) => (
            <Gear
              color={focused ? "white" : "rgba(255, 255, 255, 0.7)"}
              weight={focused ? "fill" : "bold"}
            />
          ),
          tabBarLabel: "Settings",
          tabBarStyle: { backgroundColor: "#0F1A24", borderTopWidth: 0 },
          tabBarActiveTintColor: "white",
          tabBarInactiveTintColor: "rgba(255, 255, 255, 0.7)",
          tabBarLabelStyle: { fontWeight: "600", fontSize: 11 },
        }}
      />
    </Tabs>
  );
}
