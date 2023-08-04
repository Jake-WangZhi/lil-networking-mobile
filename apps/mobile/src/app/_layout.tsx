import React from "react";
import { Stack } from "expo-router";
import {
  NativeBaseProvider,
  StatusBar,
  extendTheme,
  ITheme,
} from "native-base";
import "../global.css";
import "@fontsource/metropolis";

const theme: ITheme = extendTheme({
  button: {
    height: "48px",
  },
});

const RootLayout = () => {
  return (
    <NativeBaseProvider theme={theme}>
      <Stack screenOptions={{ headerShown: false }} />
      <StatusBar barStyle={"light-content"} />
    </NativeBaseProvider>
  );
};

export default RootLayout;
