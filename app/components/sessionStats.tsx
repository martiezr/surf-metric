// app/components/sessionStats.tsx
import React from 'react';
import { Text, View, ScrollView } from 'react-native';
import { useTheme } from '../contexts/themeContext';
import { createStyles } from '../../styles';
import { SurfSession } from '../../types/surfSession';

interface StatItem {
  label: string;
  value: string | number;
}

interface SessionStatsProps {
  stats: StatItem[];        // Computed stats passed from the parent
  sessions: SurfSession[];  // Raw sessions in case we need them
}

const SessionStats: React.FC<SessionStatsProps> = ({ stats, sessions }) => {
  const { theme } = useTheme();
  const styles = React.useMemo(() => createStyles(theme), [theme]);

  // We no longer calculate stats here. We just display what we get.
  // If you still need local manipulations, you can do them below.

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
