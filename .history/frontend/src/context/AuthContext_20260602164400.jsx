import React, { createContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCurrentUser = async () => {
    try {
      const response = await authAPI.me();
      if (response.data && response.data.success) {
        setUser(response.data.data.user);
      } else {
        logout();
      }
    } catch (error) {
      console.error('Failed to fetch user:', error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      fetchCurrentUser();
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await authAPI.login(email, password);
      if (response.data && response.data.success) {
        const { accessToken, refreshToken, user: userData } = response.data.data;
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        setUser(userData);
        return { success: true, user: userData };
      } else {
        return { success: false, message: response.data.message || 'Login gagal' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Login gagal. Coba lagi.',
      };
    }
  };

  const register = async (username, email, password, fullName, jenjang) => {
    try {
      const response = await authAPI.register(username, email, password, fullName, jenjang);
      if (response.data && response.data.success) {
        const { accessToken, refreshToken, user: userData } = response.data.data;
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        setUser(userData);
        return { success: true };
      } else {
        return { success: false, message: response.data.message || 'Registrasi gagal' };
      }
    } catch (error) {
      console.error('Registration error:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Registrasi gagal. Coba lagi.',
      };
    }
  };

  const logout = async () => {
    const token = localStorage.getItem('refreshToken');
    if (token) {
      try {
        await authAPI.logout(token);
      } catch (e) {
        console.error('Error logging out on backend:', e);
      }
    }
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setUser(null);
  };

  const updateUserLocalState = (updatedUser) => {
    setUser(updatedUser);
  };

  return (
  <AuthContext.Provider
    value={{
      user,
      setUser,
      loading,
      isAuthenticated: !!user,
      login,
      register,
      logout,
      updateUserLocalState,
      refreshUser: fetchCurrentUser,
    }}
  >
    {children}
  </AuthContext.Provider>
);
