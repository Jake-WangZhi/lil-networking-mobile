import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Dashboard from "../dashboard";
import { Info } from "phosphor-react-native";
import Contacts from "../contacts";
import Settings from "../settings";

const Tab = createBottomTabNavigator();

export default function Main() {
  return (
    <Tab.Navigator sceneContainerStyle={{ backgroundColor: "#0F1A24" }}>
      <Tab.Screen
        name="dashboard/index"
        component={Dashboard}
        options={{
          tabBarIcon: () => <Info />,
          headerShown: false,
          tabBarLabel: "Dashboard",
        }}
      />
      <Tab.Screen
        name="contacts/index"
        component={Contacts}
        options={{
          tabBarIcon: () => <Info />,
          headerShown: false,
          tabBarLabel: "Contacts",
        }}
      />
      <Tab.Screen
        name="settings/index"
        component={Settings}
        options={{
          tabBarIcon: () => <Info />,
          headerShown: false,
          tabBarLabel: "Contacts",
        }}
      />
    </Tab.Navigator>
  );
}
