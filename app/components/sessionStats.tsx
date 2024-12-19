import React from 'react';
import { 
    Text,
    View
} from 'react-native';
import { useTheme } from '../contexts/themeContext';
import { createStyles } from '../../styles';


interface Stat {
    label: string;
    value: string | number;
}

interface SessionStatsProps { 
    stats: Stat[];
}


const SessionStats: React.FC<SessionStatsProps> = ({ stats }) => {
  const { theme } = useTheme(); // Access the current theme
  const styles = React.useMemo(() => createStyles(theme), [theme]); // Generate styles

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