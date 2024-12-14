import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

type SurfSession = {
  id: string; // Add unique ID to each session
  date: string;
  location: string;
  duration: string;
  waveHeight: string;
  notes: string;
};

const ViewSessionsScreen = () => {
  const [sessions, setSessions] = useState<SurfSession[]>([]);

  // Dynamically fetch sessions whenever screen gains focus
  useFocusEffect(
    React.useCallback(() => {
      const fetchSessions = async () => {
        try {
          const storedSessions = await AsyncStorage.getItem('surfSessions');
          const parsedSessions = storedSessions ? JSON.parse(storedSessions) : [];
          setSessions(parsedSessions); // Update state with fetched sessions
        } catch (error) {
          console.error('Failed to fetch sessions:', error);
        }
      };

      fetchSessions();
    }, [])
  );

  // Clear all sessions and reset state
  const clearSessions = async () => {
    try {
      await AsyncStorage.removeItem('surfSessions');
      setSessions([]); // Reset state after clearing
      alert('All sessions cleared!');
    } catch (error) {
      console.error('Error clearing sessions:', error);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={sessions}
        keyExtractor={(item) => item.id || `${item.date}-${item.location}`} // Use unique keys
        renderItem={({ item }) => (
          <View style={styles.sessionItem}>
            <Text style={styles.label}>Date:</Text>
            <Text style={styles.value}>{item.date}</Text>
            <Text style={styles.label}>Location:</Text>
            <Text style={styles.value}>{item.location}</Text>
            <Text style={styles.label}>Duration:</Text>
            <Text style={styles.value}>{item.duration} minutes</Text>
            <Text style={styles.label}>Wave Height:</Text>
            <Text style={styles.value}>{item.waveHeight} ft</Text>
            <Text style={styles.label}>Notes:</Text>
            <Text style={styles.value}>{item.notes}</Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyMessage}>
            No sessions logged yet. Start logging your surf sessions!
          </Text>
        }
      />

      <Button title="Clear Sessions" onPress={clearSessions} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  sessionItem: {
    marginBottom: 15,
    padding: 15,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
  emptyMessage: {
    fontSize: 16,
    textAlign: 'center',
    color: '#777',
    marginTop: 50,
  },
});

export default ViewSessionsScreen;
