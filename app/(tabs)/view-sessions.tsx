import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useTheme } from "../contexts/themeContext";
import { useSessionsContext } from '../contexts/sessionsContext';  // Add this
import { createStyles } from '../../styles';
import { SurfSession } from '../types/surfSession';  // Import the type instead of defining it

const ViewSessionsScreen = () => {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const { sessions, clearSessions } = useSessionsContext();  // Use context instead of local state

  // Remove the useState since we're getting sessions from context

  useFocusEffect(
    React.useCallback(() => {
      console.log("📱 View Sessions Screen - Current sessions:", sessions.length);
    }, [sessions])
  );

  const renderSession = ({ item }: { item: SurfSession }) => (
    <View style={styles.card}>
      <View style={styles.sessionHeader}>
        <Text style={styles.sessionDate}>{item.date}</Text>
        <Text style={styles.sessionLocation}>{item.location}</Text>
      </View>
  
      {item.duration && (
        <View style={styles.sessionField}>
          <Text style={styles.label}>Duration:</Text>
          <Text style={styles.text}>{item.duration} minutes</Text>
        </View>
      )}
  
      {item.waveCount && (
        <View style={styles.sessionField}>
          <Text style={styles.label}>Waves Caught:</Text>
          <Text style={styles.text}>{item.waveCount}</Text>
        </View>
      )}
  
      {item.waveHeight && (
        <View style={styles.sessionField}>
          <Text style={styles.label}>Wave Height:</Text>
          <Text style={styles.text}>{item.waveHeight} ft</Text>
        </View>
      )}
  
      {item.sessionRating && (
        <View style={styles.sessionField}>
          <Text style={styles.label}>Session Rating:</Text>
          <Text style={styles.text}>{item.sessionRating}</Text>
        </View>
      )}
    </View>
  );

  const handleClearSessions = async () => {
    try {
      await clearSessions();
      alert('All sessions cleared!');
    } catch (error) {
      console.error('Error clearing sessions:', error);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={sessions}
        keyExtractor={(item) => `session-${item.id || `${item.date}-${item.location}`}`}
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
        onPress={handleClearSessions}
      >
        <Text style={styles.buttonText}>Clear Sessions</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ViewSessionsScreen;