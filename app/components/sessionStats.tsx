import React from 'react';
import { Text, View, ScrollView } from 'react-native';
import { useTheme } from '../contexts/themeContext';
import { useSettings } from '../contexts/settingsContext';
import { createStyles } from '../../styles';
import { calculateStats, calculateTrends, calculateBestConditions } from '../../utilities/insightsUtil';
import { SurfSession } from '../../types/surfSession';

interface SessionStatsProps {
  sessions: SurfSession[];
}

const SessionStats: React.FC<SessionStatsProps> = ({ sessions }) => {
  const { theme } = useTheme();
  const { settings } = useSettings();
  const styles = React.useMemo(() => createStyles(theme), [theme]);

  // Calculate all stats
  const stats = React.useMemo(() => 
    calculateStats(sessions, settings.unit),
    [sessions, settings.unit]
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <Text style={styles.title}>Session Stats</Text>
      
      {/* Core Stats Grid */}
      <View style={styles.statsGrid}>
        {stats.slice(0, 8).map((stat, index) => (
          <View key={index} style={styles.statItem}>
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>

      {/* Location Insights */}
      {sessions.length > 0 && (
        <>
          <Text style={[styles.title, { fontSize: 20, marginTop: 20 }]}>
            Location Insights
          </Text>
          <View style={styles.insightCard}>
            <Text style={styles.statLabel}>
              Most surfed at: {stats.find(s => s.label === 'Favorite Spot')?.value}
            </Text>
          </View>
        </>
      )}

      {/* Performance Insights */}
      {sessions.length > 0 && (
        <>
          <Text style={[styles.title, { fontSize: 20, marginTop: 20 }]}>
            Performance Insights
          </Text>
          <View style={styles.insightCard}>
            <Text style={styles.statLabel}>
              Average session duration: {stats.find(s => s.label === 'Avg Session Length')?.value}
            </Text>
            <Text style={styles.statLabel}>
              Typical waves per hour: {stats.find(s => s.label === 'Waves/Hour')?.value}
            </Text>
            <Text style={styles.statLabel}>
              Average session rating: {stats.find(s => s.label === 'Avg Rating')?.value}/10
            </Text>
          </View>
        </>
      )}
    </ScrollView>
  );
};

export default SessionStats;