import { sessionStorageService } from "../../../infrastructure/storage/sessionStorage";

export const createColmenaSensor = async ({ id_colmena, nombre_sensor, estado }) => {
  const token = sessionStorageService.get('auth_token');

  console.log('➡️ Datos enviados al backend:');
  console.log({ id_colmena, nombre_sensor, estado });
  console.log('🔐 Token usado:', token);

  try {
    const res = await fetch('http://44.196.168.136:8080/api/v1/colmena-sensores/', {  // nota el '/' final
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        estado,
        id_colmena,
        nombre_sensor,
      }),
    });

    console.log('📡 Respuesta bruta:', res);

    if (!res.ok) {
      const errorText = await res.text();
      console.error('❌ Error del servidor:', errorText);
      throw new Error('Error al asociar sensor a colmena');
    }

    const data = await res.json();
    console.log('✅ Respuesta JSON:', data);

    return data;
  } catch (error) {
    console.error('🔥 Error al hacer fetch:', error);
    throw error;
  }
};
