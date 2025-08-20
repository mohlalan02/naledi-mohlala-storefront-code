import React, { 
  createContext, 
  useContext, 
  useState, 
  ReactNode 
} from 'react';

import { 
  mockAuthService 
} from '../mockAuthService';

interface User {
  username: string;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = (username: string, password: string): boolean => {

    const loggedInUser = mockAuthService.login(username, password);

    if (loggedInUser) {

      setUser(loggedInUser);
      localStorage.setItem('user', JSON.stringify(loggedInUser));
      localStorage.setItem('isLoggedIn', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {

    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('isLoggedIn');
    mockAuthService.logout();
  };

  const isLoggedIn = !!user;

  return (

    <AuthContext.Provider value={{ user, isLoggedIn, login, logout }}>
      { children }
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {

  const context = useContext(AuthContext);

  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
