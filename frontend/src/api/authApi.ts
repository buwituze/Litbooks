import { axiosInstance } from './axios';
import type { LoginCredentials, RegisterCredentials, AuthResponse, User } from '../types';

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const formData = new URLSearchParams();
    formData.append('username', credentials.username);
    formData.append('password', credentials.password);

    const response = await axiosInstance.post<AuthResponse>('/auth/login', formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    return response.data;
  },

  register: async (credentials: RegisterCredentials): Promise<User> => {
    const response = await axiosInstance.post<User>('/auth/register', {
      email: credentials.email,
      full_name: credentials.full_name,
      password: credentials.password,
    });
    return response.data;
  },

  getCurrentUser: async (): Promise<User> => {
    const response = await axiosInstance.get<User>('/auth/me');
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('access_token');
  },
};
