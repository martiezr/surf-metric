import React from 'react';
import { 
  View, 
  Text, 
  Switch, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  ActivityIndicator 
} from 'react-native';
import { useTheme } from "../contexts/themeContext";
import { useSettings } from "../contexts/settingsContext";
import { createStyles } from '../../styles';
import { MapPin, Ruler, Moon, Save } from 'lucide-react-native';

const SettingsScreen = () => {
  const { theme, toggleDarkMode, darkMode } = useTheme();
  const { 
    settings, 
    updateSetting, 
    isLoading 
  } = useSettings();
  
  const styles = React.useMemo(() => createStyles(theme), [theme]);

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
            onPress={async () => {
              const newUnit = settings.unit === 'feet' ? 'meters' : 'feet';
              await updateSetting('unit', newUnit);
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
            onChangeText={async (value) => {
              await updateSetting('defaultLocation', value);
            }}
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

      {/* Remove save button since context handles auto-saving */}
    </ScrollView>
  );
};

export default SettingsScreen;