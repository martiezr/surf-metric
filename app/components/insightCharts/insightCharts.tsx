// app/components/insightCharts/InsightCharts.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SurfSession } from '../../../types/surfSession';
import WaveHeightChart from './waveHeightChart';
import { useTheme } from '../../contexts/themeContext';
import { createStyles } from '../../../styles';

interface InsightChartsProps {
  sessions: SurfSession[];
}

const InsightCharts: React.FC<InsightChartsProps> = ({ sessions }) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={localStyles.container}>
      {/* We now have a well-encapsulated WaveHeightChart */}
      <WaveHeightChart sessions={sessions} />

      {/* In the future, just import a new chart and add it below */}
      {/* <SessionDurationChart sessions={sessions} /> */}
      {/* <WaveFrequencyChart sessions={sessions} /> */}
    </View>
  );
};

const localStyles = StyleSheet.create({
  container: {
    paddingBottom: 20,
  },
});

export default InsightCharts;
