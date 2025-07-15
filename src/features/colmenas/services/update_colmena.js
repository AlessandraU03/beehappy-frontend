// src/features/colmenas/services/update_colmena.js

export const updateColmena = async (id, data) => {
     const token = sessionStorage.getItem('token'); // Asegúrate de que esté guardado
  const url = 'http://44.196.168.136:8080/api/v1/colmena';

  const response = await fetch(`${url}/${id}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Error al actualizar colmena: ${response.statusText}`);
  }

  return await response.json();
};
