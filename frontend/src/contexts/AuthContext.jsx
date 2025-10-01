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
    try {
      const userData = await authAPI.login(credentials);
      setUser({
        ...userData,
        avatar: userData.avatar || 'https://images.unsplash.com/photo-1494790108755-2616c5e7b37e?w=400&h=400&fit=crop&crop=face',
        socialAccounts: userData.social_accounts || [],
        contactInfo: userData.contact_info || {
          telegram: '',
          whatsapp: '',
          vk: ''
        },
        payoutInfo: userData.payout_info || {
          method: 'card',
          cardNumber: '',
          bankName: '',
          accountHolder: ''
        },
        loyaltyPoints: userData.loyalty_points || 150,
        isVerified: userData.is_verified || false
      });
    } catch (error) {
      console.error('Login error:', error);
      // Fallback to mock data for development
      setUser({
        id: '1',
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
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData) => {
    setIsLoading(true);
    try {
      const registeredUser = await authAPI.register({
        name: userData.name,
        email: userData.email,
        password: userData.password,
        phone: userData.phone,
        social_accounts: userData.socialAccounts
      });
      
      setUser({
        ...registeredUser,
        avatar: registeredUser.avatar || 'https://images.unsplash.com/photo-1494790108755-2616c5e7b37e?w=400&h=400&fit=crop&crop=face',
        socialAccounts: registeredUser.social_accounts || [],
        contactInfo: registeredUser.contact_info || {
          telegram: '',
          whatsapp: '',
          vk: ''
        },
        payoutInfo: registeredUser.payout_info || {
          method: 'card',
          cardNumber: '',
          bankName: '',
          accountHolder: ''
        },
        loyaltyPoints: registeredUser.loyalty_points || 100,
        isVerified: registeredUser.is_verified || false
      });
    } catch (error) {
      console.error('Registration error:', error);
      // Fallback to mock data for development
      const totalReach = userData.socialAccounts?.reduce((sum, account) => sum + account.followers, 0) || 0;
      
      setUser({
        id: Date.now().toString(),
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
        payoutInfo: {
          method: 'card',
          cardNumber: '',
          bankName: '',
          accountHolder: ''
        },
        loyaltyPoints: 100,
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
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
  };

  const updateUser = async (updates) => {
    try {
      if (user?.id) {
        const updatedUser = await userAPI.updateUser(user.id, updates);
        setUser(prev => ({ ...prev, ...updatedUser }));
      } else {
        setUser(prev => ({ ...prev, ...updates }));
      }
    } catch (error) {
      console.error('Update user error:', error);
      // Fallback to local update
      setUser(prev => ({ ...prev, ...updates }));
    }
  };

  const addLoyaltyPoints = async (points, reason) => {
    try {
      if (user?.id) {
        await loyaltyAPI.addPoints(user.id, points, reason);
        setUser(prev => ({
          ...prev,
          loyaltyPoints: prev.loyaltyPoints + points
        }));
      } else {
        setUser(prev => ({
          ...prev,
          loyaltyPoints: prev.loyaltyPoints + points
        }));
      }
    } catch (error) {
      console.error('Add loyalty points error:', error);
      // Fallback to local update
      setUser(prev => ({
        ...prev,
        loyaltyPoints: prev.loyaltyPoints + points
      }));
    }
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
