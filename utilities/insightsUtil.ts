// src/utilities/insightsUtil.ts
import { SurfSession } from "../app/types/surfSession";
import { Unit, convertLength, formatLength } from './unitUtils';

export const calculateStats = (sessions: SurfSession[], displayUnit: Unit) => {
  const stats = [];

  // Total Sessions
  stats.push({
    label: 'Total Sessions',
    value: sessions.length
  });

  // Average Wave Height
  const avgHeight = sessions.length > 0
    ? sessions.reduce((sum, session) => {
        const height = parseFloat(session.waveHeight || '0');
        return sum + height;
      }, 0) / sessions.length
    : 0;
  
  stats.push({
    label: 'Avg Wave Height',
    value: formatLength(convertLength(avgHeight, 'feet', displayUnit), displayUnit)
  });

  // Sessions This Month
  const thisMonth = new Date().getMonth();
  const sessionsThisMonth = sessions.filter(session => {
    const sessionDate = new Date(session.date);
    return sessionDate.getMonth() === thisMonth && !isNaN(sessionDate.getTime());
  }).length;

  stats.push({
    label: 'This Month',
    value: sessionsThisMonth
  });

  // Max Wave Height
  const maxHeight = sessions.length > 0
    ? Math.max(...sessions.map(session => parseFloat(session.waveHeight || '0')))
    : 0;

  stats.push({
    label: 'Max Wave Height',
    value: formatLength(convertLength(maxHeight, 'feet', displayUnit), displayUnit)
  });

  return stats;
};

