import { Stack } from "expo-router";
import { ThemeProvider } from "./contexts/themeContext";
import { SessionsProvider } from "./contexts/sessionsContext";
import { SettingsProvider } from "./contexts/settingsContext"


export default function RootLayout() {
  return (
    <SettingsProvider>
      <ThemeProvider>
        <SessionsProvider>
          <Stack 
            screenOptions={{
              headerShown: false
            }}
          />
        </SessionsProvider>
      </ThemeProvider>
    </SettingsProvider>
  );
}