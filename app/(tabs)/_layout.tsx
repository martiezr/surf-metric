// app/_layout.tsx
import { Tabs } from "expo-router";
import { Home, PlusCircle, BookOpen, BarChart2 } from "lucide-react-native";

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopColor: '#e2e8f0',
          height: 60,
        },
        tabBarActiveTintColor: '#0077b6',
        tabBarInactiveTintColor: '#64748b',
       headerStyle: {
          backgroundColor: '#0077b6',
        },
        headerTitleAlign: 'center',
        headerTintColor: '#fff',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
          headerTitle: "Surf Metric"
        }}
      />
      <Tabs.Screen
        name="log-session"
        options={{
          title: "Log",
          tabBarIcon: ({ color, size }) => <PlusCircle size={size} color={color} />,
          headerTitle: "Log Session"
        }}
      />
      <Tabs.Screen
        name="view-sessions"
        options={{
          title: "Sessions",
          tabBarIcon: ({ color, size }) => <BookOpen size={size} color={color} />,
          headerTitle: "Your Sessions"
        }}
      />
      <Tabs.Screen
        name="insights"
        options={{
          title: "Insights",
          tabBarIcon: ({ color, size }) => <BarChart2 size={size} color={color} />,
          headerTitle: "Surf Insights"
        }}
      />
    </Tabs>
  );
}

export default TabLayout;