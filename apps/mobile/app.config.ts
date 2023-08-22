import type { ExpoConfig } from "@expo/config";

const projectId = process.env.EXPO_PUBLIC_EAS_PROJECT_ID;

if (!projectId) {
  throw new Error(
    "Please set the EXPO_PUBLIC_EAS_PROJECT_ID environment variable to your EAS project ID."
  );
}

const defineConfig = (): ExpoConfig => ({
  name: "lil-networking",
  slug: "lil-networking",
  scheme: "expo",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "dark",
  splash: {
    image: "./assets/splash.png",
    resizeMode: "contain",
    backgroundColor: "#0F1A24",
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: true,
    bundleIdentifier: "com.foundrymakes.lil-networking",
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/icon.png",
      backgroundColor: "#1F104A",
    },
  },
  extra: {
    eas: {
      projectId,
    },
  },
  experiments: {
    tsconfigPaths: true,
  },
  plugins: ["./expo-plugins/with-modify-gradle.js", "expo-router"],
});

export default defineConfig;
