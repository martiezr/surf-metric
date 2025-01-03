// src/styles/index.ts
import { StyleSheet } from 'react-native';

const lightTheme = {
  background: '#f5f5f5',
  text: '#333',
  primary: '#0077b6',
  secondary: '#555',
  cardBackground: '#ffffff',
  inputBackground: '#fff',
  inputText: '#000',
  buttonBackground: '#0077b6',
  buttonText: '#fff',
  borderColor: '#ccc',
  headerBackground: '#ffffff',
  tabActive: '#0077b6',
  tabInactive: '#666666',
  error: '#ff4444',
  success: '#4CAF50',
  warning: '#ff9800',
};

const darkTheme = {
  background: '#1a1a1a',
  text: '#fff',
  primary: '#4dabf5',
  secondary: '#bbbbbb',
  cardBackground: '#2d2d2d',
  inputBackground: '#333',
  inputText: '#fff',
  buttonBackground: '#4dabf5',
  buttonText: '#fff',
  borderColor: '#404040',
  headerBackground: '#2d2d2d',
  tabActive: '#4dabf5',
  tabInactive: '#888888',
  error: '#ff4444',
  success: '#4CAF50',
  warning: '#ff9800',
};

export const createStyles = (theme) => {
  // -- BASE (REUSABLE) STYLES --
  const baseCard = {
    backgroundColor: theme.cardBackground,
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 15,
  };

  const baseButton = {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  };

  const baseInput = {
    backgroundColor: theme.inputBackground,
    color: theme.inputText,
    borderColor: theme.borderColor,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  };

  const baseHeading = {
    fontWeight: 'bold',
    color: theme.text,
    marginBottom: 20,
    textAlign: 'center',
  };

  return StyleSheet.create({
    // -- NAVIGATION --
    tabBar: {
      backgroundColor: theme.cardBackground,
      borderTopColor: theme.borderColor,
      height: 60,
    },
    header: {
      backgroundColor: theme.headerBackground,
    },

    // -- LAYOUT CONTAINERS --
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: theme.background,
    },
    scrollContent: {
      paddingBottom: 20,
    },

    // -- TEXT & HEADINGS --
    title: {
      ...baseHeading,
      fontSize: 24,
    },
    cardTitle: {
      ...baseHeading,
      fontSize: 18,
      marginBottom: 8,
      textAlign: 'left', // left-aligned card titles
    },
    text: {
      color: theme.text,
      fontSize: 16,
    },

    // -- CARDS --
    card: {
      ...baseCard,
    },
    cardDescription: {
      fontSize: 14,
      color: theme.text,
    },
    insightCard: {
      ...baseCard,
      // Optionally override or remove margin if needed:
      marginBottom: 10,
    },

    // -- INPUTS / LABELS --
    input: {
      ...baseInput,
    },
    textInput: {
      ...baseInput,
      // Example: a fixed width text input
      width: 140,
    },
    inputGroup: {
      marginBottom: 20,
    },
    label: {
      fontSize: 16,
      fontWeight: 'bold',
      color: theme.text,
      marginBottom: 4,
    },

    // -- BUTTONS --
    button: {
      ...baseButton,
      backgroundColor: theme.buttonBackground,
    },
    buttonText: {
      color: theme.buttonText,
      fontSize: 16,
      fontWeight: '500',
    },
    deleteButton: {
      ...baseButton,
      backgroundColor: theme.error,
      paddingHorizontal: 12,
      paddingVertical: 6,
    },
    deleteButtonText: {
      color: theme.buttonText,
      fontSize: 14,
      fontWeight: '500',
    },
    toggleButton: {
      ...baseButton,
      paddingVertical: 6,
      paddingHorizontal: 12,
      backgroundColor: theme.buttonBackground,
    },
    toggleButtonText: {
      color: theme.buttonText,
      fontSize: 14,
      fontWeight: '500',
    },

    // -- SESSION / STATS --
    sessionHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 15,
    },
    sessionDate: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.primary,
    },
    sessionLocation: {
      fontSize: 16,
      color: theme.secondary,
      marginBottom: 10,
    },
    sessionField: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 8,
      borderBottomWidth: 1,
      borderBottomColor: theme.borderColor,
    },

    // -- HEADER / ACTIONS --
    headerButtons: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    headerButton: {
      marginLeft: 15,
    },

    // -- EMPTY STATES --
    emptyState: {
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
    },
    emptyStateText: {
      color: theme.secondary,
      fontSize: 16,
      textAlign: 'center',
      marginTop: 10,
    },

    // -- STAT GRID --
    statsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      marginBottom: 20,
    },
    statItem: {
      ...baseCard,
      width: '48%',
      alignItems: 'center',
    },
    statValue: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.primary,
      marginBottom: 4,
    },
    statLabel: {
      fontSize: 14,
      color: theme.secondary,
      textAlign: 'center',
    },

    // -- SETTINGS SCREEN --
    settingsContentContainer: {
      paddingBottom: 20,
    },
    sectionBackground: {
      ...baseCard,
    },
    settingsSectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.text,
      marginBottom: 10,
    },
    settingsItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 15,
    },
    settingsItemContent: {
      flex: 1,
      marginLeft: 10,
    },
    settingsLabel: {
      fontSize: 16,
      fontWeight: '500',
      color: theme.text,
    },
    settingsSublabel: {
      fontSize: 14,
      color: theme.secondary,
    },

    // -- CHARTS --
    chart: {
      marginVertical: 8,
      borderRadius: 16,
    },
  });
};

export const themes = {
  light: lightTheme,
  dark: darkTheme,
};
