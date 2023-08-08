import "../global.css";
import "@fontsource/metropolis";

import React from "react";
import { Stack } from "expo-router";
import {
  NativeBaseProvider,
  StatusBar,
  extendTheme,
  ITheme,
} from "native-base";
import { ClerkProvider } from "@clerk/clerk-expo";

const theme: ITheme = extendTheme({
  button: {
    height: "48px",
  },
});

const RootLayout = () => {
  const CLERK_PUBLISHABLE_KEY =
    process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY || "";

  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
      <NativeBaseProvider theme={theme}>
        <Stack screenOptions={{ headerShown: false }} />
        <StatusBar barStyle={"light-content"} />
      </NativeBaseProvider>
    </ClerkProvider>
  );
};

export default RootLayout;
