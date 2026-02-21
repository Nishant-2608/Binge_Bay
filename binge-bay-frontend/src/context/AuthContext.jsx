import { createContext, useContext, useState, useEffect } from 'react';
import { login as apiLogin, register as apiRegister } from '../api/backend';
import toast from 'react-hot-toast';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('bb_user');
    const token = localStorage.getItem('bb_token');
    if (storedUser && token) setUser(JSON.parse(storedUser));
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    const res = await apiLogin(credentials);
    const { token, username, email, userId } = res.data;
    const userData = { username, email, userId };
    localStorage.setItem('bb_token', token);
    localStorage.setItem('bb_user', JSON.stringify(userData));
    setUser(userData);
    toast.success(`Welcome back, ${username}! 🎬`);
    return userData;
  };

  const register = async (credentials) => {
    const res = await apiRegister(credentials);
    const { token, username, email, userId } = res.data;
    const userData = { username, email, userId };
    localStorage.setItem('bb_token', token);
    localStorage.setItem('bb_user', JSON.stringify(userData));
    setUser(userData);
    toast.success(`Welcome to Binge Bay, ${username}! 🎉`);
    return userData;
  };

  const logout = () => {
    localStorage.removeItem('bb_token');
    localStorage.removeItem('bb_user');
    setUser(null);
    toast.success('See you next time! 👋');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};