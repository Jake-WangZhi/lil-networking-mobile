import "../global.css";
import "@fontsource/metropolis";

import React from "react";
import { Stack } from "expo-router";
import { ClerkProvider } from "@clerk/clerk-expo";
import { StatusBar } from "react-native";
import { GluestackUIProvider, config } from "gluestack-ui";
import * as SecureStore from "expo-secure-store";

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
        <Stack screenOptions={{ headerShown: false }} />
        <StatusBar barStyle={"light-content"} />
      </GluestackUIProvider>
    </ClerkProvider>
  );
};

export default RootLayout;
