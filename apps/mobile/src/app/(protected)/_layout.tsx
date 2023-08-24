import { Stack } from "expo-router";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../../tailwind.config";

const fullConfig = resolveConfig(tailwindConfig);

export default function ProtectedLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: fullConfig.theme?.colors?.["dark-blue"],
          paddingTop: 72,
          paddingHorizontal: 16,
        },
      }}
    >
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="quote" />
      <Stack.Screen name="create_new_contact" />
    </Stack>
  );
}
