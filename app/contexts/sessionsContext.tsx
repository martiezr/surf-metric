// src/contexts/sessionsContext.tsx
import { SurfSession } from '../types/surfSession';
import React, { createContext, useContext, useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


type SessionsContextType = {
  sessions: SurfSession[];
  loadSessions: () => Promise<void>;
  addSession: (session: SurfSession) => Promise<void>;
  clearSessions: () => Promise<void>;
};

const SessionsContext = createContext<SessionsContextType | undefined>(undefined);

export const SessionsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sessions, setSessions] = useState<SurfSession[]>([]);

  const loadSessions = useCallback(async () => {
    try {
      const storedSessions = await AsyncStorage.getItem('surfSessions');
      const parsedSessions = storedSessions ? JSON.parse(storedSessions) : [];
      setSessions(parsedSessions);
    } catch (error) {
      console.error('Failed to load sessions:', error);
    }
  }, []);

  const addSession = useCallback(async (newSession: SurfSession) => {
    try {
      const updatedSessions = [...sessions, newSession];
      console.log("🔵 Before adding session - Current count:", sessions.length);
      console.log("🔵 Adding new session:", newSession);
      await AsyncStorage.setItem('surfSessions', JSON.stringify(updatedSessions));
      setSessions(updatedSessions);
      console.log("🔵 After adding session - New count:", updatedSessions.length);
    } catch (error) {
      console.error('Failed to add session:', error);
    }
  }, [sessions]);

  const clearSessions = useCallback(async () => {
    try {
      await AsyncStorage.removeItem('surfSessions');
      setSessions([]);
    } catch (error) {
      console.error('Failed to clear sessions:', error);
    }
  }, []);

  React.useEffect(() => {
    loadSessions();
  }, []);

  return (
    <SessionsContext.Provider value={{ sessions, loadSessions, addSession, clearSessions }}>
      {children}
    </SessionsContext.Provider>
  );
};

export const useSessionsContext = () => {
  const context = useContext(SessionsContext);
  if (!context) {
    throw new Error('useSessionsContext must be used within a SessionsProvider');
  }
  return context;
};

export default SessionsProvider;
