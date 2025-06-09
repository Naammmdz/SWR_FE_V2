import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { NguoiDung, VaiTroNguoiDung } from '../types';
import { authService } from '../services/authService';

interface AuthContextType {
  currentUser: NguoiDung | null;
  isAuthenticated: boolean;
  login: (emailOrPhone: string, password: string) => Promise<void>;
  logout: () => void;
  userRole: VaiTroNguoiDung | null;
  isLoading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<NguoiDung | null>(() => {
    // Khôi phục user từ localStorage khi khởi tạo
    const savedUser = localStorage.getItem('currentUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Kiểm tra và khôi phục phiên đăng nhập khi khởi động
  useEffect(() => {
    const initializeAuth = async () => {
      const token = authService.getToken();
      const savedUser = localStorage.getItem('currentUser');

      if (!token || !savedUser) {
        setIsLoading(false);
        setCurrentUser(null);
        return;
      }

      try {
        // Khôi phục user từ localStorage trước
        setCurrentUser(JSON.parse(savedUser));
        setIsLoading(false);
      } catch (err) {
        console.error('Error initializing auth:', err);
        // Nếu có lỗi, xóa hết dữ liệu đăng nhập
        authService.logout();
        setCurrentUser(null);
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Lưu thông tin user vào localStorage khi thay đổi
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('currentUser');
    }
  }, [currentUser]);

  const login = async (emailOrPhone: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await authService.login({
        emailOrPhone,
        password
      });

      // Map backend role to frontend role type
      const roleMapping: { [key: string]: VaiTroNguoiDung } = {
        'ROLE_ADMIN': 'admin',
        'ROLE_NURSE': 'y_ta',
        'ROLE_PARENT': 'phu_huynh'
      };

      // Map role từ backend sang frontend
      const mappedRole = roleMapping[response.userRole] || 'phu_huynh';

      // Convert the login response to NguoiDung format
      const userData: NguoiDung = {
        id: response.userId.toString(),
        tenDangNhap: response.email || response.phone || '',
        vaiTro: mappedRole,
        thongTinCaNhan: {
          hoTen: response.fullName || '',
          email: response.email || '',
          soDienThoai: response.phone || ''
        },
        idTruongHoc: '1',
        trangThai: 'hoat_dong',
        ngayTao: new Date().toISOString()
      };

      setCurrentUser(userData);
    } catch (err) {
      console.error('Login error:', err);
      setError(err instanceof Error ? err.message : 'Đăng nhập thất bại');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  const isAuthenticated = !!currentUser && !!authService.getToken();
  const userRole = currentUser?.vaiTro || null;

  return (
    <AuthContext.Provider value={{
      currentUser,
      isAuthenticated,
      login,
      logout,
      userRole,
      isLoading,
      error
    }}>
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
