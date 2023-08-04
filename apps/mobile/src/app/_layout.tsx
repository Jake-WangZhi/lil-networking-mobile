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

const theme: ITheme = extendTheme({
  button: {
    height: "48px",
  },
});
const CLERK_PUBLISHABLE_KEY =
  "pk_test_cmF0aW9uYWwtbWFsYW11dGUtNTkuY2xlcmsuYWNjb3VudHMuZGV2JA";

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
