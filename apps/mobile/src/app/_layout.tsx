import "../global.css";
import "@fontsource/metropolis";

import React from "react";
import { ClerkProvider } from "@clerk/clerk-expo";
import { GluestackUIProvider, config } from "gluestack-ui";
import * as SecureStore from "expo-secure-store";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Dashboard from "./dashboard";
import Contacts from "./contacts";
import { Info } from "phosphor-react-native";
import Settings from "./settings";
import App from ".";
import Login from "./login";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      sceneContainerStyle={{ backgroundColor: "#0F1A24 !important" }}
    >
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

const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

const RootLayout = () => {
  if (!CLERK_PUBLISHABLE_KEY) {
    throw new Error("No Clerk Publishable Key Available");
  }

  return (
    <ClerkProvider
      tokenCache={tokenCache}
      publishableKey={CLERK_PUBLISHABLE_KEY}
    >
      <GluestackUIProvider config={config.theme}>
        {/* <Stack.Navigator initialRouteName="index">
          <Stack.Screen
            name="main"
            component={MyTabs}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="index"
            component={App}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="login/index"
            component={Login}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator> */}

        <Tab.Navigator
          sceneContainerStyle={{ backgroundColor: "#0F1A24" }}
          initialRouteName="index"
        >
          <Tab.Screen
            name="index"
            component={App}
            options={{
              headerShown: false,
            }}
          />
          <Tab.Screen
            name="login/index"
            component={Login}
            options={{
              headerShown: false,
            }}
          />
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
              tabBarLabel: "Settings",
            }}
          />
        </Tab.Navigator>
      </GluestackUIProvider>
    </ClerkProvider>
  );
};

export default RootLayout;
