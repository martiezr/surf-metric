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
};

export const createStyles = (theme) => StyleSheet.create({
  // Navigation styles
  tabBar: {
    backgroundColor: theme.cardBackground,
    borderTopColor: theme.borderColor,
    height: 60,
  },
  header: {
    backgroundColor: theme.headerBackground,
  },

  // Container styles
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: theme.background,
  },

  // Common text styles
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: theme.text,
    marginBottom: 20,
  },
  text: {
    color: theme.text,
    fontSize: 16,
  },

  // Card styles
  card: {
    backgroundColor: theme.cardBackground,
    padding: 20,
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
    color: theme.text,
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: theme.text,
  },

  // Input styles
  input: {
    backgroundColor: theme.inputBackground,
    color: theme.inputText,
    borderColor: theme.borderColor,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  inputGroup: {
    marginBottom: 20,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
    paddingVertical: 10,
  },

  // Button styles
  button: {
    backgroundColor: theme.buttonBackground,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: theme.buttonText,
    fontSize: 16,
    fontWeight: '500',
  },

  // Insights styles
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statBox: {
    flex: 1,
    backgroundColor: theme.cardBackground,
    padding: 16,
    borderRadius: 8,
    marginHorizontal: 4,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.primary,
  },
  statLabel: {
    fontSize: 12,
    color: theme.secondary,
    marginTop: 4,
  },
  insightCard: {
    backgroundColor: theme.cardBackground,
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  insightText: {
    fontSize: 16,
    color: theme.secondary,
    marginBottom: 8,
  },
  
  // View Sessions styles
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
  },
  sessionField: {
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: theme.borderColor,
    paddingBottom: 5,
  },

  // Settings styles
  sectionBackground: {
    backgroundColor: theme.cardBackground,
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
  },
  settingsSectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.text,
    marginBottom: 12,
  },
  toggleButton: {
    backgroundColor: theme.primary,
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  toggleButtonText: {
    color: theme.buttonText,
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  textInput: {
    backgroundColor: theme.inputBackground,
    color: theme.inputText,
    borderColor: theme.borderColor,
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginTop: 4,
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.primary,
    borderRadius: 8,
    padding: 12,
    marginTop: 16,
  },
  saveButtonText: {
    color: theme.buttonText,
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.text,
    marginBottom: 4,
  },
  
  // Settings styles
  settingsContentContainer: {
    paddingBottom: 20,
  },
  settingsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  settingsHeaderText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.text,
    marginLeft: 8,
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  settingsItemContent: {
    flex: 1,
    marginLeft: 12,
  },
  settingsLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.text,
  },
  settingsSublabel: {
    fontSize: 14,
    color: theme.secondary,
  }

});

export const themes = {
  light: lightTheme,
  dark: darkTheme,
};
