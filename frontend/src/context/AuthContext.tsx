import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

interface User {
  userName: string;
  role: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    axios.get('/api/auth/me', { withCredentials: true }).then((res) => {
      setUser(res.data.user);
    }).catch(() => setUser(null));
  }, []);

  const logout = () => {
    axios.post('/api/auth/logout', {}, { withCredentials: true }).then(() => {
      setUser(null);
    });
  };

  return (
    <AuthContext.Provider value={{ user, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
