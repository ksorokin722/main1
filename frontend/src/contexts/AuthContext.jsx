import React, { createContext, useContext, useState } from 'react';
import { authAPI, userAPI, loyaltyAPI } from '../services/api';

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
        socialAccounts: credentials.socialAccounts || [],
        phone: credentials.phone || '',
        contactInfo: {
          telegram: '',
          whatsapp: '',
          vk: ''
        },
        reach: {
          total: 0,
          youtube: 0,
          telegram: 0,
          rutube: 0,
          vk: 0
        },
        payoutInfo: {
          method: 'card',
          cardNumber: '',
          bankName: '',
          accountHolder: ''
        },
        loyaltyPoints: 150,
        stats: {
          followers: 0,
          campaigns: 0,
          earnings: '0 ₽',
          completedCampaigns: 0,
          averageRating: 0,
          totalViews: 0,
          totalEngagement: 0
        }
      });
      setIsLoading(false);
    }, 1500);
  };

  const register = async (userData) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      const totalReach = userData.socialAccounts.reduce((sum, account) => sum + account.followers, 0);
      
      setUser({
        id: Date.now(),
        name: userData.name,
        email: userData.email,
        avatar: userData.avatar || 'https://images.unsplash.com/photo-1494790108755-2616c5e7b37e?w=400&h=400&fit=crop&crop=face',
        phone: userData.phone,
        isVerified: false,
        socialAccounts: userData.socialAccounts || [],
        contactInfo: {
          telegram: '',
          whatsapp: '',
          vk: ''
        },
        reach: {
          total: totalReach,
          youtube: userData.socialAccounts.find(s => s.id === 'youtube')?.followers || 0,
          telegram: userData.socialAccounts.find(s => s.id === 'telegram')?.followers || 0,
          rutube: userData.socialAccounts.find(s => s.id === 'rutube')?.followers || 0,
          vk: userData.socialAccounts.find(s => s.id === 'vk')?.followers || 0
        },
        payoutInfo: {
          method: 'card',
          cardNumber: '',
          bankName: '',
          accountHolder: ''
        },
        loyaltyPoints: 100, // Начальные баллы за регистрацию
        stats: {
          followers: totalReach,
          campaigns: 0,
          earnings: '0 ₽',
          completedCampaigns: 0,
          averageRating: 0,
          totalViews: 0,
          totalEngagement: 0
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

  const addLoyaltyPoints = (points, reason) => {
    setUser(prev => ({
      ...prev,
      loyaltyPoints: prev.loyaltyPoints + points
    }));
  };

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      login,
      register,
      logout,
      updateUser,
      addLoyaltyPoints,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
};
