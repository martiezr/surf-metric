// app/sessions/index.tsx
import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from "../../contexts/themeContext";
import { useSettings } from "../../contexts/settingsContext";
import { useSessionsContext } from '../../contexts/sessionsContext';
import { createStyles } from '../../../styles';
import { formatWaveHeight } from '../../../utilities/unitUtils';

const SessionsScreen = () => {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const { sessions, clearSessions, deleteSession } = useSessionsContext();
  const { settings } = useSettings();
  const router = useRouter();

  const handleDelete = (id: string) => {
    Alert.alert(
      "Delete Session",
      "Are you sure you want to delete this session?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Delete", 
          style: "destructive",
          onPress: async () => {
            try {
              await deleteSession(id);
              Alert.alert("Success", "Session deleted successfully!");
            } catch (error) {
              Alert.alert("Error", "Failed to delete session");
            }
          }
        }
      ]
    );
  };

  const renderSession = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push(`/sessions/${item.id}`)}
    >
      <View style={styles.sessionHeader}>
        <Text style={styles.sessionDate}>{item.date}</Text>
        <TouchableOpacity 
          onPress={() => handleDelete(item.id)}
          style={styles.deleteButton}
        >
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sessionLocation}>{item.location}</Text>
      
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
          <Text style={styles.text}>
            {formatWaveHeight(item.waveHeight, settings.unit)}
          </Text>
        </View>
      )}

      {item.sessionRating && (
        <View style={styles.sessionField}>
          <Text style={styles.label}>Session Rating:</Text>
          <Text style={styles.text}>{item.sessionRating}/10</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  const handleClearSessions = () => {
    Alert.alert(
      "Clear All Sessions",
      "Are you sure you want to delete all sessions? This cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Clear All",
          style: "destructive",
          onPress: async () => {
            try {
              await clearSessions();
              Alert.alert("Success", "All sessions cleared!");
            } catch (error) {
              Alert.alert("Error", "Failed to clear sessions");
            }
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={sessions}
        keyExtractor={(item) => `session-${item.id}`}
        renderItem={renderSession}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListEmptyComponent={
          <View style={styles.card}>
            <Text style={[styles.text, { textAlign: 'center' }]}>
              No sessions logged yet. Start logging your surf sessions!
            </Text>
          </View>
        }
      />

      <TouchableOpacity 
        style={[styles.button, { backgroundColor: theme.error || '#ff4444' }]} 
        onPress={handleClearSessions}
      >
        <Text style={styles.buttonText}>Clear All Sessions</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SessionsScreen;