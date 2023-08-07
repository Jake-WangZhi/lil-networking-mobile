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
import { UserProvider } from "~/contexts/userContext";
import { CLERK_PUBLISHABLE_KEY } from "@env";

const theme: ITheme = extendTheme({
  button: {
    height: "48px",
  },
});

const RootLayout = () => {
  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
      <NativeBaseProvider theme={theme}>
        <UserProvider>
          <Stack screenOptions={{ headerShown: false }} />
          <StatusBar barStyle={"light-content"} />
        </UserProvider>
      </NativeBaseProvider>
    </ClerkProvider>
  );
};

export default RootLayout;
