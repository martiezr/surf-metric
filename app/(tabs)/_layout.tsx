import React from "react";
import { Tabs } from "expo-router";
import { Home, PlusCircle, BookOpen, BarChart2, Settings } from "lucide-react-native";
import { useTheme } from "../../shared/theme-context";
import { createStyles } from "../../shared/styles";

const TabLayout = () => {
  const { theme } = useTheme(); // Access current theme
  const styles = createStyles(theme); // Generate styles dynamically based on theme

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: theme.tabActive,
        tabBarInactiveTintColor: theme.tabInactive,
        headerStyle: styles.header,
        headerTitleAlign: "center",
        headerTintColor: theme.text, // Fixed theme property for header text
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
          title: "Log",
          tabBarIcon: ({ color, size }) => <PlusCircle size={size} color={color} />,
          headerTitle: "Log Session",
        }}
      />
      <Tabs.Screen
        name="view-sessions"
        options={{
          title: "Sessions",
          tabBarIcon: ({ color, size }) => <BookOpen size={size} color={color} />,
          headerTitle: "Your Sessions",
        }}
      />
      <Tabs.Screen
        name="insights"
        options={{
          title: "Insights",
          tabBarIcon: ({ color, size }) => <BarChart2 size={size} color={color} />,
          headerTitle: "Surf Insights",
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, size }) => <Settings size={size} color={color} />,
          headerTitle: "Settings",
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
