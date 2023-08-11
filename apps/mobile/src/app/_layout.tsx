import "../global.css";
import "@fontsource/metropolis";

import React from "react";
import { ClerkProvider } from "@clerk/clerk-expo";
import { GluestackUIProvider, config } from "gluestack-ui";
import * as SecureStore from "expo-secure-store";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import App from ".";
import Login from "./login";
import main from "./main";

const Stack = createNativeStackNavigator();

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
    <GluestackUIProvider config={config.theme}>
      <ClerkProvider
        tokenCache={tokenCache}
        publishableKey={CLERK_PUBLISHABLE_KEY}
      >
        <Stack.Navigator
          initialRouteName="index"
          screenOptions={{ headerShown: false }}
        >
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
          <Stack.Screen
            name="main/index"
            component={main}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </ClerkProvider>
    </GluestackUIProvider>
  );
};

export default RootLayout;
