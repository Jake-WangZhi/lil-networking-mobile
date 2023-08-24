import { Stack } from "expo-router";

export default function ProtectedLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: "#0F1A24",
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
