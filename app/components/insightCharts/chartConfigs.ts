// app/components/insightCharts/chartConfigs.ts

import { ThemeType } from '../../../types/themeTypes';

export const buildWaveHeightChartConfig = (theme: ThemeType) => ({
  backgroundColor: 'transparent',
  backgroundGradientFrom: 'transparent',
  backgroundGradientTo: 'transparent',
  decimalPlaces: 1,
  color: (opacity = 1) => `rgba(${theme.primaryRGB || '0,122,255'}, ${opacity})`,
  labelColor: () => theme.text,
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: '4',
    strokeWidth: '2',
    stroke: theme.primary,
  },
  propsForLabels: {
    fill: theme.text,
    fontSize: 12,
  },
  propsForBackgroundLines: {
    stroke: theme.borderColor,
    strokeWidth: 1,
    opacity: 0.5,
  },
  // etc...
});
