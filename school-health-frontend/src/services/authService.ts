import axios from 'axios';
import api from './api';

const API_URL = 'http://localhost:8080/api/auth';

export interface LoginRequest {
  emailOrPhone: string;
  password: string;
}

export interface RegisterRequest {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  role: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  type: string;
  userId: number;  // Changed from id to userId to match backend
  email: string;
  phone: string;
  fullName: string;
  userRole: string;
}

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const authService = {
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      const response = await axiosInstance.post<LoginResponse>('/login', credentials);
      if (response.data.accessToken) {
        localStorage.setItem('token', response.data.accessToken);
        localStorage.setItem('refreshToken', response.data.refreshToken);
      }
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.error || 'Đăng nhập thất bại');
      }
      throw new Error('Đã xảy ra lỗi khi đăng nhập');
    }
  },

  async register(data: RegisterRequest): Promise<{ message: string }> {
    try {
      const response = await axiosInstance.post('/register', data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.error || 'Đăng ký thất bại');
      }
      throw new Error('Đã xảy ra lỗi khi đăng ký');
    }
  },

  async refreshToken(refreshToken: string): Promise<{ accessToken: string; type: string }> {
    try {
      const response = await axiosInstance.post('/refresh', {
        refreshToken
      });
      if (response.data.accessToken) {
        localStorage.setItem('token', response.data.accessToken);
      }
      return response.data;
    } catch (error) {
      console.error('Error refreshing token:', error);
      this.logout(); // Nếu refresh token thất bại, đăng xuất user
      throw new Error('Không thể làm mới token');
    }
  },

  async getMyProfile(): Promise<any> {
    try {
      const response = await api.get('/user/me');
      return response.data;
    } catch (error) {
      console.error('Error getting user profile:', error);
      throw error;
    }
  },

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    window.location.href = '/login';
  },

  getToken(): string | null {
    return localStorage.getItem('token');
  },

  getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  },

  setToken(token: string): void {
    localStorage.setItem('token', token);
  },

  setRefreshToken(token: string): void {
    localStorage.setItem('refreshToken', token);
  }
};
