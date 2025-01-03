// app/components/insightCharts/GenericChart.tsx
import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

interface GenericChartProps {
  title: string;
  data: {
    labels: string[];
    datasets: Array<{
      data: number[];
      color?: (opacity?: number) => string; // optional color callback
    }>;
  };
  chartWidth: number;
  chartHeight: number;
  chartConfig: any; // react-native-chart-kit config
  yAxisLabels?: React.ReactNode; // optional custom Y-axis (if needed)
  // Additional props if required
}

const GenericChart: React.FC<GenericChartProps> = ({
  title,
  data,
  chartWidth,
  chartHeight,
  chartConfig,
  yAxisLabels,
}) => {
  return (
    <View style={{ margin: 16, borderRadius: 16, overflow: 'hidden' }}>
      <Text style={{ textAlign: 'center', marginBottom: 16 }}>{title}</Text>
      <View style={{ flexDirection: 'row' }}>
        {/* Optionally render custom Y-axis labels */}
        {yAxisLabels}

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator
          contentContainerStyle={{ paddingRight: 20 }}
        >
          <LineChart
            data={data}
            width={chartWidth}
            height={chartHeight}
            chartConfig={chartConfig}
            fromZero
            bezier
            style={{ borderRadius: 16 }}
            withInnerLines
            withOuterLines
            withVerticalLabels
            withHorizontalLabels={false}
            segments={4}
            // ...any other react-native-chart-kit props
          />
        </ScrollView>
      </View>
    </View>
  );
};

export default GenericChart;
