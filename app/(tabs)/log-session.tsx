import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from "react-native";
import { useSessionsContext } from '../contexts/sessionsContext';
import { useTheme } from "../contexts/themeContext";
import { createStyles } from "../../styles";

const LogSessionScreen = () => {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const { addSession } = useSessionsContext();

  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [duration, setDuration] = useState("");
  const [waveCount, setWaveCount] = useState("");
  const [waveHeight, setWaveHeight] = useState("");
  const [sessionRating, setSessionRating] = useState("");

  const handleSaveSession = async () => {
    if (!date || !location) {
      Alert.alert("Error", "Date and Location are required!");
      return;
    }

    const newSession = {
      id: Date.now().toString(),
      date,
      location,
      duration,
      waveCount,
      waveHeight,
      sessionRating
    };

    try {
      await addSession(newSession);
      Alert.alert("Success", "Session saved successfully!");
      setDate("");
      setLocation("");
      setDuration("");
      setWaveCount("");
      setWaveHeight("");
      setSessionRating("");
    } catch (error) {
      Alert.alert("Error", "Failed to save the session.");
      console.error(error);
    }
  };

  return (
    <ScrollView 
    style={styles.container} contentContainerStyle={{ paddingBottom: 20 }}>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Date</Text>
        <TextInput
          style={styles.input}
          placeholder="MM-DD-YYYY"
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
          placeholder="Session Duration"
          value={duration}
          onChangeText={setDuration}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Waves Caught</Text>
        <TextInput
          style={styles.input}
          placeholder="Wave Count"
          value={waveCount}
          onChangeText={setWaveCount}
          keyboardType="numeric"
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
        <Text style={styles.label}>Session Rating (1-10)</Text>
        <TextInput
          style={styles.input}
          placeholder="Rate your session from 1 to 10."
          value={sessionRating}
          onChangeText={setSessionRating}
          keyboardType="numeric"
        />
      </View>

      <TouchableOpacity 
        style={styles.button} 
        onPress={handleSaveSession}
      >
        <Text style={styles.buttonText}>Log Session</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default LogSessionScreen;