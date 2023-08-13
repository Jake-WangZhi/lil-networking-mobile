import { House, Users, Gear } from "phosphor-react-native";
import { Tabs } from "expo-router";

export default function Layout() {
  return (
    <Tabs
      sceneContainerStyle={{
        backgroundColor: "#0F1A24",
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
          headerShown: false,
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
          headerShown: false,
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
          headerShown: false,
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
