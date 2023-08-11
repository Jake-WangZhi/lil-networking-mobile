import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Dashboard from "../dashboard";
import { House, Users, Gear } from "phosphor-react-native";
import Contacts from "../contacts";
import Settings from "../settings";

const Tab = createBottomTabNavigator();

export default function Main() {
  return (
    <Tab.Navigator
      sceneContainerStyle={{
        backgroundColor: "#0F1A24",
      }}
    >
      <Tab.Screen
        name="dashboard/index"
        component={Dashboard}
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
      <Tab.Screen
        name="contacts/index"
        component={Contacts}
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
      <Tab.Screen
        name="settings/index"
        component={Settings}
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
    </Tab.Navigator>
  );
}
