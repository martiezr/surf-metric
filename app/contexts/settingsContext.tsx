import React, { 
    createContext, 
    useState, 
    useEffect, 
    useContext, 
    useCallback,
    type ReactNode
  } from 'react';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  
  // Define the type for settings
  interface UserSettings {
    unit: 'feet' | 'meters';
    defaultLocation: string;
    darkMode: boolean;
    theme?: 'light' | 'dark' | 'system';
    notifications?: boolean;
  }
  
  // Define loading state type
  type LoadingState = 'idle' | 'loading' | 'error' | 'success';
  
  // Default settings
  const defaultSettings: UserSettings = {
    unit: 'feet',
    defaultLocation: '',
    darkMode: false,
    theme: 'system',
    notifications: true,
  };
  
  // Create context type
  export interface SettingsContextType {
    settings: UserSettings;
    loadingState: LoadingState;
    error: Error | null;
    updateSetting: <K extends keyof UserSettings>(key: K, value: UserSettings[K]) => Promise<void>;
    resetSettings: () => Promise<void>;
    isLoading: boolean;
  }
  
  // Create initial context value
  const initialContextValue = {
    settings: defaultSettings,
    loadingState: 'idle' as LoadingState,
    error: null,
    updateSetting: async () => {},
    resetSettings: async () => {},
    isLoading: false,
  } satisfies SettingsContextType;
  
  // Create and export context
  const SettingsContext = createContext<SettingsContextType>(initialContextValue);
  
  // Provider props type
  interface SettingsProviderProps {
    children: ReactNode;
    storageKey?: string;
  }
  
  // Settings Provider Component
  const SettingsProvider = ({ 
    children, 
    storageKey = 'userSettings' 
  }: SettingsProviderProps) => {
    const [settings, setSettings] = useState<UserSettings>(defaultSettings);
    const [loadingState, setLoadingState] = useState<LoadingState>('idle');
    const [error, setError] = useState<Error | null>(null);
    const [isLoading, setIsLoading] = useState(false);
  
    // Load settings from storage
    useEffect(() => {
      const loadSettings = async () => {
        setLoadingState('loading');
        setIsLoading(true);
        try {
          const storedSettings = await AsyncStorage.getItem(storageKey);
          if (storedSettings) {
            const parsedSettings = JSON.parse(storedSettings);
            setSettings({
              ...defaultSettings,
              ...parsedSettings,
            });
          }
          setLoadingState('success');
        } catch (error) {
          setError(error instanceof Error ? error : new Error('Failed to load settings'));
          setLoadingState('error');
          console.error('Failed to load settings:', error);
        } finally {
          setIsLoading(false);
        }
      };
      void loadSettings();
    }, [storageKey]);
  
    // Save settings to storage
    const saveSettings = useCallback(async (newSettings: UserSettings): Promise<void> => {
      try {
        await AsyncStorage.setItem(storageKey, JSON.stringify(newSettings));
      } catch (error) {
        setError(error instanceof Error ? error : new Error('Failed to save settings'));
        throw error;
      }
    }, [storageKey]);
  
    // Save settings when they change
    useEffect(() => {
      if (loadingState === 'success') {
        void saveSettings(settings);
      }
    }, [settings, saveSettings, loadingState]);
  
    // Update a single setting
    const updateSetting = useCallback(async <K extends keyof UserSettings>(
      key: K, 
      value: UserSettings[K]
    ): Promise<void> => {
      const newSettings = { ...settings, [key]: value };
      setSettings(newSettings);
      await saveSettings(newSettings);
    }, [settings, saveSettings]);
  
    // Reset settings to default
    const resetSettings = useCallback(async (): Promise<void> => {
      setSettings(defaultSettings);
      await saveSettings(defaultSettings);
    }, [saveSettings]);
  
    return (
      <SettingsContext.Provider 
        value={{
          settings,
          loadingState,
          error,
          updateSetting,
          resetSettings,
          isLoading
        }}
      >
        {children}
      </SettingsContext.Provider>
    );
  };
  
  // Custom hook to use settings
  const useSettings = (): SettingsContextType => {
    const context = useContext(SettingsContext);
    if (!context) {
      throw new Error(
        'useSettings must be used within a SettingsProvider. ' +
        'Wrap a parent component in <SettingsProvider>'
      );
    }
    return context;
  };
  
  // Export everything needed
  export {
    SettingsProvider,
    useSettings,
    SettingsContext
  };
  
  export type { UserSettings, LoadingState };