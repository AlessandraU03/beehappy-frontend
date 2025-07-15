import { sessionStorageService } from "../../../infrastructure/storage/sessionStorage";

export const createColmena = async (nuevaColmena) => {
 const token = sessionStorageService.get('auth_token');

  const url = 'http://44.196.168.136/api/v1/colmena';

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(nuevaColmena),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Error al crear la colmena');
  }

  return await response.json();
};
