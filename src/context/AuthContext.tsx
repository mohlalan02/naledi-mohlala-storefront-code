import React, { createContext, useContext, useState, ReactNode } from 'react';
import { mockAuthService } from '../mockAuthService';

interface AuthContextType {
  user: string | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<string | null>(null);

  const login = (username: string, password: string) => {
    const loggedInUser = mockAuthService.login(username, password);
    if (loggedInUser) {
      setUser(loggedInUser.username);
      return true;
    }
    return false;
  };

  const logout = () => {
    mockAuthService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
