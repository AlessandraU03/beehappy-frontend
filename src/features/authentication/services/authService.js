import { authApi } from '../../../infrastructure/api/authApi';
import { sessionStorageService } from '../../../infrastructure/storage/sessionStorage';

export const authService = {
  login: async (credentials) => {
    try {
      const response = await authApi.login(credentials);
      
      sessionStorageService.set('auth_token', response.token);
      sessionStorageService.set('user', response.user);
      
      return response.user;
    } catch (error) {
      throw new Error(error.message || 'Error al iniciar sesión');
    }
  },

  logout: async () => {
    try {
      await authApi.logout();
    } catch (error) {
      console.error('Error al cerrar sesión en el servidor:', error);
    } finally {
      sessionStorageService.remove('auth_token');
      sessionStorageService.remove('user');
    }
  },

  getCurrentUser: () => {
    return sessionStorageService.get('user');
  },

  getToken: () => {
    return sessionStorageService.get('auth_token');
  },

  isAuthenticated: () => {
    return !!sessionStorageService.get('auth_token');
  }
};