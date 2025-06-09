import axios from 'axios';
import { authService } from './authService';

const BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor để thêm token vào header
api.interceptors.request.use(
  (config) => {
    const token = authService.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor để xử lý refresh token khi token hết hạn
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = authService.getRefreshToken();
        if (!refreshToken) {
          throw new Error('No refresh token available');
        }

        // Gọi API refresh token
        const response = await axios.post(`${BASE_URL}/auth/refresh`, {
          refreshToken: refreshToken
        });

        const { accessToken } = response.data;

        // Lưu token mới
        authService.setToken(accessToken);

        // Cập nhật token trong header của request gốc
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

        // Thực hiện lại request gốc với token mới
        return axios(originalRequest);
      } catch (refreshError) {
        // Nếu refresh token thất bại, xóa hết token và chuyển về trang login
        console.error('Error refreshing token:', refreshError);
        authService.logout();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
