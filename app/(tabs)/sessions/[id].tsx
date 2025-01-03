// src/app/sessions/[id].tsx
import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from "react-native";
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSessionsContext } from '../../contexts/sessionsContext';
import { useTheme } from "../../contexts/themeContext";
import { useSettings } from "../../contexts/settingsContext";
import { createStyles } from "../../../styles";
import DatePicker from "../../components/datePicker";
import { format, parse } from 'date-fns';
import { storeLength } from '../../../utilities/unitUtils';

export default function EditSessionScreen() {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const { editSession, sessions } = useSessionsContext();
  const { settings } = useSettings();
  const router = useRouter();
  const { id } = useLocalSearchParams();

  // Find the session to edit
  const session = sessions.find(s => s.id === id);

  const [editForm, setEditForm] = useState({
    date: null as Date | null,
    location: '',
    duration: '',
    waveCount: '',
    waveHeight: '',
    sessionRating: ''
  });

  useEffect(() => {
    if (session) {
      setEditForm({
        date: parse(session.date, 'MM-dd-yyyy', new Date()),
        location: session.location,
        duration: session.duration,
        waveCount: session.waveCount,
        waveHeight: session.waveHeight,
        sessionRating: session.sessionRating
      });
    }
  }, [session]);

  const handleSave = async () => {
    if (!editForm.date || !editForm.location) {
      Alert.alert("Error", "Date and Location are required!");
      return;
    }

    try {
      await editSession(id as string, {
        date: format(editForm.date, 'MM-dd-yyyy'),
        location: editForm.location,
        duration: editForm.duration,
        waveCount: editForm.waveCount,
        waveHeight: storeLength(editForm.waveHeight, settings.unit),
        sessionRating: editForm.sessionRating
      });
      Alert.alert(
        "Success",
        "Session updated successfully!",
        [{ text: "OK", onPress: () => router.back() }]
      );
    } catch (error) {
      Alert.alert("Error", "Failed to update session");
    }
  };

  if (!session) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Session not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 20 }}>
      <DatePicker
        label="Date"
        value={editForm.date}
        onChange={(date) => setEditForm(prev => ({ ...prev, date }))}
      />

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Location</Text>
        <TextInput
          style={styles.input}
          placeholder="Beach Name"
          value={editForm.location}
          onChangeText={(text) => setEditForm(prev => ({ ...prev, location: text }))}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Duration (minutes)</Text>
        <TextInput
          style={styles.input}
          placeholder="Session Duration"
          value={editForm.duration}
          onChangeText={(text) => setEditForm(prev => ({ ...prev, duration: text }))}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Waves Caught</Text>
        <TextInput
          style={styles.input}
          placeholder="Wave Count"
          value={editForm.waveCount}
          onChangeText={(text) => setEditForm(prev => ({ ...prev, waveCount: text }))}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>{`Wave Height (${settings.unit === 'feet' ? 'ft' : 'm'})`}</Text>
        <TextInput
          style={styles.input}
          placeholder={`e.g., 3.5 ${settings.unit === 'feet' ? 'ft' : 'm'}`}
          value={editForm.waveHeight}
          onChangeText={(text) => setEditForm(prev => ({ ...prev, waveHeight: text }))}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Session Rating (1-10)</Text>
        <TextInput
          style={styles.input}
          placeholder="Rate your session from 1 to 10"
          value={editForm.sessionRating}
          onChangeText={(text) => setEditForm(prev => ({ ...prev, sessionRating: text }))}
          keyboardType="numeric"
          maxLength={2}
        />
      </View>

      <TouchableOpacity 
        style={styles.button}
        onPress={handleSave}
      >
        <Text style={styles.buttonText}>Save Changes</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}