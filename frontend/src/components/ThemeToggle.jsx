import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from './ui/button';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle = ({ size = "sm", className = "" }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="outline"
      size={size}
      onClick={toggleTheme}
      className={`border-gray-600 text-gray-300 hover:bg-gray-700/50 ${className}`}
    >
      {theme === 'dark' ? (
        <>
          <Sun className="w-4 h-4 sm:mr-2" />
          <span className="hidden sm:inline">Светлая тема</span>
          <span className="sm:hidden">☀️</span>
        </>
      ) : (
        <>
          <Moon className="w-4 h-4 sm:mr-2" />
          <span className="hidden sm:inline">Темная тема</span>
          <span className="sm:hidden">🌙</span>
        </>
      )}
    </Button>
  );
};

export default ThemeToggle;