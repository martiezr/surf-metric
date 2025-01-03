// app/_layout.tsx
import React from "react";
import { Stack } from "expo-router";
import { AppProviders } from "./providers"; // <-- renamed from _app.tsx to providers.tsx
import { useTheme } from "./contexts/themeContext";

export default function RootLayout() {
  return (
    <AppProviders>
      <LayoutContent />
    </AppProviders>
  );
}

function LayoutContent() {
  const { theme } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: theme.background },
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} /> 
      {/* Additional <Stack.Screen> items as needed. */}
    </Stack>
  );
}
