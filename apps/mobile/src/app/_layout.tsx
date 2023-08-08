import "../global.css";
import "@fontsource/metropolis";

import React from "react";
import { Stack } from "expo-router";
import { GluestackUIProvider } from "../components/GluestackUIProvider";

import { ClerkProvider } from "@clerk/clerk-expo";
import { StatusBar } from "react-native";
import { config } from "gluestack-ui/build/gluestack-ui.config";

const RootLayout = () => {
  const CLERK_PUBLISHABLE_KEY =
    process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY || "";

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
