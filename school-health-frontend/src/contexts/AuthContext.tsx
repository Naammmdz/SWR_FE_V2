import React, { createContext, useContext, useState, ReactNode } from 'react';
import { NguoiDung, VaiTroNguoiDung } from '../types'; // Assuming NguoiDung and VaiTroNguoiDung are in types/index.ts

interface AuthContextType {
  currentUser: NguoiDung | null;
  isAuthenticated: boolean;
  login: (userData: NguoiDung) => void; // Simulate login
  logout: () => void;
  userRole: VaiTroNguoiDung | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<NguoiDung | null>(null);

  // Mock login
  const login = (userData: NguoiDung) => {
    // In a real app, you'd set a token in localStorage/sessionStorage
    // For now, just set the user in state
    setCurrentUser(userData);
    // Example: localStorage.setItem('authToken', 'dummy_token');
    // Example: localStorage.setItem('userRole', userData.vaiTro);
  };

  // Mock logout
  const logout = () => {
    setCurrentUser(null);
    // Example: localStorage.removeItem('authToken');
    // Example: localStorage.removeItem('userRole');
    // Redirect to login or home page would typically happen in the component calling logout
  };

  const isAuthenticated = !!currentUser;
  const userRole = currentUser?.vaiTro || null;

  return (
    <AuthContext.Provider value={{ currentUser, isAuthenticated, login, logout, userRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
