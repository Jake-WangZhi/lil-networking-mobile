import "@fontsource/metropolis";
import "../global.css";

import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
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
    <ClerkProvider
      tokenCache={tokenCache}
      publishableKey={CLERK_PUBLISHABLE_KEY}
    >
      <Layout />
    </ClerkProvider>
  );
};

export default RootLayout;
