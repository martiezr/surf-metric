// app/(tabs)/InsightsScreen.tsx
import React from 'react';
import { ScrollView } from 'react-native';
import { useTheme } from '../contexts/themeContext';
import { createStyles } from '../../styles';
import { useInsightsData } from '../hooks/useInsightsData';

// Child components
import SessionStats from '../components/sessionStats';
import InsightCharts from '../components/insightCharts/insightCharts';

const InsightsScreen = () => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  // Custom hook: returns sessions, stats, trends, etc.
  const { sessions, stats, trends } = useInsightsData('feet');

  return (
    <ScrollView style={styles.container}>
      <SessionStats stats={stats} sessions={sessions} />
      <InsightCharts sessions={sessions} />
    </ScrollView>
  );
};

export default InsightsScreen;
