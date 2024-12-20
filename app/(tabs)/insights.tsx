import React from 'react';
import { ScrollView } from 'react-native';
import { useSessionsContext } from '../contexts/sessionsContext';
import SessionStats from '../components/sessionStats';
import { useTheme } from '../contexts/themeContext';
import { createStyles } from '../../styles';

const InsightsScreen = () => {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const { sessions } = useSessionsContext();

  return (
    <ScrollView style={styles.container}>
      <SessionStats sessions={sessions} />
    </ScrollView>
  );
};

export default InsightsScreen;