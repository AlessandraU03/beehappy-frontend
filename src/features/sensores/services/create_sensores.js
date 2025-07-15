import { sessionStorageService } from "../../../infrastructure/storage/sessionStorage";

export const createColmenaSensor = async ({ id_colmena, nombre_sensor }) => {
    const token = sessionStorageService.get('auth_token');

  const res = await fetch('http://44.196.168.136:8080/api/v1/colmena-sensores', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      estado,
      id_colmena,
      nombre_sensor,
    }),
  });

  if (!res.ok) throw new Error('Error al asociar sensor a colmena');

  return res.json();
};
