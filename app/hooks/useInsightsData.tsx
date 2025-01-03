// app/hooks/useInsightsData.ts
import { useMemo } from 'react';
import { useSessionsContext } from '../contexts/sessionsContext';
import { calculateStats, calculateTrends } from '../../utilities/insightsUtil';
import { Unit } from '../../utilities/unitUtils'; // If needed

/**
 * A custom hook to encapsulate logic for surf session insights.
 * It retrieves session data from context and uses utility functions
 * to compute stats and trends, returning the computed results.
 */
export function useInsightsData(displayUnit: Unit = 'feet') {
  // 1. Get session data from SessionsContext
  const { sessions } = useSessionsContext();

  // 2. Memoize calculations for performance
  const stats = useMemo(() => {
    // 'calculateStats' is a pure utility function
    return calculateStats(sessions, displayUnit);
  }, [sessions, displayUnit]);

  const trends = useMemo(() => {
    // 'calculateTrends' is a pure utility function
    return calculateTrends(sessions);
  }, [sessions]);

  // 3. Return whatever is needed by your screens/components
  return { sessions, stats, trends };
}

export default useInsightsData;