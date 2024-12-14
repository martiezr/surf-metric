import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LogSessionScreen = () => {
  // session essentials
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [duration, setDuration] = useState('');
  const [notes, setNotes] = useState('');
  // wave essentials
  const [waveHeight, setWaveHeight] = useState('');


  const handleSaveSession = async () => {
    if (!date || !location) {
      Alert.alert('Error', 'Date and Location are required!');
      return;
    }

    const newSession = { 
      date, 
      location,
      duration, 
      waveHeight, 
      notes };
    try {
      const storedSessions = await AsyncStorage.getItem('surfSessions');
      const sessions = storedSessions ? JSON.parse(storedSessions) : [];
      sessions.push(newSession);

      await AsyncStorage.setItem('surfSessions', JSON.stringify(sessions));

      Alert.alert('Success', 'Session saved successfully!');
      setDate('');
      setLocation('');
      setDuration('');
      setWaveHeight('');
      setNotes('');
    } catch (error) {
      Alert.alert('Error', 'Failed to save the session.');
      console.error(error);
    }
  };

  return (
    <ScrollView style={styles.container}>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Date</Text>
        <TextInput
          style={styles.input}
          placeholder="YYYY-MM-DD"
          value={date}
          onChangeText={setDate}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Location</Text>
        <TextInput
          style={styles.input}
          placeholder="Beach Name"
          value={location}
          onChangeText={setLocation}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Duration (minutes)</Text>
        <TextInput
          style={styles.input}
          placeholder="Sesssion Duration"
          value={duration}
          onChangeText={setDuration}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Wave Height (ft)</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., 3.5"
          value={waveHeight}
          onChangeText={setWaveHeight}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Notes</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Describe your experience..."
          value={notes}
          onChangeText={setNotes}
          multiline
        />
      </View>

      <Button title="Save Session" onPress={handleSaveSession} />
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#0077b6',
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  input: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
});

export default LogSessionScreen;
