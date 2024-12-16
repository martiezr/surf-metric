import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../../shared/theme-context';
import { createStyles } from '../../shared/styles';

type SurfSession = {
  date: string;
  location: string;
  waveHeight: string;
  notes: string;
};

const InsightsScreen = () => {
  const { theme } = useTheme(); // Access theme and toggle
  const styles = createStyles(theme); // Generate styles dynamically based on theme
  const [insights, setInsights] = useState({
    totalSessions: 0,
    averageWaveHeight: 0,
    favoriteLocation: '',
    maxWaveHeight: 0,
    sessionsThisMonth: 0
  });

  useEffect(() => {
    loadInsights();
  }, []);

  const loadInsights = async () => {
    try {
      const storedSessions = await AsyncStorage.getItem('surfSessions');
      const sessions: SurfSession[] = storedSessions ? JSON.parse(storedSessions) : [];
      
      if (sessions.length === 0) {
        return;
      }

      // Calculate basic metrics
      const waveHeights = sessions.map(s => parseFloat(s.waveHeight)).filter(h => !isNaN(h));
      const locations = sessions.map(s => s.location);
      const currentMonth = new Date().getMonth();
      
      // Find most frequent location
      const locationCounts: Record<string, number> = {};
      locations.forEach(loc => {
        locationCounts[loc] = (locationCounts[loc] || 0) + 1;
      });
      
      const favoriteLocation = Object.entries(locationCounts)
        .sort(([,a], [,b]) => b - a)[0][0] || 'N/A';

      // Calculate sessions this month
      const sessionsThisMonth = sessions.filter(session => {
        const sessionMonth = new Date(session.date).getMonth();
        return sessionMonth === currentMonth;
      }).length;

      setInsights({
        totalSessions: sessions.length,
        averageWaveHeight: waveHeights.length ? 
          Number((waveHeights.reduce((a, b) => a + b, 0) / waveHeights.length).toFixed(1)) : 0,
        favoriteLocation,
        maxWaveHeight: waveHeights.length ? Math.max(...waveHeights) : 0,
        sessionsThisMonth
      });
    } catch (error) {
      console.error('Failed to load insights:', error);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 20 }}>

      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{insights.totalSessions}</Text>
          <Text style={styles.statLabel}>Total Sessions</Text>
        </View>
        
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{insights.averageWaveHeight}ft</Text>
          <Text style={styles.statLabel}>Avg Wave Height</Text>
        </View>

        <View style={styles.statBox}>
          <Text style={styles.statValue}>{insights.sessionsThisMonth}</Text>
          <Text style={styles.statLabel}>This Month</Text>
        </View>
      </View>

      <View style={styles.insightCard}>
        <Text style={styles.cardTitle}>Location & Wave Stats</Text>
        <Text style={styles.insightText}>Favorite Spot: {insights.favoriteLocation}</Text>
        <Text style={styles.insightText}>Biggest Waves: {insights.maxWaveHeight}ft</Text>
      </View>
    </ScrollView>
  );
};

export default InsightsScreen;
