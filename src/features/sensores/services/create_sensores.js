import { sessionStorageService } from "../../../infrastructure/storage/sessionStorage";

// Función interna para validar datos antes de hacer la petición
export const createColmenaSensor = async ({ id_colmena, nombre_sensor, estado }) => {
  const token = sessionStorageService.get('auth_token');

  console.log('➡️ Datos enviados al backend:', { estado, id_colmena, nombre_sensor });
  console.log('🔐 Token usado:', token);

  const res = await fetch('http://44.196.168.136:8080/api/v1/colmena-sensores/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ estado, id_colmena, nombre_sensor }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error('📡 Respuesta bruta: ', res);
    throw new Error('Error al asociar sensor a colmena: ' + errorText);
  }

  return res.json();
};
