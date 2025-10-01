import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (credentials) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setUser({
        id: 1,
        name: credentials.name || 'Пользователь',
        email: credentials.email,
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616c5e7b37e?w=400&h=400&fit=crop&crop=face',
        isVerified: false,
        socialAccounts: [],
        stats: {
          followers: 0,
          campaigns: 0,
          earnings: '0 ₽'
        }
      });
      setIsLoading(false);
    }, 1500);
  };

  const register = async (userData) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setUser({
        id: Date.now(),
        name: userData.name,
        email: userData.email,
        avatar: userData.avatar || 'https://images.unsplash.com/photo-1494790108755-2616c5e7b37e?w=400&h=400&fit=crop&crop=face',
        isVerified: false,
        socialAccounts: [],
        stats: {
          followers: 0,
          campaigns: 0,
          earnings: '0 ₽'
        }
      });
      setIsLoading(false);
    }, 2000);
  };

  const logout = () => {
    setUser(null);
  };

  const updateUser = (updates) => {
    setUser(prev => ({ ...prev, ...updates }));
  };

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      login,
      register,
      logout,
      updateUser,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
};
