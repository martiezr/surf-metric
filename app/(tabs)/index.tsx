import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

const HomeScreen = () => {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>

      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push('/log-session')}
      >
        <Text style={styles.cardTitle}>Log Your Session</Text>
        <Text style={styles.cardDescription}>
          Record details about your latest surf session.
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push('/view-sessions')}
      >
        <Text style={styles.cardTitle}>View Sessions</Text>
        <Text style={styles.cardDescription}>
          Look back at your past surf sessions and experiences.
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push('/insights')}
      >
        <Text style={styles.cardTitle}>Surf Insights</Text>
        <Text style={styles.cardDescription}>
          Analyze your surfing trends and get valuable insights.
        </Text>
      </TouchableOpacity>
      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    marginBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0077b6',
  },
  card: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: '#555',
  },
});

export default HomeScreen;
