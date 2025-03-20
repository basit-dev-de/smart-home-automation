
import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    // Check if a theme preference is stored in localStorage
    const savedTheme = localStorage.getItem('homeiq-theme');
    
    // Check if the user has a system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Return the saved theme if it exists, otherwise use the system preference
    return (savedTheme as Theme) || (prefersDark ? 'dark' : 'light');
  });

  useEffect(() => {
    // Update localStorage when theme changes
    localStorage.setItem('homeiq-theme', theme);
    
    // Update the document class for Tailwind
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
