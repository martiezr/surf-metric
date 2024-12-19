import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native';
import { useSessionsContext } from '../contexts/sessionsContext';
import { calculateAllStats } from '../utilities/insightsUtil';
import SessionStats from '../components/sessionStats';
import { useTheme } from '../contexts/themeContext';
import { createStyles } from '../../styles';

const InsightsScreen = () => {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const { sessions } = useSessionsContext();
  const [stats, setStats] = useState([]);

  useEffect(() => {
    if (sessions.length > 0) {
      setStats(calculateAllStats(sessions));
    }
  }, [sessions]);

  return (
    <ScrollView style={styles.container}>
      <SessionStats stats={stats} />
    </ScrollView>
  );
};

export default InsightsScreen;
