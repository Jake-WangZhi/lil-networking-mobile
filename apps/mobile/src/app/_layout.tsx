import "../global.css";
import "@fontsource/metropolis";

import React from "react";
import { Stack } from "expo-router";
import { ClerkProvider } from "@clerk/clerk-expo";
import { StatusBar } from "react-native";
import { GluestackUIProvider, config } from "gluestack-ui";

const CLERK_PUBLISHABLE_KEY =
  process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY || "";

const RootLayout = () => {
  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
      <GluestackUIProvider config={config.theme}>
        <Stack screenOptions={{ headerShown: false }} />
        <StatusBar barStyle={"light-content"} />
      </GluestackUIProvider>
    </ClerkProvider>
  );
};

export default RootLayout;
