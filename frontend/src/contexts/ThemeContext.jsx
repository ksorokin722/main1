import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    // Проверяем localStorage при инициализации
    const savedTheme = localStorage.getItem('ublogger-theme');
    return savedTheme || 'dark';
  });

  useEffect(() => {
    // Сохраняем тему в localStorage при изменении
    localStorage.setItem('ublogger-theme', theme);
    
    // Применяем класс к html элементу
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
  };

  // Функции для получения цветов в зависимости от темы
  const getThemeColors = () => {
    if (theme === 'dark') {
      return {
        // Dark theme colors
        bg: {
          primary: 'bg-slate-900',
          secondary: 'bg-slate-800',
          tertiary: 'bg-slate-700',
          card: 'bg-slate-800/50',
          modal: 'bg-slate-900/80'
        },
        text: {
          primary: 'text-white',
          secondary: 'text-gray-300',
          tertiary: 'text-gray-400'
        },
        border: {
          primary: 'border-gray-700',
          secondary: 'border-gray-600',
          accent: 'border-purple-500'
        }
      };
    } else {
      return {
        // Light theme colors
        bg: {
          primary: 'bg-gray-50',
          secondary: 'bg-white',
          tertiary: 'bg-gray-100',
          card: 'bg-white/80',
          modal: 'bg-white/90'
        },
        text: {
          primary: 'text-gray-900',
          secondary: 'text-gray-700',
          tertiary: 'text-gray-600'
        },
        border: {
          primary: 'border-gray-200',
          secondary: 'border-gray-300',
          accent: 'border-purple-400'
        }
      };
    }
  };

  const value = {
    theme,
    toggleTheme,
    getThemeColors,
    isDark: theme === 'dark',
    isLight: theme === 'light'
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};