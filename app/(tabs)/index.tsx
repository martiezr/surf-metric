import React from 'react';
import { Text, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from "../contexts/themeContext";
import { createStyles } from '../../styles';

const HomeScreen = () => {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const router = useRouter();

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 20 }}>

      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push('/log-session')}
      >
        <Text style={styles.cardTitle}>Log Your Session</Text>
        <Text style={styles.cardDescription}>
          Record details about your latest surf session.
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push('/view-sessions')}
      >
        <Text style={styles.cardTitle}>View Sessions</Text>
        <Text style={styles.cardDescription}>
          Look back at your past surf sessions and experiences.
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push('../insights/insights')}
      >
        <Text style={styles.cardTitle}>Surf Insights</Text>
        <Text style={styles.cardDescription}>
          Analyze your surfing trends and get valuable insights.
        </Text>
      </TouchableOpacity>
      
    </ScrollView>
  );
};

export default HomeScreen;