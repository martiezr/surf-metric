import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "../../shared/theme-context";
import { createStyles } from "../../shared/styles";

const LogSessionScreen = () => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [duration, setDuration] = useState("");
  const [notes, setNotes] = useState("");
  const [waveHeight, setWaveHeight] = useState("");

  const handleSaveSession = async () => {
    if (!date || !location) {
      Alert.alert("Error", "Date and Location are required!");
      return;
    }

    const newSession = { date, location, duration, waveHeight, notes };

    try {
      const storedSessions = await AsyncStorage.getItem("surfSessions");
      const sessions = storedSessions ? JSON.parse(storedSessions) : [];
      sessions.push(newSession);
      await AsyncStorage.setItem("surfSessions", JSON.stringify(sessions));

      Alert.alert("Success", "Session saved successfully!");
      setDate("");
      setLocation("");
      setDuration("");
      setWaveHeight("");
      setNotes("");
    } catch (error) {
      Alert.alert("Error", "Failed to save the session.");
      console.error(error);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 20 }}>
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
          placeholder="Session Duration"
          value={duration}
          onChangeText={setDuration}
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
        <Text style={styles.label}>Notes</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Describe your experience..."
          value={notes}
          onChangeText={setNotes}
          multiline
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
