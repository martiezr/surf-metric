import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from "react-native";
import { useSessionsContext } from '../contexts/sessionsContext';
import { useTheme } from "../contexts/themeContext";
import { useSettings } from "../contexts/settingsContext";
import { createStyles } from "../../styles";
import DatePicker from "../components/datePicker";
import { format } from 'date-fns';
import { storeLength } from '../../utilities/unitUtils';

const LogSessionScreen = () => {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const { addSession } = useSessionsContext();
  const { settings } = useSettings();

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [location, setLocation] = useState("");  // Initialize empty
  const [duration, setDuration] = useState("");
  const [waveCount, setWaveCount] = useState("");
  const [waveHeight, setWaveHeight] = useState("");
  const [sessionRating, setSessionRating] = useState("");

  // Set initial location and update when settings change
  useEffect(() => {
    setLocation(settings.defaultLocation || "");
  }, [settings]);  // Watch the entire settings object

  const handleSaveSession = async () => {
    if (!selectedDate || !location) {
      Alert.alert("Error", "Date and Location are required!");
      return;
    }

    const newSession = {
      id: Date.now().toString(),
      date: format(selectedDate, 'MM-dd-yyyy'),
      location,
      duration,
      waveCount,
      waveHeight: storeLength(waveHeight, settings.unit),
      sessionRating
    };

    try {
      await addSession(newSession);
      Alert.alert("Success", "Session saved successfully!");
      setSelectedDate(null);
      setLocation(settings.defaultLocation || "");
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
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 20 }}>
      <DatePicker
        label="Date"
        value={selectedDate}
        onChange={setSelectedDate}
      />

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
        <Text style={styles.label}>{`Wave Height (${settings.unit === 'feet' ? 'ft' : 'm'})`}</Text>
        <TextInput
          style={styles.input}
          placeholder={`e.g., 3.5 ${settings.unit === 'feet' ? 'ft' : 'm'}`}
          value={waveHeight}
          onChangeText={setWaveHeight}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Session Rating (1-10)</Text>
        <TextInput
          style={styles.input}
          placeholder="Rate your session from 1 to 10"
          value={sessionRating}
          onChangeText={setSessionRating}
          keyboardType="numeric"
          maxLength={2}
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