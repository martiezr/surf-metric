import { Stack } from 'expo-router';
import { useTheme } from "../../contexts/themeContext";

export default function SessionsLayout() {
  const { theme } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.headerBackground,
        },
        headerTintColor: theme.text,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        presentation: 'modal',
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Surf Sessions",
        }}
      />
    </Stack>
  );
}
