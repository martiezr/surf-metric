import { SurfSession } from '../types/surfSession';

type StatCalculation = {
  label: string;
  calculate: (sessions: SurfSession[]) => number | string;
};

export const statCalculations: StatCalculation[] = [
  {
    label: 'Total Sessions',
    calculate: (sessions) => sessions.length,
  },
  {
    label: 'Avg Wave Height',
    calculate: (sessions) => {
      if (sessions.length === 0) return 0; // Handle no sessions
      const totalHeight = sessions.reduce((sum, session) => {
        // Ensure waveHeight is treated as a number
        const waveHeight = typeof session.waveHeight === 'number' ? session.waveHeight : parseFloat(session.waveHeight || '0');
        return sum + waveHeight;
      }, 0);
      return (totalHeight / sessions.length).toFixed(1); // Return average
    },
  },
  {
    label: 'This Month',
    calculate: (sessions) => {
      const thisMonth = new Date().getMonth();
      return sessions.filter((session) => {
        const sessionDate = new Date(session.date);
        return sessionDate.getMonth() === thisMonth && !isNaN(sessionDate.getTime());
      }).length;
    },
  },
];

export const calculateAllStats = (sessions: SurfSession[] = []) =>
  statCalculations.map((stat) => ({
    label: stat.label,
    value: stat.calculate(sessions || []),
  }));

