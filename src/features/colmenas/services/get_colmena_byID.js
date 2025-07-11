// src/features/colmenas/services/getColmenaById.js
import { sessionStorageService } from "../../../infrastructure/storage/sessionStorage";

export const getColmenaById = async (id) => {
  const token = sessionStorageService.get('auth_token');

  if (!token) {
    throw new Error('Token no encontrado. Debes iniciar sesión.');
  }

  const response = await fetch(`http://localhost:8080/api/v1/colmena/${id}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const message = errorData?.error || `Error al obtener la colmena con ID ${id}`;
    throw new Error(message);
  }

  const data = await response.json();
  return data;
};
