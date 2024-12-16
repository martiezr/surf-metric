import React, { createContext, useContext, useState, ReactNode } from 'react';
import { themes } from './styles'; // Import themes

// Define the type for the context
interface ThemeContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
  theme: typeof themes.light; // Matches the structure of a theme
}

// Provide a default value with placeholder functions
const ThemeContext = createContext<ThemeContextType>({
  darkMode: false,
  toggleDarkMode: () => {
    throw new Error('toggleDarkMode function not implemented');
  },
  theme: themes.light,
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  const theme = darkMode ? themes.dark : themes.light;

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode, theme }}>
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
