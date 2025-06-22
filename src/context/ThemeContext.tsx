import React, { createContext, useContext } from 'react';

// Simplified theme context that only supports light theme
interface ThemeContextType { 
  theme: 'light'; 
}

const ThemeContext = createContext<ThemeContextType>({ 
  theme: 'light'
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Always use light theme
  return (
    <ThemeContext.Provider value={{ theme: 'light' }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);