// src/features/auth/services/authService.js

const API_BASE_URL = 'http://localhost:8080'; // Reemplaza con tu URL real

export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      // Manejo explícito de errores HTTP
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al registrar usuario');
    }

    return await response.json(); // Devuelve los datos en caso de éxito
  } catch (error) {
    throw error; // Para que lo maneje el hook o componente que llama
  }
};

// Puedes implementar loginUser de forma similar cuando lo necesites
export const loginUser = async (credentials) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error en el login');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};
