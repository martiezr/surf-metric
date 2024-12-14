import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type SurfSession = {
  date: string;
  location: string;
  waveHeight: string;
  notes: string;
};

const InsightsScreen = () => {
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
        .sort(([,a], [,b]) => b - a)[0][0];

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
        maxWaveHeight: Math.max(...waveHeights),
        sessionsThisMonth
      });
    } catch (error) {
      console.error('Failed to load insights:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#0077b6',
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statBox: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginHorizontal: 4,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0077b6',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  insightCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  insightText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  }
});

export default InsightsScreen;