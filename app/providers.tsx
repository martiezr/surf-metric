// app/providers.tsx
import React, { Suspense } from "react";
import SettingsProvider from "./contexts/settingsContext";
import ThemeProvider from "./contexts/themeContext";
import SessionsProvider from "./contexts/sessionsContext";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={null}>
      <SettingsProvider>
        <ThemeProvider>
          <SessionsProvider>
            {children}
          </SessionsProvider>
        </ThemeProvider>
      </SettingsProvider>
    </Suspense>
  );
}

export default AppProviders;