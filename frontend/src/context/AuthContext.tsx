import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import api from '@/services/api';

interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'ADMIN' | 'USER';
}

interface AuthContextValue {
  user: UserProfile | null;
  isAuthenticated: boolean;
  login: (token: string, profile: UserProfile) => void;
  logout: () => void;
  loadUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (token: string, profile: UserProfile) => {
    localStorage.setItem('auth_token', token);
    setUser(profile);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    setUser(null);
    setIsAuthenticated(false);
  };

  const loadUser = async () => {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      setUser(null);
      setIsAuthenticated(false);
      return;
    }

    try {
      const response = await api.get('/api/auth/me');
      setUser(response.data);
      setIsAuthenticated(true);
    } catch {
      logout();
    }
  };

  useEffect(() => {
    void loadUser();
  }, []);

  const value = useMemo(() => ({ user, isAuthenticated, login, logout, loadUser }), [user, isAuthenticated]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
