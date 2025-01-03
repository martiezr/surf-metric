// app/(tabs)/_layout.tsx
import React from "react";
import { Tabs } from "expo-router";
import { Home, PlusCircle, BookOpen, BarChart2, Settings } from "lucide-react-native";
import { useTheme } from "../contexts/themeContext";
import { createStyles } from "../../styles";

export default function TabLayout() {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: theme.tabActive,
        tabBarInactiveTintColor: theme.tabInactive,
        headerStyle: styles.header,
        headerTitleAlign: "center",
        headerTintColor: theme.text,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
          headerTitle: "Surf Metric",
        }}
      />
      <Tabs.Screen
        name="log-session"
        options={{
          title: "Log Session",
          tabBarIcon: ({ color, size }) => <PlusCircle size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="sessions"
        options={{
          title: "Sessions",
          tabBarIcon: ({ color, size }) => <BookOpen size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="insights"
        options={{
          title: "Insights",
          tabBarIcon: ({ color, size }) => <BarChart2 size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings", 
          tabBarIcon: ({ color, size }) => <Settings size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}