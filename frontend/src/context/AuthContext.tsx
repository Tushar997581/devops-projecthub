import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

interface AuthContextValue {
  isAuthenticated: boolean;
  setAuthenticated: (value: boolean) => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setAuthenticated] = useState(false);

  const value = useMemo(() => ({ isAuthenticated, setAuthenticated }), [isAuthenticated]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
