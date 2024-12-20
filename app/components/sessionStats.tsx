import React from 'react';
import { Text, View } from 'react-native';
import { useTheme } from '../contexts/themeContext';
import { useSettings } from '../contexts/settingsContext';
import { createStyles } from '../../styles';
import { calculateStats } from '../../utilities/insightsUtil';
import { SurfSession } from '../types/surfSession';

interface SessionStatsProps {
  sessions: SurfSession[];
}

const SessionStats: React.FC<SessionStatsProps> = ({ sessions }) => {
  const { theme } = useTheme();
  const { settings } = useSettings();
  const styles = React.useMemo(() => createStyles(theme), [theme]);

  // Calculate stats inside the component
  const stats = React.useMemo(() => 
    calculateStats(sessions, settings.unit),
    [sessions, settings.unit]
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Session Stats</Text>
      <View style={styles.statsContainer}>
        {stats.map((stat, index) => (
          <View style={styles.statItem} key={index}>
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default SessionStats;