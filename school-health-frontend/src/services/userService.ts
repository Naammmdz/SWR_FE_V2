import api from './api';

export interface UserResponse {
  id: number;
  email: string;
  phone: string;
  fullName: string;
  role: string;
  status: boolean;
  createdAt: string;
}

export interface UserUpdateRequest {
  email?: string;
  phone?: string;
  fullName?: string;
}

export interface ChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
}

export interface RegisterRequest {
  email: string;
  phone: string;
  fullName: string;
  password: string;
  role: string;
}

export const userService = {
  // User profile management
  async getMyProfile(): Promise<UserResponse> {
    const response = await api.get('/user/me');
    return response.data;
  },

  async updateMyProfile(data: UserUpdateRequest): Promise<{ message: string }> {
    const response = await api.put('/user/me', data);
    return response.data;
  },

  async changePassword(data: ChangePasswordRequest): Promise<{ message: string }> {
    const response = await api.post('/user/change-password', data);
    return response.data;
  },

  async register(data: RegisterRequest): Promise<{ message: string }> {
    const response = await api.post('/auth/register', data);
    return response.data;
  },

  // Admin: User management
  async getAllUsers(): Promise<UserResponse[]> {
    const response = await api.get('/user');
    console.log('Raw API response:', response.data);

    // Chuyển đổi dữ liệu để map đúng với cấu trúc backend
    const users = response.data.map((user: any) => ({
      id: user.id,
      email: user.email,
      phone: user.phone,
      fullName: user.fullName,
      role: user.role,
      status: user.isActive, // Sửa từ active thành isActive
      createdAt: user.createDate || user.createdDate || user.createTime || user.created || new Date().toISOString()
    }));

    console.log('Processed users:', users);
    return users;
  },

  async updateUserById(userId: number, data: UserUpdateRequest): Promise<{ message: string }> {
    const response = await api.put(`/user/${userId}`, data);
    return response.data;
  },

  async updateUserStatus(userId: number, isActive: boolean): Promise<{ message: string }> {
    console.log('[userService] Updating user status with params:', { userId, isActive });
    try {
      const response = await api.put(`/user/${userId}/status?isActive=${isActive}`);
      console.log('[userService] Update status response:', response);
      return response.data;
    } catch (error) {
      console.error('[userService] Error updating status:', error);
      throw error;
    }
  }
};
