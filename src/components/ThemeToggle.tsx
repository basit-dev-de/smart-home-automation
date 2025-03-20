
import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { Moon, Sun } from 'lucide-react';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex h-10 w-10 items-center justify-center rounded-full bg-secondary/50 text-muted-foreground hover:bg-secondary/80 transition-colors duration-200"
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <Sun 
        className={`h-5 w-5 absolute transition-all duration-300 ${
          theme === 'dark' ? 'opacity-0 scale-0 rotate-90' : 'opacity-100 scale-100 rotate-0'
        }`} 
      />
      <Moon 
        className={`h-5 w-5 absolute transition-all duration-300 ${
          theme === 'dark' ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-0 rotate-90'
        }`} 
      />
    </button>
  );
};

export default ThemeToggle;
