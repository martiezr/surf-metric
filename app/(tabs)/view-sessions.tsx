import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { useTheme } from '../../shared/theme-context';
import { createStyles } from '../../shared/styles';

type SurfSession = {
  id: string;
  date: string;
  location: string;
  duration: string;
  waveHeight: string;
  notes: string;
};

const ViewSessionsScreen = () => {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const [sessions, setSessions] = useState<SurfSession[]>([]);

  useFocusEffect(
    React.useCallback(() => {
      const fetchSessions = async () => {
        try {
          const storedSessions = await AsyncStorage.getItem('surfSessions');
          const parsedSessions = storedSessions ? JSON.parse(storedSessions) : [];
          setSessions(parsedSessions);
        } catch (error) {
          console.error('Failed to fetch sessions:', error);
        }
      };

      fetchSessions();
    }, [])
  );

  const clearSessions = async () => {
    try {
      await AsyncStorage.removeItem('surfSessions');
      setSessions([]);
      alert('All sessions cleared!');
    } catch (error) {
      console.error('Error clearing sessions:', error);
    }
  };

  const renderSession = ({ item }: { item: SurfSession }) => (
    <View style={styles.card}>
      <View style={styles.sessionHeader}>
        <Text style={styles.sessionDate}>{item.date}</Text>
        <Text style={styles.sessionLocation}>{item.location}</Text>
      </View>

      <View style={styles.sessionField}>
        <Text style={styles.label}>Duration:</Text>
        <Text style={styles.text}>{item.duration} minutes</Text>
      </View>

      <View style={styles.sessionField}>
        <Text style={styles.label}>Wave Height:</Text>
        <Text style={styles.text}>{item.waveHeight} ft</Text>
      </View>

      {item.notes && (
        <View style={styles.sessionField}>
          <Text style={styles.label}>Notes:</Text>
          <Text style={styles.text}>{item.notes}</Text>
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={sessions}
        keyExtractor={(item) => item.id || `${item.date}-${item.location}`}
        renderItem={renderSession}
        ListEmptyComponent={
          <View style={styles.card}>
            <Text style={[styles.text, { textAlign: 'center' }]}>
              No sessions logged yet. Start logging your surf sessions!
            </Text>
          </View>
        }
      />

      <TouchableOpacity 
        style={styles.button} 
        onPress={clearSessions}
      >
        <Text style={styles.buttonText}>Clear Sessions</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ViewSessionsScreen;
