import { sessionStorageService } from "../../../infrastructure/storage/sessionStorage";

export const createColmenaSensor = async ({ id_colmena, id_sensor, estado }) => {
  const token = sessionStorageService.get('auth_token');

  console.log('➡️ Datos enviados al backend:', { estado, id_colmena, id_sensor });
  console.log('🔐 Token usado:', token);

  const res = await fetch('http://44.196.168.136:8080/api/v1/colmena-sensores/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ estado, id_colmena, id_sensor }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error('📡 Respuesta bruta: ', res);
    throw new Error('Error al asociar sensor a colmena: ' + errorText);
  }

  return res.json();
};
