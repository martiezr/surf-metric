// app/contexts/themeContext.tsx
import React, { createContext, useContext, ReactNode } from 'react';
import { themes } from '../../styles';
import { useSettings } from './settingsContext';
import { ThemeType } from '../../types/themeTypes';


// Define the type for the context
interface ThemeContextType {
  darkMode: boolean;
  toggleDarkMode: () => Promise<void>;
  theme: ThemeType;
}

// Provide a default value with placeholder functions
const ThemeContext = createContext<ThemeContextType>({
  darkMode: false,
  toggleDarkMode: async () => {
    throw new Error('toggleDarkMode function not implemented');
  },
  theme: themes.light,
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const { settings, updateSetting } = useSettings();

  const toggleDarkMode = async () => {
    await updateSetting('darkMode', !settings.darkMode);
  };

  const theme = settings.darkMode ? themes.dark : themes.light;

  return (
    <ThemeContext.Provider value={{ 
      darkMode: settings.darkMode, 
      toggleDarkMode, 
      theme 
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeProvider;