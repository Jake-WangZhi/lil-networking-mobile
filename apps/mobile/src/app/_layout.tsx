import "@fontsource/metropolis";
import "../global.css";

import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { GluestackUIProvider, config } from "@gluestack-ui/react";
import React, { useEffect } from "react";

import { Slot, useRouter, useSegments } from "expo-router";
import { tokenCache } from "~/utils/cache";

const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;
if (!CLERK_PUBLISHABLE_KEY) {
  throw new Error("No Clerk Publishable Key Available");
}

const Layout = () => {
  const { isLoaded, isSignedIn } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;

    const inTabsGroup = segments[0] === "(protected)";

    if (isSignedIn && !inTabsGroup) {
      router.replace("/dashboard");
    } else if (!isSignedIn) {
      router.replace("/login");
    }
  }, [isSignedIn, isLoaded, segments, router]);

  return <Slot />;
};

const RootLayout = () => {
  return (
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    <GluestackUIProvider config={config.theme}>
      <ClerkProvider
        tokenCache={tokenCache}
        publishableKey={CLERK_PUBLISHABLE_KEY}
      >
        <Layout />
      </ClerkProvider>
    </GluestackUIProvider>
  );
};

export default RootLayout;
