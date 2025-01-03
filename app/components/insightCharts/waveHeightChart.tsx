// app/components/insightCharts/WaveHeightChart.tsx
import React, { useMemo } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { parse, format } from 'date-fns';
import GenericChart from './genericCharts';
import { buildWaveHeightChartConfig } from './chartConfigs';
import { useTheme } from '../../contexts/themeContext';
import { SurfSession } from '../../../types/surfSession';

interface WaveHeightChartProps {
  sessions: SurfSession[];
}

const WaveHeightChart: React.FC<WaveHeightChartProps> = ({ sessions }) => {
  const { theme } = useTheme();

  // 1) Prepare data
  const waveHeightData = useMemo(() => {
    if (!sessions.length) {
      return {
        labels: ['No Data'],
        datasets: [{ data: [0] }],
      };
    }

    const sortedSessions = [...sessions].sort((a, b) => {
      const dateA = parse(a.date, 'MM-dd-yyyy', new Date());
      const dateB = parse(b.date, 'MM-dd-yyyy', new Date());
      return dateA.getTime() - dateB.getTime();
    });

    const formattedData = sortedSessions.map((session) => ({
      label: format(parse(session.date, 'MM-dd-yyyy', new Date()), 'M/d'),
      value: parseFloat(session.waveHeight || '0'),
    }));

    return {
      labels: formattedData.map((d) => d.label),
      datasets: [
        {
          data: formattedData.map((d) => (isNaN(d.value) ? 0 : d.value)),
        },
      ],
    };
  }, [sessions]);

  // 2) Chart Dimensions
  const screenWidth = Dimensions.get('window').width;
  const chartHeight = 220;
  const yAxisWidth = 50;
  const minChartWidth = Math.max(screenWidth - 80 - yAxisWidth, (sessions.length || 1) * 50);

  // 3) Build chartConfig
  const chartConfig = buildWaveHeightChartConfig(theme);

  // 4) Calculate maxValue for custom Y-axis
  const maxValue = useMemo(() => {
    if (!sessions.length) return 10;
    return Math.ceil(Math.max(...waveHeightData.datasets[0].data));
  }, [sessions, waveHeightData]);

  // 5) Render
  if (!sessions.length) {
    return (
      <View style={{ margin: 16, borderRadius: 16, padding: 16 }}>
        <Text style={{ textAlign: 'center' }}>Wave Height Trend</Text>
        <Text>No session data available</Text>
      </View>
    );
  }

  return (
    <GenericChart
      title="Wave Height Trend"
      data={waveHeightData}
      chartWidth={minChartWidth}
      chartHeight={chartHeight}
      chartConfig={{
        ...chartConfig,
        // We can override some items here if needed
        formatYLabel: () => '', // hide default Y-axis labels
      }}
      yAxisLabels={
        <YAxisLabels maxValue={maxValue} height={chartHeight} theme={theme} />
      }
    />
  );
};

// We can keep your custom YAxisLabels the same as before
const YAxisLabels: React.FC<{ maxValue: number; height: number; theme: any }> = ({
  maxValue,
  height,
  theme,
}) => {
  const segments = 4;
  const labels = Array.from({ length: segments + 1 }, (_, i) => {
    const value = (maxValue * i) / segments;
    return value.toFixed(1);
  }).reverse();

  return (
    <View style={{ width: 50, justifyContent: 'space-between', alignItems: 'flex-end', height, paddingRight: 8, paddingVertical: 10 }}>
      {labels.map((label, index) => (
        <Text key={index} style={{ fontSize: 12, color: theme.text }}>
          {label}
        </Text>
      ))}
    </View>
  );
};

export default WaveHeightChart;
