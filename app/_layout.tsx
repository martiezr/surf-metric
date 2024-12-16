import { Stack } from "expo-router";
import { ThemeProvider } from "../shared/theme-context";


export default function RootLayout() {
  return (
    <ThemeProvider>
      <Stack 
        screenOptions={{
          headerShown: false
        }}
      />
    </ThemeProvider>
  );
}