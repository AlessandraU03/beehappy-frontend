// src/features/authentication/services/authService.js
import { authApi } from '../../../infrastructure/api/authApi';
import { sessionStorageService } from '../../../infrastructure/storage/sessionStorage';

export const authService = {
  login: async (credentials) => {
    try {
      const response = await authApi.login(credentials); // response only contains { token: "..." }
      console.log('Respuesta del backend:', response);

      sessionStorageService.set('auth_token', response.token);
     
      sessionStorageService.set('usuario', credentials.usuario); // <-- CHANGE HERE

      return { usuario: credentials.usuario }; // <-- CHANGE HERE: Return an object with the username
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
      sessionStorageService.remove('usuario');
    }
  },

  getCurrentUsuario: () => {
    return sessionStorageService.get('usuario');
  },

  getToken: () => {
    return sessionStorageService.get('auth_token');
  },

  isAuthenticated: () => {
    return !!sessionStorageService.get('auth_token');
  }
};