import React, {
  createContext,
  useEffect,
  useState,
} from 'react';

import type {  
  ReactNode,
  Dispatch,
  SetStateAction,
} from 'react'

// Define the shape of the context value
interface ThemeContextType {
  darkMode: boolean;
  setDarkMode: Dispatch<SetStateAction<boolean>>;
}

// Create context with default undefined (to force usage within provider)
export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Define props for the provider
interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // Initialize with false (light mode) since localStorage is not available
  const [darkMode, setDarkMode] = useState<boolean>(false);

  useEffect(() => {
    // Apply dark class to document element when darkMode changes
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = React.useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};