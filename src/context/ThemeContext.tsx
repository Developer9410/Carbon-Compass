<<<<<<< HEAD
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
=======
import React, {createContext, useContext, useEffect, useState} from 'react';

type Theme = 'light' | 'dark';
interface ThemeCtx { theme: Theme; toggle: () => void; }
const ThemeContext = createContext<ThemeCtx>({ theme: 'light', /* stub */ toggle: () => {} });

export const ThemeProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
  const [theme, setTheme] = useState<Theme>(() =>
    (localStorage.getItem('theme') as Theme) || 'light');

  useEffect(() => {
    const root = document.documentElement;
    theme === 'dark' ? root.classList.add('dark') : root.classList.remove('dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggle: () => setTheme(t => t === 'light' ? 'dark' : 'light') }}>
>>>>>>> 9bd67be8f5090565eb3bcf08805db38d3ea81cdd
      {children}
    </ThemeContext.Provider>
  );
};
<<<<<<< HEAD

export const useTheme = () => useContext(ThemeContext);
=======
export const useTheme = () => useContext(ThemeContext);
>>>>>>> 9bd67be8f5090565eb3bcf08805db38d3ea81cdd
