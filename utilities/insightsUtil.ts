// src/utilities/insightsUtil.ts
import { SurfSession } from "../types/surfSession";
import { Unit, convertLength, formatLength } from './unitUtils';

export const calculateStats = (sessions: SurfSession[], displayUnit: Unit) => {
  const stats = [];

  // Skip empty session arrays
  if (!sessions.length) {
    return [
      { label: 'Total Sessions', value: '0' },
      { label: 'Avg Wave Height', value: formatLength(0, displayUnit) },
      { label: 'This Month', value: '0' },
      { label: 'Max Wave Height', value: formatLength(0, displayUnit) }
    ];
  }

  // Total Sessions
  stats.push({
    label: 'Total Sessions',
    value: sessions.length
  });

  // Average Waves Per Session
  const totalWaves = sessions.reduce((sum, session) => {
    const waves = parseInt(session.waveCount || '0');
    return sum + (isNaN(waves) ? 0 : waves);
  }, 0);

  stats.push({
    label: 'Avg Waves/Session',
    value: Math.round(totalWaves / sessions.length)
  });

  // Average Session Duration
  const totalDuration = sessions.reduce((sum, session) => {
    const duration = parseInt(session.duration || '0');
    return sum + (isNaN(duration) ? 0 : duration);
  }, 0);

  stats.push({
    label: 'Avg Session Length',
    value: `${Math.round(totalDuration / sessions.length)}min`
  });

  // Wave Catching Rate (waves per hour)
  const totalHours = totalDuration / 60;
  const wavesPerHour = totalHours > 0 
    ? Math.round(totalWaves / totalHours)
    : 0;

  stats.push({
    label: 'Waves/Hour',
    value: wavesPerHour
  });

  // Average Wave Height
  const avgHeight = sessions.reduce((sum, session) => {
    const height = parseFloat(session.waveHeight || '0');
    return sum + (isNaN(height) ? 0 : height);
  }, 0) / sessions.length;
  
  stats.push({
    label: 'Avg Wave Height',
    value: formatLength(convertLength(avgHeight, 'feet', displayUnit), displayUnit)
  });

  // Average Session Rating
  const avgRating = sessions.reduce((sum, session) => {
    const rating = parseInt(session.sessionRating || '0');
    return sum + (isNaN(rating) ? 0 : rating);
  }, 0) / sessions.length;

  stats.push({
    label: 'Avg Rating',
    value: avgRating.toFixed(1)
  });

  // Top Location
  const locationCounts = sessions.reduce((acc, session) => {
    const loc = session.location;
    acc[loc] = (acc[loc] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const topLocation = Object.entries(locationCounts)
    .sort(([,a], [,b]) => b - a)[0];

  stats.push({
    label: 'Favorite Spot',
    value: topLocation ? `${topLocation[0]} (${topLocation[1]})` : 'N/A'
  });

  // Max Wave Height
  const maxHeight = Math.max(...sessions.map(
    session => parseFloat(session.waveHeight || '0')
  ));

  stats.push({
    label: 'Max Wave Height',
    value: formatLength(convertLength(maxHeight, 'feet', displayUnit), displayUnit)
  });

  return stats;
};

// Calculate trending data for insights
export const calculateTrends = (sessions: SurfSession[]) => {
  if (!sessions.length) return null;

  // Sort sessions by date
  const sortedSessions = [...sessions].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  // Calculate 30-day moving averages
  const movingAverages = sortedSessions.map((session, index) => {
    const last30Days = sortedSessions
      .slice(Math.max(0, index - 29), index + 1);
    
    const avgRating = last30Days.reduce((sum, s) => {
      const rating = parseInt(s.sessionRating || '0');
      return sum + (isNaN(rating) ? 0 : rating);
    }, 0) / last30Days.length;

    const avgWaves = last30Days.reduce((sum, s) => {
      const waves = parseInt(s.waveCount || '0');
      return sum + (isNaN(waves) ? 0 : waves);
    }, 0) / last30Days.length;

    return {
      date: session.date,
      rating: avgRating,
      waves: avgWaves
    };
  });

  return movingAverages;
};

// Calculate best conditions
export const calculateBestConditions = (sessions: SurfSession[]) => {
  if (!sessions.length) return null;

  // Group sessions by location
  const locationStats = sessions.reduce((acc, session) => {
    const loc = session.location;
    if (!acc[loc]) {
      acc[loc] = {
        totalRating: 0,
        count: 0,
        avgWaveHeight: 0,
        sessions: []
      };
    }
    
    const rating = parseInt(session.sessionRating || '0');
    if (!isNaN(rating)) {
      acc[loc].totalRating += rating;
      acc[loc].count++;
    }

    const height = parseFloat(session.waveHeight || '0');
    if (!isNaN(height)) {
      acc[loc].avgWaveHeight += height;
    }

    acc[loc].sessions.push(session);
    return acc;
  }, {} as Record<string, {
    totalRating: number;
    count: number;
    avgWaveHeight: number;
    sessions: SurfSession[];
  }>);

  // Calculate averages and sort by rating
  return Object.entries(locationStats)
    .map(([location, stats]) => ({
      location,
      avgRating: stats.totalRating / stats.count,
      avgWaveHeight: stats.avgWaveHeight / stats.sessions.length,
      sessionCount: stats.count
    }))
    .sort((a, b) => b.avgRating - a.avgRating);
};