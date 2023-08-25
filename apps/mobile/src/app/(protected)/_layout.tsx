import { Stack } from "expo-router";
import { colors } from "@foundrymakes/tailwind-config";

export default function ProtectedLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: colors["dark-blue"],
          paddingTop: 72,
          paddingHorizontal: 16,
        },
      }}
    >
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="quote" />
      <Stack.Screen name="create_new_contact" />
      <Stack.Screen name="profile/[contactId]/index" />
    </Stack>
  );
}
