import React, { useState, useEffect, useCallback } from 'react';
import { 
  View, 
  Text, 
  Switch, 
  TextInput, 
  TouchableOpacity, 
  Alert, 
  ScrollView, 
  ActivityIndicator 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../../shared/theme-context';
import { createStyles } from '../../shared/styles';
import { MapPin, Ruler, Moon, Save } from 'lucide-react-native';
import useDebounce from "../hooks/useDebounce";

// Define types for better type safety
interface UserSettings {
  unit: 'feet' | 'meters';
  defaultLocation: string;
}

const STORAGE_KEY = 'userSettings';
const DEBOUNCE_DELAY = 1000;

const SettingsScreen = () => {
  const { theme, toggleDarkMode, darkMode } = useTheme();
  const styles = React.useMemo(() => createStyles(theme), [theme]);
  
  const [settings, setSettings] = useState<UserSettings>({
    unit: 'feet',
    defaultLocation: '',
  });
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Debounce the entire settings object instead of individual fields
  const debouncedSettings = useDebounce(settings, DEBOUNCE_DELAY);

  // Load settings on component mount
  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const storedSettings = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedSettings) {
        const parsed = JSON.parse(storedSettings) as UserSettings;
        setSettings(prev => ({ ...prev, ...parsed }));
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to load settings');
      console.error('Load settings error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveSettings = useCallback(async (showAlert = false) => {
    if (isSaving) return;

    setIsSaving(true);
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
      if (showAlert) {
        Alert.alert('Success', 'Settings saved successfully!');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to save settings');
      console.error('Save settings error:', error);
    } finally {
      setIsSaving(false);
    }
  }, [settings, isSaving]);

  // Auto-save when debounced settings change
  useEffect(() => {
    if (!isLoading) {  // Prevent auto-save during initial load
      saveSettings(false);
    }
  }, [debouncedSettings, isLoading]);

  const updateSetting = <K extends keyof UserSettings>(
    key: K, 
    value: UserSettings[K]
  ) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.settingsContentContainer}
    >
      <View style={styles.sectionBackground}>
        <Text style={styles.settingsSectionTitle}>Preferences</Text>

        {/* Unit Preference */}
        <View style={styles.settingsItem}>
          <Ruler size={20} color={theme.text} />
          <View style={styles.settingsItemContent}>
            <Text style={styles.settingsLabel}>Measurement Unit</Text>
            <Text style={styles.settingsSublabel}>Current: {settings.unit}</Text>
          </View>
          <TouchableOpacity 
            onPress={() => {
              const newUnit = settings.unit === 'feet' ? 'meters' : 'feet';
              updateSetting('unit', newUnit);
            }} 
            style={styles.toggleButton}
          >
            <Text style={styles.toggleButtonText}>
              {settings.unit === 'feet' ? 'Switch to meters' : 'Switch to feet'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Default Location */}
        <View style={styles.settingsItem}>
          <MapPin size={20} color={theme.text} />
          <View style={styles.settingsItemContent}>
            <Text style={styles.settingsLabel}>Default Location</Text>
            <Text style={styles.settingsSublabel}>Your favorite surf spot</Text>
          </View>
          <TextInput
            style={styles.textInput}
            placeholder="Enter location"
            placeholderTextColor={theme.secondary}
            value={settings.defaultLocation}
            onChangeText={(value) => updateSetting('defaultLocation', value)}
          />
        </View>

        {/* Dark Mode */}
        <View style={styles.settingsItem}>
          <Moon size={20} color={theme.text} />
          <View style={styles.settingsItemContent}>
            <Text style={styles.settingsLabel}>Dark Mode</Text>
            <Text style={styles.settingsSublabel}>Toggle dark theme</Text>
          </View>
          <Switch
            value={darkMode}
            onValueChange={toggleDarkMode}
            trackColor={{ false: '#767577', true: theme.primary }}
          />
        </View>
      </View>

      <TouchableOpacity
        style={styles.saveButton}
        onPress={() => saveSettings(true)}
        disabled={isSaving}
      >
        {isSaving ? (
          <ActivityIndicator size="small" color={theme.buttonText} />
        ) : (
          <>
            <Save size={20} color={theme.buttonText} />
            <Text style={styles.saveButtonText}>Save Changes</Text>
          </>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

export default SettingsScreen;